package classified.Converter;


import org.springframework.stereotype.Component;

import classified.Entity.UserCreditCard;
import classified.View.Model.UserCreditCardDataVM;

@Component
public class UserCreditCardConverter {

	
	public static UserCreditCardDataVM convert(UserCreditCard userCreditCard){
		
		UserCreditCardDataVM userCreditCardDataVM = new UserCreditCardDataVM();
		
		userCreditCardDataVM.setId(userCreditCard.getId());
		userCreditCardDataVM.setSenderName(userCreditCard.getSenderName());
		userCreditCardDataVM.setBankName(userCreditCard.getBankName());
		userCreditCardDataVM.setCardCvv(userCreditCard.getCardCvv());
		userCreditCardDataVM.setCardExpirationMonth(userCreditCard.getCardExpirationMonth());
		userCreditCardDataVM.setCardExpirationYear(userCreditCard.getCardExpirationYear());
		userCreditCardDataVM.setCardNumber(userCreditCard.getCardNumber());
		userCreditCardDataVM.setCreditCardBrand(userCreditCard.getCreditCardBrand());
		userCreditCardDataVM.setCreditCardHolderAreaCode(userCreditCard.getCreditCardHolderAreaCode());
		userCreditCardDataVM.setCreditCardHolderBirthDate(userCreditCard.getCreditCardHolderBirthDate());
		userCreditCardDataVM.setCreditCardHolderCPF(userCreditCard.getCreditCardHolderCPF());
		userCreditCardDataVM.setCreditCardHolderName(userCreditCard.getCreditCardHolderName());
		userCreditCardDataVM.setCreditCardHolderPhone(userCreditCard.getCreditCardHolderPhone());
		userCreditCardDataVM.setCreditCardToken(userCreditCard.getCreditCardToken());
		userCreditCardDataVM.setDateTime(userCreditCard.getDateTime());
		userCreditCardDataVM.setEmail(userCreditCard.getEmail());
		userCreditCardDataVM.setItemAmount(userCreditCard.getItemAmount());
		userCreditCardDataVM.setItemDescription(userCreditCard.getItemDescription());
		userCreditCardDataVM.setItemId(userCreditCard.getItemId());
		userCreditCardDataVM.setPaymentMethod(userCreditCard.getPaymentMethod());
		userCreditCardDataVM.setSenderHash(userCreditCard.getSenderHash());
		userCreditCardDataVM.setStatus(userCreditCard.getStatus());
		userCreditCardDataVM.setTransactionCode(userCreditCard.getTransactionCode());
		userCreditCardDataVM.setUser_id(userCreditCard.getUser_id());
		userCreditCardDataVM.setDateTime(userCreditCard.getDateTime());

		return userCreditCardDataVM;
		
	}

	
	
public static UserCreditCard convert(UserCreditCardDataVM userCreditCardDataVM){
		
		UserCreditCard userCreditCard = new UserCreditCard();

		userCreditCard.setId(userCreditCardDataVM.getId());
		userCreditCard.setSenderName(userCreditCardDataVM.getSenderName());
		userCreditCard.setBankName(userCreditCardDataVM.getBankName());
		userCreditCard.setCardCvv(userCreditCardDataVM.getCardCvv());
		userCreditCard.setCardExpirationMonth(userCreditCardDataVM.getCardExpirationMonth());
		userCreditCard.setCardExpirationYear(userCreditCardDataVM.getCardExpirationYear());
		userCreditCard.setCardNumber(userCreditCardDataVM.getCardNumber());
		userCreditCard.setPaymentMethod(userCreditCardDataVM.getPaymentMethod());
		userCreditCard.setCreditCardBrand(userCreditCardDataVM.getCreditCardBrand());
		userCreditCard.setCreditCardHolderAreaCode(userCreditCardDataVM.getCreditCardHolderAreaCode());
		userCreditCard.setCreditCardHolderBirthDate(userCreditCardDataVM.getCreditCardHolderBirthDate());
		userCreditCard.setCreditCardHolderCPF(userCreditCardDataVM.getCreditCardHolderCPF());
		userCreditCard.setCreditCardHolderName(userCreditCardDataVM.getCreditCardHolderName());
		userCreditCard.setCreditCardHolderPhone(userCreditCardDataVM.getCreditCardHolderPhone());
		userCreditCard.setCreditCardToken(userCreditCardDataVM.getCreditCardToken());
		userCreditCard.setDateTime(userCreditCardDataVM.getDateTime());
		userCreditCard.setEmail(userCreditCardDataVM.getEmail());
		userCreditCard.setItemAmount(userCreditCardDataVM.getItemAmount());
		userCreditCard.setItemDescription(userCreditCardDataVM.getItemDescription());
		userCreditCard.setItemId(userCreditCardDataVM.getItemId());
		userCreditCard.setPaymentMethod(userCreditCardDataVM.getPaymentMethod());
		userCreditCard.setSenderHash(userCreditCardDataVM.getSenderHash());
		userCreditCard.setStatus(userCreditCardDataVM.getStatus());
		userCreditCard.setTransactionCode(userCreditCardDataVM.getTransactionCode());
		userCreditCard.setUser_id(userCreditCardDataVM.getUser_id());
		userCreditCard.setDateTime(userCreditCardDataVM.getDateTime());
		
		return userCreditCard;
		
	}
	
}
