/**
 * home.js
 */

/* ----------------------------------------------------------------------------
 * global variables
 */
var g_graph;
var g_cp;
var g_linkForce;
var g_timer;
var g_init = true;


/* ----------------------------------------------------------------------------
 * Main Driver Code
 */
$(document).ready(function(){
	let elData = sweepELData();
	let gData = parseTimeline(elData['visdata']);
	
	// 갤럭시 그리기
	drawGalaxy(gData);

	// 시간여행 계기판 그리기
	writeTimeline(elData['yymmdd'], zeroPad(elData['hhmm'], 1000));
	// 계기판에 버튼 기능 넣기
	setTimeTravel(elData['yymmdd'], elData['hhmm']);
	
	// 중요 단어 brief 그리기
	writeSigwords();
	// 중요 단어 클릭 이벤트 넣기
	addSigClick();
	setSigwordsColor();
    // 중요 단에 슬라이드 인/아웃 버튼
    addSigBtn();
    
    // 시계 설정
    setClock();
    
    // 모두 완료되면 계기판들 슬라이드 아웃 시키기
    sigRight();
	

    
	// 초기 카메라 위치 저장
	g_cp = g_graph.cameraPosition();
	
	
	// 로고 클릭시 카메라 초기화
	$('#spacehorse').click(function(){
		setCpDefaultIfNothere();
	});
	
	
	
});


/* ----------------------------------------------------------------------------
 * Controller에서 model에 심어와  EL을 이용해 임시 저장한 데이터를 Body로부터 긁어오고 삭제하는 함수.
 */
function sweepELData(){
	let yymmdd = $('#yymmdd').html(); 
	let hhmm = $('#hhmm').html();
	
	let visdata = JSON.parse($('#visData').html());
	$('#searchWord').html("");
	$('#visData').html("");
	
	return {'yymmdd':yymmdd, 'hhmm':hhmm, 'visdata':visdata};
}


/* ----------------------------------------------------------------------------
 * 과거 타임라인과 미래 타임라인을 표현
 * 시간여행 계기판
 */
function writeTimeline(yymmdd, hhmm){
	let parcel = {
		'yymmdd' : yymmdd,
		'hhmm' : hhmm
	}
	
	$.ajax({
        url: 'apis/getPastTimeline',
        type: 'post',
        dataType: 'json',
        data: JSON.stringify(parcel),
        contentType: 'application/json',
        success: function(data){
//        	console.log("success: " + 'apis/getPastTimeline');
        	
        	// 과거
        	let past = data.past;
        	let idx = 1;
        	for (let i = past.length-1; i >= 0; i--){
        		let selector = ".time-past " + ".travel-" + idx + " ";
        		let dateSelector = selector + ".tr-day";
        		let timeSelector = selector + ".tr-time";
        		$(dateSelector).html(yymmddFormat(""+past[i].yymmdd));
        		$(timeSelector).html(hhmmFormat(""+past[i].hhmm));
        		idx++;
        	}
        	
        	// 현재
        	$('#travelDay').html(yymmddFormat(yymmdd));
        	$('#travelTime').html(hhmmFormat(hhmm));
        	$('.travel-center').addClass('brdr-cyan');

        	// 미래
        	let future = data.future;
        	for (let i = 0; i < future.length; i++){
        		let selector = ".time-future " + ".travel-" + (i+1) + " ";
        		let dateSelector = selector + ".tr-day";
        		let timeSelector = selector + ".tr-time";
        		$(dateSelector).html(yymmddFormat(""+future[i].yymmdd));
        		$(timeSelector).html(hhmmFormat(""+future[i].hhmm));
        	}
        },
        error: function(equest,status,error) {
        	console.error("fail: " + 'apis/getPastTimeline');
        }
    });
}


/* ----------------------------------------------------------------------------
 * 시간여행 기능 활성화
 */
function setTimeTravel() {
	let arrWormHole = $(".timeline ul li span").parent();
	arrWormHole.each((i, hole) => $(hole).click(function(){
		$('#warpDiv').css("display", "inherit");
		g_timer = setInterval(function(){
			let opacity = $('#warpDiv').css("opacity")
			if (opacity >= 0.9) {
				clearInterval(g_timer);
			} else {
				$('#warpDiv').css("opacity", parseFloat(opacity) + 0.005);
			}
		}, 10);
		let yymmdd = $(hole).find('.tr-day').html().split("/").join("");
		let hhmm = $(hole).find('.tr-time').html().split(":").join("");
		
		$(hole).addClass("warp-target");
		
		$('#warpDate').val(yymmdd);
		$('#warpTime').val(hhmm);
		setTimeout(function(){$('#warp').submit();}, 2000);	
	}));
}


/* ----------------------------------------------------------------------------
 * 왼쪽 영역에 중요 키워드들을 그룹 색에 맞추어 표현하기
 * 중요 키워드 브리핑 역할 
 */
function writeSigwords() {
	let sigwordsMtrx = getSigwordsMtrx();
	
	let parent = $('.sig-li-outer');
	for(nodes of sigwordsMtrx){
		let ul = $("<ul></ul>", {"class": "sig-ul-inner"});
		for (node of nodes){
			$("<li group=\"" + node['group'] + "\">" 
				+ node['word'] + "</li>").css("color", node['col'])
				.appendTo(ul);
		}
		ul.appendTo(parent);
		
	}
}


/* ----------------------------------------------------------------------------
 * 중요 키워드에 클릭 이벤트 할당
 */
function addSigClick(){
	 $("ul.sig-ul-inner li").each((i, li) => $(li).click(function(){
		 focus2Node(li);
	 }));
}

/* ----------------------------------------------------------------------------
 * 중요 키워드 슬라이드 인/아웃 구현
 */
g_sigIntvlHandle = null;
g_sig2go = 0;
function addSigBtn(){
    $('#sigBtn').click(function(){
        if ($(this).html().trim() == "〈" ) {
            sigLeft();
        } else {
            sigRight();
        }
    });
}

function sigLeft() {
    g_sig2go = $("#sigBtn").width() + $('.sig-ul-outer').width();
    g_sigIntvlHandle = setInterval(function(){
        let lmargin = parseInt(
                $('.sig-ul-outer').css('margin-left'));
        if((-1)*lmargin > g_sig2go) {
            $('.sig-ul-outer').css(
                    'margin-left', ((-1)*g_sig2go - 50) + 'px');
            clearInterval(g_sigIntvlHandle);
            $('#sigBtn').html("〉");
        } else {
            $('.sig-ul-outer').css('margin-left', (lmargin-20)+'px');
        }
    }, 10);
}

function sigRight() {
    g_sig2go = 0;//$("#sigBtn").width() + $('.sig-ul-outer').width();
    g_sigIntvlHandle = setInterval(function(){
        let lmargin = parseInt(
                $('.sig-ul-outer').css('margin-left'));
        if(lmargin >= g_sig2go) {
            $('.sig-ul-outer').css(
                    'margin-left', g_sig2go+'px');
            clearInterval(g_sigIntvlHandle);
            $('#sigBtn').html("〈");
        } else {
            $('.sig-ul-outer').css('margin-left', (lmargin+20)+'px');
        }
        
        if (g_init) {
        	g_init = false;
        	setTimeout(function(){dropClock();}, 300);
        	setTimeout(function(){liftWarp();}, 300);
        }
    }, 10);
    
    
}


/* ----------------------------------------------------------------------------
 * 시계
 */
function setClock(){
	var monthNames = [ "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12" ]; 
	var dayNames= ["일", "월", "화", "수", "목", "금", "토"]	
	var newDate = new Date();	
	newDate.setDate(newDate.getDate());	    
	$('#clockDate').html(newDate.getFullYear() + ". " + monthNames[newDate.getMonth()] + ". " + newDate.getDate() + ". (" + dayNames[newDate.getDay()] + ")");			
	
	setInterval( function() {			
		var seconds = new Date().getSeconds();			
		$("#clocksec").html(( seconds < 10 ? "0" : "" ) + seconds);
	},1000);
		
	setInterval( function() {		
		var minutes = new Date().getMinutes();			
		$("#clockmin").html(( minutes < 10 ? "0" : "" ) + minutes);
	},1000);
		
	setInterval( function() {		
		var hours = new Date().getHours();			
		$("#clockhours").html(( hours < 10 ? "0" : "" ) + hours);
	}, 1000);		
}

/* ----------------------------------------------------------------------------
 * 시계 슬라이드 다운
 */
g_ClockIntvlHandle = null;
g_Clock2go = 0;
function dropClock(){
	g_ClockIntvlHandle = setInterval(function(){
		let top = parseInt($(".clockcontainer").css("top"));
		if (top <= g_Clock2go){
			$(".clockcontainer").css("top", (top+20)+"px");
		} else {
			$(".clockcontainer").css("top", g_Clock2go+"px");
			clearInterval(g_ClockIntvlHandle);
		}
	}, 10);
}

/* ----------------------------------------------------------------------------
 * 워프 패널 리프트 업
 */
g_WarpIntvlHandle = null;
g_Warp2go = 0;
function liftWarp(){
	g_WarpIntvlHandle = setInterval(function(){
		let bottom = parseInt($(".timeline").css("bottom"));
		if (bottom <= g_Warp2go){
			$(".timeline").css("bottom", (bottom+25)+"px");
		} else {
			$(".timeline").css("bottom", g_Warp2go+"px");
			clearInterval(g_WarpIntvlHandle);
		}
	}, 10);
}

/* ----------------------------------------------------------------------------
 * 바탕 클릭시 윈도우 리셋
 */
$("#newslist").click(function(){
	$("#newslist").css("display" , "none")
})



