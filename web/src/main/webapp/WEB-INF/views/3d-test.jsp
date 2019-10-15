<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>

<head>
  <meta charset="UTF-8">
  <title>Insert title here</title>
  
  <script type="text/javascript" src="resources/third-party-etc/dat.gui.js"></script>
  <script type="text/javascript" src="resources/third-party-etc/3d-force-graph.min.js"></script>
  
  <style> body { margin: 0; } </style>

</head>

<body>
  <div id="3d-graph"></div>

  <script>
  	const dist = [0, 20, 40, 100]
    
 	// Create Random tree
    const N = 4;
    const gData = {
      nodes: [...Array(N).keys()].map(i => ({ id: i })),
      links: [...Array(N).keys()]
        .filter(id => id)
        .map(id => ({
          source: id,
          target: 0,
          color: 1,
          distance: dist[id]
        }))
    };
    const graph = ForceGraph3D()
      (document.getElementById('3d-graph'))
        .nodeLabel(node => node.id)
        .linkColor(link => link.color ? 'red' : 'green' )
        .linkOpacity(1)
        .graphData(gData);
    const linkForce = graph
      .d3Force('link')
      .distance(link => link.distance );
    
   /*  graph.numDimensions(3); */
 
  </script>
  
  <!-- current resources -->
  
</body>
</html>