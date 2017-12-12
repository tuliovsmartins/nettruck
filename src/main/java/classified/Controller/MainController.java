package classified.Controller;

import java.util.Date;
import java.util.UUID;

import javax.mail.MessagingException;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import classified.Config.Encrypt;
import classified.Service.MailSenderService;
import classified.Service.UserService;
import classified.Util.BreadCrumbs;
import classified.View.Model.UserDataVM;


@Controller
public class MainController {
	
	@Autowired
	private UserService userService;
	
	
	
	@Autowired
	private MailSenderService mailSender;
	
	@Autowired
	private Encrypt encrypt;
	
	
	@RequestMapping("/")
	public String home(Model model) {
		BreadCrumbs.set(model, "Home");
		return "/index/home";
	}
	
	
	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public String userLogin(Model model) {
		BreadCrumbs.set(model, "Login");
		return "/index/home";
	}
	
	@RequestMapping(value = "/blank", method = RequestMethod.GET)
	public String blank(Model model) {
		
		return "blank";
	}
	
	@RequestMapping(value = "/teste", method = RequestMethod.GET)
	public String teste(Model model) {
		
		return "teste";
	}
	
	@RequestMapping(value = "/cadastro", method = RequestMethod.GET)
	public String cadastro(Model model) {
		
		return "/index/cadastro";
	}

	@RequestMapping(value = "/createUser", method = RequestMethod.GET)
	public ModelAndView createUser(Model model, UserDataVM userDataVM) {
		
		ModelAndView mv = new ModelAndView("redirect:/login");
		
		return mv;

	}
	
	@RequestMapping(value = "/createUser", method = RequestMethod.POST)
	public ModelAndView salvar(@ModelAttribute UserDataVM userDataVM, BindingResult result, RedirectAttributes atributes 
			, Model model ) throws MessagingException {
		
		if(result.hasErrors()){
			
			return createUser(model, userDataVM);
			
		} 
		
			userDataVM.setFirst_login(true);
			userDataVM.setSignindate(new Date());
			userDataVM.setConfirmcode(UUID.randomUUID().toString());
			userDataVM = userService.createUser(userDataVM);
			mailSender.sendEmail(userDataVM.getEmail().toString(), "welcome", userDataVM);
			atributes.addFlashAttribute("message", "Usuário " + userDataVM.getName() + " cadastrado com sucesso!");
			ModelAndView mv = new ModelAndView("redirect:/login");
			return mv;
	}
	
	@RequestMapping(value = "/confirm/{confirmcode}", method = RequestMethod.GET)
	public String complete(Model model, @PathVariable String confirmcode, RedirectAttributes atributes) {
		BreadCrumbs.set(model, "Completar Cadastro");
		UserDataVM userDataVM = userService.findByConfirmCode(confirmcode);
		userDataVM.setConfirmed(true);
		userService.createUser(userDataVM);
		model.addAttribute("userDataVM",userDataVM);
		return "complete";

	}
	
	@RequestMapping(value = "/complete", method = RequestMethod.POST)
	public ModelAndView complete(@Valid @ModelAttribute UserDataVM userDataVM, BindingResult result, RedirectAttributes atributes 
			, Model model ) throws MessagingException {
		
		if(result.hasErrors()){
			
			return new ModelAndView("redirect:/confirm/" + userDataVM.getConfirmcode());
			
		} 
		if(userDataVM.getCadtype().equals("juridica")){
			userDataVM.setName(userDataVM.getName());
		}
		
		if(userDataVM.getCadtype().equals("juridica")){
			userDataVM.setDocument(userDataVM.getDocument());
		}

		userDataVM.setPassword(encrypt.passwordEncoder().encode(userDataVM.getPassword()));
		userDataVM.setSignindate(new Date());
		userDataVM.setName(userDataVM.getName());
		userDataVM.setStatus("Ativo");
		userDataVM.setRole("ROLE_USER");
		userDataVM.setConfirmed(true);
		userDataVM.setFirst_login(false);
		userDataVM.setCowntry("Brasil");
		userService.createUser(userDataVM);
		atributes.addFlashAttribute("message", "Olá " + userDataVM.getName() + " faça login para iniciar!");
		ModelAndView mv = new ModelAndView("redirect:/login");
		return mv;

	}

	
}
