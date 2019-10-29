<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head></head>
<body>
	<div class="clockcontainer">
		<div class="clockinner">
			<div id="clockDate">시간여행을 시작합니다.</div>
			<ul id="clockul">
				<li id="clockhours" class="clockli">00</li>
			    <li id="clockpoint" class="clockli">:</li>
			    <li id="clockmin" class="clockli">00</li>
			    <li id="clockpoint" class="clockli">:</li>
			    <li id="clocksec" class="clockli">00</li>
			</ul>
		</div>
	</div>

<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script>
	$(document).ready(function() {	
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
	}); 
</script>
</body>
</html>