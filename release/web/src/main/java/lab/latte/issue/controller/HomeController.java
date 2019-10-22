package lab.latte.issue.controller;

import java.util.List;
import java.util.Locale;
import java.util.Properties;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import lab.latte.issue.model.EmployeeVO;
import lab.latte.issue.service.IHrService;

/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController {
	
	@SuppressWarnings("unused")
	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	
	@Resource(name = "hrService")
	private IHrService hrService;
	
	@Resource(name="envProperties")
	private Properties env;
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Locale locale, Model model) {

		return "home";
	}
	
	@RequestMapping(value = "/test", method = RequestMethod.GET)
	public String test(Locale locale, Model model) {
		
		List<EmployeeVO> listEmployee = hrService.getEmployeesAll();
		model.addAttribute("employees", listEmployee);
		
		return "test";
	}
	
	@RequestMapping(value = "/3d-test", method = RequestMethod.GET)
	public String test3d(Locale locale, Model model) {
		
		
		return "3d-test";
	}
	
	@RequestMapping(value = "/1st-test", method = RequestMethod.GET)
	public String jh_test(Locale locale, Model model) {
		
		
		return "1st-test";
	}
	
}
