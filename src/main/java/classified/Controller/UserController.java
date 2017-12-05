package classified.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import classified.Util.BreadCrumbs;
import classified.Util.UserInfo;

@Controller
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	private UserInfo userInfo;
	
	
	@RequestMapping("/panel")
	public String userPanel(Model model) throws InterruptedException {
		BreadCrumbs.set(model, "Painel");
		userInfo.getUserInfo(model);
		
		return "/user/panel";
		
	}
	
	

}
