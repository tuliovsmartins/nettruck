package classified.Util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import classified.Service.UserService;
import classified.View.Model.UserDataVM;

@Service
public class UserInfo {
	
	@Autowired
	private UserService userService;
	
	public UserDataVM getUserInfo(Model model){
		
		
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		UserDetails userDetail = (UserDetails) auth.getPrincipal();
		String email = userDetail.getUsername();
		
		UserDataVM userDataVM = userService.getByEmail(email);
		
		
		String[] fullname = userDataVM.getName().split(" ");
		if(fullname.length > 0) {
	        userDataVM.setName(fullname[0] + " " + fullname[fullname.length -1]);
	    }
				
		model.addAttribute("user", userDataVM);
		
		return userDataVM;
	}

}
