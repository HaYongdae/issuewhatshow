<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <meta name="generator" content="">
    <!-- global resources -->
    <%@ include file="global/resources_header.jsp" %>

    <!-- Custom styles for this template -->
    <link href="resources/css/home.css" rel="stylesheet"> 

    <title>Home</title>
</head>
<body>
	<h1>Hello, Spring MVC!</h1>
	<ul>
		<li><a href="./test">테스트 페이지로 가기</a></li>
		<li><a href="./3d-test">3d-force-graph 링크 길이 테스트</a></li>
		<li><a href="./main-test">3d-force-graph 프로토타입 테스트</a></li>
	</ul>
	
	<!-- footer -->
	<%@ include file="global/footer.jsp" %>
	
	<!-- global resources -->
	<%@ include file="global/resources_body.jsp" %>
	
	<!-- current resources -->
	<script type="text/javascript" src="resources/js/util.js"></script>
	<script type="text/javascript" src="resources/js/home.js"></script>

</body>
</html>
