/**
 * home.js
 */

/* ----------------------------------------------------------------------------
 * global variables
 */
var g_graph;
var g_linkForce;
var g_timer;


/* ----------------------------------------------------------------------------
 * Main Driver Code
 */
$(document).ready(function(){
	let elData = sweepELData();
	let gData = parseTimeline(elData['visdata']);
	
	// ������ �׸���
	drawGalaxy(gData);

	// �ð����� ����� �׸���
	writeTimeline(elData['yymmdd'], zeroPad(elData['hhmm'], 1000));
	// ����ǿ� ��ư ��� �ֱ�
	setTimeTravel(elData['yymmdd'], elData['hhmm']);
	
	// �߿� �ܾ� brief �׸���
	writeSigwords();


	
});


/* ----------------------------------------------------------------------------
 * Controller���� model�� �ɾ��  EL�� �̿��� �ӽ� ������ �����͸� Body�κ��� �ܾ���� �����ϴ� �Լ�.
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
 * ���� Ÿ�Ӷ��ΰ� �̷� Ÿ�Ӷ����� ǥ��
 * �ð����� �����
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
        	
        	// ����
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
        	
        	// ����
        	$('#travelDay').html(yymmddFormat(yymmdd));
        	$('#travelTime').html(hhmmFormat(hhmm));
        	$('.travel-center').addClass('brdr-cyan');

        	// �̷�
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
 * �ð����� ��� Ȱ��ȭ
 */
function setTimeTravel() {
	let arrWormHole = $(".timeline ul li span").parent();
	arrWormHole.each((i, hole) => $(hole).click(function(){
		$('#warpDiv').css("display", "inherit");
		g_timer = setInterval(function(){
			let opacity = $('#warpDiv').css("opacity")
			if (opacity >= 0.3) {
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
 * ���� ������ �߿� Ű������� �׷� ���� ���߾� ǥ���ϱ�
 * �߿� Ű���� �긮�� ���� 
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
	
	setSigwordsColor();
}



