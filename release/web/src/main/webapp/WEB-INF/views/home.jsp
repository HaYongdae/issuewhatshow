<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page import="lab.latte.issue.model.TimelineVO" %>

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
  <div class="body">
    <div id="warpDiv"><img src="resources/images/warp.gif"/></div>
    <div class="graph-wrap">
      <div id="3d-graph"></div>
    </div>
    
    <!-- 사이트로고 -->
    <div id="spacehorseDiv"><img id="spacehorse" src="resources/images/latteishorse.png"/></div>
    
    <!-- 시계 -->
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
    
    <!-- GNB -->
    <!-- %@ include file="global/gnb.jsp" %-->
    
    <!-- Main Contents [START]-->
    <!-- Timeline -->
    <div class="timeline">
      <div class="timelinelnner">
        <ul class="time-past">
          <li>
            <div class="travel-5">
              <span class="tr-day"></span>
              <span  class="tr-time"></span>
            </div>
          </li>
          <li>
            <div class="travel-4">
              <span class="tr-day"></span>
              <span  class="tr-time"></span>
            </div>
          </li>
          <li>
            <div class="travel-3">
              <span class="tr-day"></span>
              <span  class="tr-time"></span>
            </div>
          </li>
          <li>
            <div class="travel-2">
              <span class="tr-day"></span>
              <span  class="tr-time"></span>
            </div>
          </li>
          <li>
            <div class="travel-1">
              <span class="tr-day"></span>
              <span  class="tr-time"></span>
            </div>
          </li>
        </ul>
        <div class="travel-center">
          <span id="travelDay"></span>
          <span id="travelTime"></span>
        </div>
        <ul class="time-future">
           <li>
            <div class="travel-1">
              <span class="tr-day"></span>
              <span  class="tr-time"></span>
            </div>
          </li>
          <li>
             <div class="travel-2">
              <span class="tr-day"></span>
              <span  class="tr-time"></span>
            </div>
          </li>
          <li>
             <div class="travel-3">
              <span class="tr-day"></span>
              <span  class="tr-time"></span>
            </div>
          </li>
          <li>
             <div class="travel-4">
              <span class="tr-day"></span>
              <span  class="tr-time"></span>
            </div>
          </li>
          <li>
            <div class="travel-5">
              <span class="tr-day"></span>
              <span  class="tr-time"></span>
            </div>
          </li>
        </ul>    	
    <span class="copyright">2019_Training for 4th Industrial Revolution_Open API를 활용한 빅데이터 전처리・시각화_B반.&nbsp;&nbsp;&nbsp;&nbsp;Team_Latte is Horse.&nbsp;&nbsp;Project_IssueWhatShow.</span>
      </div>                       
    </div>    
    <div id="sigWordsWrap">
      <table>
        <tr>
          <td id="sigBtn">
                                        〉
          </td>
          <td class="sig-td">
            <ul class="sig-ul-outer">
              <li class="sig-li-outer">
              </li>
            </ul>
          </td>
        </tr>
      </table>
    </div>
    <!-- Main Contents [END] -->
    <!-- 뉴스가 잘 들어가질까아? -->
		<div id="newslist">
			<div id ="newlistcontent"></div>

			<div id="infonote1"></div>
			<div id="infonote2"></div>
			<div id="infonote3"></div>
			<div id="infonote4"></div>
			
		</div>

	<div id="yymmdd" class="hidden">${timeunit.yymmdd }</div>
    <div id="hhmm" class="hidden">${timeunit.hhmm }</div>
    <div id="searchWord" class="hidden">${timeunit.searchword }</div>
    <div id="visData" class="hidden">${timeunit.visdata }</div>
    <form id="warp" method="post" action="/" class="hidden">
      <input id="warpDate" name="yymmdd" value="" type="text"/>
      <input id="warpTime" name="hhmm" value="" type="text"/>
    </form>
      
    <!-- footer -->
    <!-- %@ include file="global/footer.jsp" % -->
  </div>
  
  <!-- global resources -->
  <%@ include file="global/resources_body.jsp" %>
  
  <!-- current resources -->
  <script type="text/javascript" src="resources/third-party-etc/three.js"></script>
  <script type="text/javascript" src="resources/third-party-etc/three-spritetext.js"></script>
  <script type="text/javascript" src="resources/third-party-etc/3d-force-graph.min.js"></script>
  <script type="text/javascript" src="resources/third-party-etc/dat.gui.js"></script>
  <script type="text/javascript" src="resources/js/util.js"></script>
  <script type="text/javascript" src="resources/js/timeline-api.js"></script>
  <script type="text/javascript" src="resources/js/home.js"></script>

</body>
</html>
