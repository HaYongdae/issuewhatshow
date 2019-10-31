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
		String clientId = "lXA5GRw7Os5t_Hs1sF28";
        String clientSecret = "8DC2rlIJdi";
       
        Map<String, Object> resultMap = new HashMap<String, Object>();

		try {

			
			String apiURL = "https://openapi.naver.com/v1/search/news.json?query=" + keyword ;
			
			for(int i=0; i< 3 ;i++) {
				
				if(main[i] != null) {
					apiURL += "+" + main[i];
				}else {
					break;
				}
				
				
			}
    		apiURL += "&display=10&start=1&sort=sim";
    		
		 
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		Map<String,String> keyvalue = new HashMap<String, String>();
		keyvalue.put("X-Naver-Client-Id" , clientId);
		keyvalue.put( "X-Naver-Client-Secret", clientSecret);
		
		headers.setAll(keyvalue);
		
		HttpEntity entity = new HttpEntity("parameters" , headers);
		ResponseEntity response = restTemplate.exchange(apiURL,  HttpMethod.GET , entity , String.class);
		
		JSONParser jsonParser = new JSONParser();
		JSONObject jsonObject = (JSONObject) jsonParser.parse(response.getBody().toString());
		JSONArray docuArray = (JSONArray)jsonObject.get("items");
		List originallink = new ArrayList();
		List description = new ArrayList();
		List title = new ArrayList();
		
		for(int i = 0 ; i <docuArray.size() ; i++) {
			JSONObject tmp = (JSONObject)docuArray.get(i);
			title.add((String)tmp.get("title"));
			originallink.add((String)tmp.get("originallink"));
			description.add((String)tmp.get("description"));


			resultMap.put("description", description);
			resultMap.put("title", title);
			resultMap.put("originallink", originallink);
			
		}
		} catch (Exception e) {
			e.printStackTrace();
		}

    	return resultMap;
	}
}

