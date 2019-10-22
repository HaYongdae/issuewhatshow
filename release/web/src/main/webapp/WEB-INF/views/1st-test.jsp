<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>

<head>
  <meta charset="UTF-8">
  <title>JH-test</title>
  
  
  
  <style> body { margin: 0; } </style>
</head>

<body>
  
  <h1>VISDATA to 3d-force 테스트</h1>
  <button type="button" id="btnGetLast">마지막 timeline visdata 가져오기</button>
  <br/>
  <hr/>
  <div id="3d-graph"></div>
  
  
  <!-- global resources -->
  <%@ include file="global/resources_body.jsp" %>
  
  <!-- current resources -->
  <script type="text/javascript" src="resources/js/home.js"></script>
  <script type="text/javascript" src="resources/third-party-etc/three.js"></script>
  <script type="text/javascript" src="resources/third-party-etc/three-spritetext.js"></script>
  <script type="text/javascript" src="resources/third-party-etc/3d-force-graph.min.js"></script>
  
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
		        	console.log("success: apis/getLastTimeline");
		        	vis2force(data);
		        },
		        error: function(equest,status,error) {
		        	console.error("fail: apis/getLastTImeline");
		        },
		        data: JSON.stringify(parcel)
		    });
  		});
  	});
  	
  	
  	
  	function vis2force(data){
  		console.log(data)
  		
  		var nodesJson = [];
  		var linkJson = [];
  		
  		var visdata = JSON.parse(data['visdata']);
  		for (i in visdata) {
  			//if (i > 1) break; //테스트 라인

  			//node 부터 처리
  			
  			var nodes = visdata[i]['nodes'];
  			var minmax = getNodeMinMax(nodes);
  			var min = minmax['min'];
  			var max = minmax['max'];
  			var nodeVals = []
  			nodes.forEach(function(d, k){
  				val = d['val'];
  				nodeVals.push(val);
  				min = Math.min(min, val);
  				max = Math.max(max, val)
  				node = { 
  					"id" : d['id'],
 	  				"word" : d['word'],
 	  				"group" : d['group'],
 	  				"val" : Math.max(
 						Math.min(
 							Math.sqrt(((d['val'] - min) / (max - min))*100)*4
 							, 20
 						)
 						, 2
 	  				)
 	  			}
  				nodesJson.push(node);
  				console.log(node);
  			});
  			  			
  			
  			//link 처리
  			//dmatrix 는 link 부분이므로 나중에...
  			var dmatrix = visdata[i]['dmatrix'];
  			var dlines = dmatrix.split("\n");
  			dlines.pop();
  				
  			var mtrx = []
  			for (j in dlines) {
  				var dcols = dlines[j].split(",");
  				mtrx[j] = dcols;
  			}	
  			len = mtrx.length
  			
  			
  			for (j = 1; j < len; j++){
  				var tempLinks = []
  				for(k = 1; k < j; k++) {
  					dist = mtrx[j][k];
  					if (dist > 0.7)
  						continue;
  					else
  						dist = Math.pow(dist*5, 4);
  				
  					var forward = {
 						"source" : nodes[j-1]['id'], "target" : nodes[k-1]['id'], "dist" : dist
 	  				};
 	  				var reverse = {
 	  					"source" : nodes[k-1]['id'], "target" : nodes[j-1]['id'], "dist" : dist	
 	  				};
  					
  					if (nodeVals[j-1] < nodeVals[k-1]){
  						tempLinks.push(forward);
  					} else if (nodeVals[j-1] > nodeVals[k-1]){
  						tempLinks.push(reverse)
  					} else {
  						tempLinks.push(forward);
  						tempLinks.push(reverse);
  					}
  				}
  				tempLinks.forEach(function(d, k){
						console.log(d);
						linkJson.push(d);
				});
  			}
  			
  		}
  		
  		drawGalaxy({ 
			nodes: nodesJson,
			links: linkJson
		});
  	}
  	
  	
  	function getNodeMinMax(nodes){
  		var min = 100;
  		var max = 0;
  		nodes.forEach(function(d, i){
  			min = Math.min(min, d['val']);
  			max = Math.max(max, d['val']);
  		});
  		
  		return {"min" : min, "max" : max}
  	}
  	
  	
  	function drawGalaxy(gData){
  		console.log(gData);
  		
  		const graph = ForceGraph3D()
		(document.getElementById('3d-graph')) 	   
		.nodeAutoColorBy('group')      
        .nodeThreeObject(node => {
			const obj = new THREE.Mesh(
            	new THREE.SphereGeometry(10),
            	new THREE.MeshBasicMaterial({ depthWrite: false, transparent: true, opacity: 0 })
          	);          
			const sprite = new SpriteText(node.word);
				sprite.color = node.color;
     	    	sprite.textHeight = node.val;
     	    	obj.add(sprite);
     	    return obj;
        })      
		.linkOpacity(0.1)		
		//.linkDirectionalParticles(3)
        .graphData(gData);
  		
        //graph.d3Force('charge').strength(-500);

		const linkForce = graph
	    	.d3Force('link')
	    	.distance(link => link.dist);
  		
  	}
  	
  	
  </script>
  
  
  
</body>
</html>