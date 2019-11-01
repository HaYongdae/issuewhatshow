package lab.latte.issue.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Properties;

import javax.annotation.Resource;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

import lab.latte.issue.model.TimelineVO;
import lab.latte.issue.service.IAPIService;

/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController<T, K, V> {
	
	@SuppressWarnings("unused")
	private static final Logger logger = 
			LoggerFactory.getLogger(HomeController.class);
	
	@Resource(name="envProperties")
	private Properties env;
	
	@Resource(name = "apiService")
	private IAPIService<T, K, V> apiService;
	
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Locale locale, Model model) {	
		TimelineVO timeunit = apiService.getLastTimeunit();
		model.addAttribute("timeunit", timeunit);
		
		return "home";
	}
	
	
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/", method = RequestMethod.POST)
	public String home_post(
			Model model, @RequestParam Map<String,Object> reqMap ) {
		
		int yymmdd = Integer.parseInt((String)reqMap.get("yymmdd")) % 1000000;
		int hhmm = Integer.parseInt((String)reqMap.get("hhmm"));
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("yymmdd", yymmdd);
		map.put("hhmm", hhmm);
		
		TimelineVO timeunit = apiService.getTimeunitByTime((Map<K, V>)map);
		model.addAttribute("timeunit", timeunit);
	
		return "home";
	}
	
	
	@RequestMapping(value = "/page-test", method = RequestMethod.GET)
	public String pageTest(Locale locale, Model model) {
		
		return "page-test";
	}
	
	
	@Resource(name = "restTemplate")
	protected RestTemplate restTemplate;
	
	@RequestMapping(value = "api/searching" , method = {RequestMethod.GET, RequestMethod.POST})
	@ResponseBody
	public Map<String, Object> searchNaver (String[] main , String keyword , String nowTime  ,
			Model model ) throws  Exception {
		
		// 마지막으로 보낼 결과의 저장장소 Map이다.
        Map<String, Object> resultMap = new HashMap<String, Object>();
        
     

		try {

			
			String apiURL = "https://openapi.naver.com/v1/search/news.json?query=" + keyword ;
			
			for(int i=0; i< 3 ;i++) {
				
				if(i < main.length) {
					apiURL += "+|+" + main[i];
				}else {
					break;
				}
				
				
			}
    		apiURL += "&display=10&start=1&sort=sim";
    		
		
    	
    		
    	//api와 연결하기 위한 요청	
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		Map<String,String> keyvalue = new HashMap<String, String>();
		String ID = env.getProperty("clientId");
		String IDID = env.getProperty("clientSecret");
		
		keyvalue.put("X-Naver-Client-Id" , ID);
		keyvalue.put( "X-Naver-Client-Secret", IDID);
		
		headers.setAll(keyvalue);
		
		HttpEntity entity = new HttpEntity("parameters" , headers);
		ResponseEntity response = restTemplate.exchange(apiURL,  HttpMethod.GET , entity , String.class);
		
		JSONParser jsonParser = new JSONParser();
		JSONObject jsonObject = (JSONObject) jsonParser.parse(response.getBody().toString());
		JSONArray docuArray = (JSONArray)jsonObject.get("items");
		
		
		//보낼 정보 저장 장소
		List originallink = new ArrayList();
		List description = new ArrayList();
		List title = new ArrayList();
		List clink = new ArrayList();
		List cdes = new ArrayList();
		
			/* for(int i = 0 ; i <docuArray.size() ; i++) { */
		for(int i = 0 ; i < 4 ; i++) {	
			//정보 정제 전 준비
			JSONObject tmp = (JSONObject)docuArray.get(i);
			if( i < tmp.size()) {
			String cutlink = (String)tmp.get("originallink");
			String[] cutlink2 =	cutlink.split("/");
			String cutdes = (String)tmp.get("description");
			
			
			//뉴스 3줄 요약 100문자로 자르면서 저장장소에 추가
			if(cutdes.length()>100) {
				String cutdes2 = cutdes.substring(0,100) + "...";
					cdes.add(cutdes2);
				}else{	
				String cutdes2 = cutdes + "...";
					cdes.add(cutdes2);
					
			}
			
		    //제목 저장장소에 추가
			title.add((String)tmp.get("title"));
			
			
			//원래 링크 저장장소에 추가
			originallink.add((String)tmp.get("originallink"));
			
			
			//설명문 저장장소에 추가
			description.add((String)tmp.get("description"));
			
			
			//컷팅된 설명문 저장장소에 추가
			clink.add(cutlink2[2]);
			}else {
				cdes.add("");
				title.add("");
				originallink.add("");
				description.add("");
				clink.add("");
			}
			
		}
		//보내기 위해 저장장소를 Map에 넣어 준다.!
			resultMap.put("cdes" , cdes);		
			resultMap.put("clink" , clink);
			resultMap.put("description", description);
			resultMap.put("title", title);
			resultMap.put("originallink", originallink);
			
		
		} catch (Exception e) {
			e.printStackTrace();
		}
		//정보다 가득찬 Map을 ajax에 리턴해 준다.
    	return resultMap;
	}
}

