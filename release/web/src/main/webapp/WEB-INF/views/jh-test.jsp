<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>

<head>
  <meta charset="UTF-8">
  <title>JH-test</title>
  
  <script type="text/javascript" src="resources/third-party-etc/dat.gui.js"></script>
  <script type="text/javascript" src="resources/third-party-etc/3d-force-graph.min.js"></script>
  
  <style> body { margin: 0; } </style>
</head>

<body>
  
  <h1>VISDATA to 3d-force 테스트</h1>
  <button type="button" id="btnGetLast">마지막 timeline visdata 가져오기</button>
  
  
  <!-- global resources -->
  <%@ include file="global/resources_body.jsp" %>
  
  <!-- current resources -->
  <script type="text/javascript" src="resources/js/home.js"></script>
  
  <script>
  	$(document).ready(function(){
  		$("#btnGetLast").click(function(){
  			
  			//테스트코드
  			parcel = {
				'key' : 'test',
  				'val' : 100
  			};
  			
  			$.ajax({
		        url: 'apis/getLastTimeline',
		        type: 'post',
		        dataType: 'json',
		        contentType: 'application/json',
		        success: function(data){
		        	console.log("success: apis/getLastTimeline")
		        	console.log(data)
		        	
		        	vis2force(data)
		        },
		        error: function(equest,status,error) {
		        	console.error("fail: apis/getLastTImeline")
		        },
		        data: JSON.stringify(parcel)
		    });
  		});
  	});
  	
  	
  	function vis2force(data){
  		var visdata = JSON.parse(data['visdata']);
  		console.log(visdata);
  		for (i in visdata) {
  			if (i > 0) break; //테스트 라인
  			
  			var dmatrix = visdata[i]['dmatrix'];
  			var dlines = dmatrix.split("\n");
  			
  			var mtrx = []

  			for (j in dlines) {
  				var dcols = dlines[j].split(",");
  				mtrx[j] = dcols;
  			}
  			
  			console.log(mtrx)
  			
  				
  		}
  	}
  	
  	
  </script>
  
  
  
</body>
</html>