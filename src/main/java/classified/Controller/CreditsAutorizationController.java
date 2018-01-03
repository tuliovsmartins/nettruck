package classified.Controller;

import java.math.BigDecimal;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.uol.pagseguro.domain.Transaction;
import br.com.uol.pagseguro.exception.PagSeguroServiceException;
import br.com.uol.pagseguro.properties.PagSeguroConfig;
import br.com.uol.pagseguro.service.NotificationService;

import classified.Util.TransactionStatusUtil;
import classified.View.Model.CreditsNotification;
import classified.View.Model.UserCreditCardDataVM;
import classified.Service.PaymentService;

@CrossOrigin(origins = "https://sandbox.pagseguro.uol.com.br", maxAge = 3600)
@RestController
@Controller
public class CreditsAutorizationController {
	
	@Autowired
	PaymentService paymentService;
	
	@RequestMapping(value = "/payResponse", method = RequestMethod.POST)
	@ResponseBody
	public void payResponse(Model model, @ModelAttribute CreditsNotification creditsNotification, HttpServletResponse response  ) {
		
		String notificationCode = creditsNotification.getNotificationCode();;

        Transaction transaction = null;

        try {

            transaction = NotificationService.checkTransaction(PagSeguroConfig.getAccountCredentials(),
            		notificationCode);

        } catch (PagSeguroServiceException e) {
            System.err.println(e.getMessage());
        }

        if (transaction != null) {
        	UserCreditCardDataVM userCreditCardDataVM = new UserCreditCardDataVM();
        	userCreditCardDataVM = paymentService.getTransactionByCode(transaction.getCode());
        	userCreditCardDataVM.setStatus(TransactionStatusUtil.getDescription(transaction.getStatus().name()));
        	paymentService.saveTransaction(userCreditCardDataVM);
        	if(transaction.getStatus().getValue().equals(3)){
        		
        		long userId = userCreditCardDataVM.getUser_id();
        		BigDecimal value = transaction.getGrossAmount();
        		//userAccountService.addUserAccount(userId, value);
        	}
        	
        }

	}
}
