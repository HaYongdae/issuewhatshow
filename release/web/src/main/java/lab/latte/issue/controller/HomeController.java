package lab.latte.issue.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Properties;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

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
	
	
	/*
	@RequestMapping(value = "/3d-test", method = RequestMethod.GET)
	public String test3d(Locale locale, Model model) {
		
		return "3d-test";
	}
	
	@RequestMapping(value = "/main-test", method = RequestMethod.GET)
	public String mainTest(Locale locale, Model model) {
		
		return "main-test";
	}
	
	
	*/

}
