package classified.Controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import br.com.uol.pagseguro.domain.AccountCredentials;
import br.com.uol.pagseguro.domain.Transaction;
import br.com.uol.pagseguro.exception.PagSeguroServiceException;
import br.com.uol.pagseguro.properties.PagSeguroConfig;
import br.com.uol.pagseguro.service.SessionService;
import classified.Service.PaymentService;
import classified.Service.PlanosService;
import classified.Util.BreadCrumbs;
import classified.Util.CardTypeUtil;
import classified.Util.UserInfo;
import classified.Util.TransactionStatusUtil;
import classified.View.Model.PlanosDataVM;
import classified.View.Model.UserCreditCardDataVM;
import classified.View.Model.UserDataVM;;

@Controller
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	private PlanosService planosService;
	
	@Autowired
	private UserInfo userInfo;
	
	@Autowired
	PaymentService paymentService;
	
	@RequestMapping("/panel")
	public String userPanel(Model model) throws InterruptedException {
		BreadCrumbs.set(model, "Painel");
		userInfo.getUserInfo(model);
		return "/user/panel";
		
	}
	
	@RequestMapping("/account")
	public String userAccount(Model model) throws InterruptedException {
		BreadCrumbs.set(model, "Painel");
		userInfo.getUserInfo(model);
		List<PlanosDataVM> planos = planosService.getPlanos();
		model.addAttribute("planos",planos);
		
		return "/user/conta";
		
	}
	
	@RequestMapping(value = "/getSession", method = RequestMethod.GET)
	@ResponseBody
	public String getSession(Model model) throws PagSeguroServiceException {

		final AccountCredentials accountCredentials = PagSeguroConfig.getAccountCredentials();
		final String sessionId = SessionService.createSession(accountCredentials);
		model.addAttribute("sessionId",sessionId);
		System.out.println("Session ID: " + sessionId);
		return sessionId;
	}
	
	@RequestMapping(value = "/getCardBrand", method = RequestMethod.POST)
	@ResponseBody
	public String getCardBrand(Model model, @RequestParam("cardBin") String cardBin) throws PagSeguroServiceException {
	
		String brand =	CardTypeUtil.detect(cardBin).toString();
		System.out.println("Card Brand: " + brand);
		return brand;
	}
	
	@RequestMapping(value = "/acquireCredits", method = RequestMethod.POST)
	@ResponseBody
	public Transaction acquireCredits(Model model, @RequestBody UserCreditCardDataVM params  ) {

		UserDataVM userDataVM = userInfo.getUserInfo(model);
		
		params.setSenderName(userDataVM.getName());
		params.setUser_id(userDataVM.getId());
		params.setEmail(userDataVM.getEmail());
		
		String method = params.getPaymentMethod();
		
		Transaction response = null;
		
		if(method.equals("creditCard"))
			response =  PaymentService.createTransactionUsingCreditCard(params);
		if(method.equals("boleto"))
			response =  PaymentService.createTransactionUsingBoleto(params);
		if(method.equals("eft"))
			response =  PaymentService.createTransactionUsingEft(params);
		
		params.setStatus(TransactionStatusUtil.getDescription(response.getStatus().name()));
		params.setTransactionCode(((br.com.uol.pagseguro.domain.Transaction) response).getCode().toString());
		params.setDateTime(((br.com.uol.pagseguro.domain.Transaction) response).getDate());
		
		paymentService.saveTransaction(params);
		
		
		model.addAttribute("cad", "Cadastro");
		return response;
	}
	

}
