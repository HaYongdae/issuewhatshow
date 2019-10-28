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
	// 초기 카메라 위치 저장
	g_cp = g_graph.cameraPosition();

	// 임시 테스트 코드
	$('nav div h3').click(function(){
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
	
	let parent = $('.sig-li-outter');
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


