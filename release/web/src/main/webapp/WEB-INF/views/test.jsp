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
    <link href="resources/css/test.css" rel="stylesheet"> 

    <title>Test</title>
</head>
<body>
	<h1>Oracle 연동 테스트</h1>
	<br>
	<img src="resources/images/test.jpg">
	<br>
	<br>
	<h3>EMPLOYEES@HR 에서  가져온 직원 이름</h3>
	<table border="1">
		<c:forEach var="item" items="${employees }" varStatus="i">
			<tr>
				<td><c:out value="${item.firstName }"/></td>
				<td><c:out value="${item.lastName }"/></td>
			</tr>
		</c:forEach>
	</table>

	<!-- footer -->
	<%@ include file="global/footer.jsp" %>
	
	<!-- global resources -->
	<%@ include file="global/resources_body.jsp" %>
	
	<!-- current resources -->
	<script type="text/javascript" src="resources/js/util.js"></script>
	<script type="text/javascript" src="resources/js/test.js"></script>

</body>
</html>
