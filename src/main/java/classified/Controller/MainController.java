package classified.Controller;

import org.springframework.boot.autoconfigure.web.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import classified.Util.BreadCrumbs;


@Controller
public class MainController {
	
	// implements ErrorController
	private static final String PATH = "/error";
	
	
	@RequestMapping("/")
	public String index(Model model) {
		BreadCrumbs.set(model, "Home");
		return "home";
	}
	
//    @RequestMapping(value = PATH)
//    public String error(Model model) {
//    	BreadCrumbs.set(model, "Erro");
//        return "404";
//    }
//
//    public String getErrorPath() {
//        return PATH;
//    }
	
	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public String userLogin(Model model) {
		BreadCrumbs.set(model, "Login");
		return "login";
	}
	
	@RequestMapping(value = "/blank", method = RequestMethod.GET)
	public String blank(Model model) {
		
		return "blank";
	}
	
}
