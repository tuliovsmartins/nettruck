package classified.Service;

import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.uol.pagseguro.domain.AccountCredentials;
import br.com.uol.pagseguro.domain.Address;
import br.com.uol.pagseguro.domain.Document;
import br.com.uol.pagseguro.domain.Item;
import br.com.uol.pagseguro.domain.Phone;
import br.com.uol.pagseguro.domain.Sender;
import br.com.uol.pagseguro.domain.SenderDocument;
import br.com.uol.pagseguro.domain.Transaction;
import br.com.uol.pagseguro.domain.direct.Holder;
import br.com.uol.pagseguro.domain.direct.Installment;
import br.com.uol.pagseguro.domain.direct.checkout.BoletoCheckout;
import br.com.uol.pagseguro.domain.direct.checkout.CreditCardCheckout;
import br.com.uol.pagseguro.domain.direct.checkout.OnlineDebitCheckout;
import br.com.uol.pagseguro.enums.Currency;
import br.com.uol.pagseguro.enums.DocumentType;
import br.com.uol.pagseguro.enums.PaymentMode;
import br.com.uol.pagseguro.enums.ShippingType;
import br.com.uol.pagseguro.exception.PagSeguroServiceException;
import br.com.uol.pagseguro.properties.PagSeguroConfig;
import br.com.uol.pagseguro.service.TransactionService;

import classified.Converter.UserCreditCardConverter;
import classified.Interface.PaymentDao;
import classified.Entity.UserCreditCard;
import classified.View.Model.UserCreditCardDataVM;

@Service
public class PaymentService {
	
	@Autowired
	PaymentDao paymentDao;

    public static Transaction createTransactionUsingCreditCard(UserCreditCardDataVM userCreditCardDataVM) {
        
    	final CreditCardCheckout request = new CreditCardCheckout();
    	
    	String sender = userCreditCardDataVM.getSenderName().toString(); 
    	String holder =	userCreditCardDataVM.getCreditCardHolderName().toString();
    	String creditCardHolderBirthDate = userCreditCardDataVM.getCreditCardHolderBirthDate();
    	String ddd = userCreditCardDataVM.getCreditCardHolderAreaCode().toString();
    	String phone = userCreditCardDataVM.getCreditCardHolderPhone().toString();
    	String cpf = userCreditCardDataVM.getCreditCardHolderCPF().toString();
    	String senderHash = userCreditCardDataVM.getSenderHash().toString();
    	String cardToken = userCreditCardDataVM.getCreditCardToken().toString();
    	String itemDescription = userCreditCardDataVM.getItemDescription().toString();
    	String itemId = userCreditCardDataVM.getItemId().toString();
    	String itemQuantity = userCreditCardDataVM.getItemQuantity().toString();
    	String itemAmount = userCreditCardDataVM.getItemAmount().toString();
    	String notificationURL =  "http://localhost:8080/payResponse";
    	
        request.setPaymentMode(PaymentMode.DEFAULT);
        request.setCurrency(Currency.BRL);
        request.setNotificationURL(notificationURL);
        request.setReference("REF1234");
        
        request.setSender(new Sender(sender, "c11890518261649240507@sandbox.pagseguro.com.br", new Phone("34", "991127338"),  new SenderDocument(DocumentType.CPF, "05579504659")));
        request.setSenderHash(senderHash);
        
        request.setShippingAddress(new Address("BRA", "MG", "Uberlândia", "Cidade Jardim", "38412144", "Rua dos Eucaliptos", "106", ""));
        request.setShippingType(ShippingType.SEDEX);
        request.setShippingCost(new BigDecimal("0.00"));
        request.addItem(new Item(itemQuantity, itemDescription, Integer.valueOf(itemId), new BigDecimal(itemAmount)));
        request.setCreditCardToken(cardToken);
        request.setInstallment(new Installment(1, new BigDecimal(itemAmount)));
        request.setHolder(new Holder(holder, new Phone(ddd, phone), new Document(DocumentType.CPF, cpf), creditCardHolderBirthDate));
        request.setBillingAddress(new Address("BRA", "SP", "Sao Paulo", "Jardim Paulistano", "01452002", "Av. Brig. Faria Lima", "1384", "5º andar"));
        
        Transaction response = null;

        try {
	            final AccountCredentials accountCredentials = PagSeguroConfig.getAccountCredentials();
	            final Transaction transaction = TransactionService.createTransaction(accountCredentials, request);
	            
	            if (transaction != null) {
	                System.out.println("Transaction Code: " + transaction.getCode());
	                response = transaction;
	            }
	        } catch (PagSeguroServiceException e) {
	        	System.out.println("Transaction Erro: " + e.getMessage());
	        }
			
        		
	        	return response;
        
    }

    
    public static Transaction createTransactionUsingBoleto(UserCreditCardDataVM userCreditCardDataVM) {
        final BoletoCheckout request = new BoletoCheckout();
        
        String sender = userCreditCardDataVM.getSenderName().toString(); 
    	String senderHash = userCreditCardDataVM.getSenderHash().toString();
    	String itemDescription = userCreditCardDataVM.getItemDescription().toString();
    	String itemId = userCreditCardDataVM.getItemId().toString();
    	String itemQuantity = userCreditCardDataVM.getItemQuantity().toString();
    	String itemAmount = userCreditCardDataVM.getItemAmount().toString();
    	String notificationURL =  "http://181.222.244.105:8080/payResponse";

        request.setPaymentMode(PaymentMode.DEFAULT);
        request.setCurrency(Currency.BRL);
        request.setNotificationURL(notificationURL);
        request.setReference("REF1234");

        request.setSender(new Sender(sender, "c11890518261649240507@sandbox.pagseguro.com.br", new Phone("34", "991127338"),  new SenderDocument(DocumentType.CPF, "05579504659")));
        request.setSenderHash(senderHash);

        request.setShippingAddress(new Address("BRA", "MG", "Uberlândia", "Cidade Jardim", "38412144", "Rua dos Eucaliptos", "106", ""));
        request.setShippingType(ShippingType.SEDEX);
        request.setShippingCost(new BigDecimal("0.00"));

        request.addItem(new Item(itemQuantity, itemDescription, Integer.valueOf(itemId), new BigDecimal(itemAmount)));

        Transaction response = null;
        
        try {

            final AccountCredentials accountCredentials = PagSeguroConfig.getAccountCredentials();

            final Transaction transaction = TransactionService.createTransaction(accountCredentials, request);

            if (transaction != null) {
                System.out.println("Transaction Code: " + transaction.getCode());
                response = transaction;
            }
        } catch (PagSeguroServiceException e) {
        	System.out.println("Transaction Erro: " + e.getMessage());
        }
		
        	return response;
    }
    
    public static Transaction createTransactionUsingEft(UserCreditCardDataVM userCreditCardDataVM) {
        
    	final OnlineDebitCheckout request = new OnlineDebitCheckout();
        
        String sender = userCreditCardDataVM.getSenderName().toString(); 
    	String senderHash = userCreditCardDataVM.getSenderHash().toString();
    	String itemDescription = userCreditCardDataVM.getItemDescription().toString();
    	String itemId = userCreditCardDataVM.getItemId().toString();
    	String itemQuantity = userCreditCardDataVM.getItemQuantity().toString();
    	String itemAmount = userCreditCardDataVM.getItemAmount().toString();
    	String bankName = userCreditCardDataVM.getBankName().toString();
    	String notificationURL =  "http://181.222.244.105:8080/payResponse";

    	request.setPaymentMode(PaymentMode.DEFAULT);
        request.setCurrency(Currency.BRL);
        request.setNotificationURL(notificationURL);
        request.setReference("REF1234");
        
        request.setSender(new Sender(sender, "c11890518261649240507@sandbox.pagseguro.com.br", new Phone("34", "991127338"),  new SenderDocument(DocumentType.CPF, "05579504659")));
        request.setSenderHash(senderHash);
        
        request.setShippingAddress(new Address("BRA", "MG", "Uberlândia", "Cidade Jardim", "38412144", "Rua dos Eucaliptos", "106", ""));
        request.setShippingType(ShippingType.SEDEX);
        request.setShippingCost(new BigDecimal("0.00"));
        request.addItem(new Item(itemQuantity, itemDescription, Integer.valueOf(itemId), new BigDecimal(itemAmount)));
        
        Transaction response = null;

        request.setBankName(bankName);

        try {
        	
            final AccountCredentials accountCredentials = PagSeguroConfig.getAccountCredentials();
            final Transaction transaction = TransactionService.createTransaction(accountCredentials, request);

            if (transaction != null) {
                System.out.println("Transaction Code: " + transaction.getCode());
                response = transaction;
            }
        } catch (PagSeguroServiceException e) {
        	System.out.println("Transaction Erro: " + e.getMessage());
        }
		
        	return response;
    }
    
    public void saveTransaction(UserCreditCardDataVM userCreditCardDataVM){
    	
    	UserCreditCard userCreditCard = new UserCreditCard();
    	userCreditCard = UserCreditCardConverter.convert(userCreditCardDataVM);
    	paymentDao.create(userCreditCard);
    	
    	return;
    	
    }
    
    public UserCreditCardDataVM getTransactionByCode(String code){
	 
		 UserCreditCardDataVM userCreditCardDataVM = new UserCreditCardDataVM();
		 userCreditCardDataVM = UserCreditCardConverter.convert(paymentDao.getTransactionByCode(code));
    	 return userCreditCardDataVM;
    	
    }
    
    
}
