package classified.View.Model;

import java.io.Serializable;
import java.util.Date;


public class UserCreditCardDataVM implements Serializable {

	 	private static final long serialVersionUID = 1L;
	 
	 	private long id;
		private long user_id;
		private String senderName;
		private String bankName;
		private String paymentMethod;
		private String email;
		private String cardCvv;
		private String cardExpirationMonth;
		private String cardExpirationYear;
		private String cardNumber;
		private String creditCardBrand;
		private String creditCardHolderAreaCode;
		private String creditCardHolderBirthDate;
		private String creditCardHolderCPF;
		private String creditCardHolderName;
		private String creditCardHolderPhone;
		private String creditCardToken;
		private String itemAmount;
		private String itemDescription;
		private String itemId;
		private String itemQuantity;
		private String senderHash;
		private String status;
		private Date dateTime;
		private String transactionCode;

		public long getId() {
			return id;
		}
		public void setId(long id) {
			this.id = id;
		}
		public String getSenderName() {
			return senderName;
		}
		public void setSenderName(String senderName) {
			this.senderName = senderName;
		}
		public String getBankName() {
			return bankName;
		}
		public void setBankName(String bankName) {
			this.bankName = bankName;
		}
		public Date getDateTime() {
			return dateTime;
		}
		public void setDateTime(Date date) {
			this.dateTime = date;
		}
		public String getTransactionCode() {
			return transactionCode;
		}
		public void setTransactionCode(String transactionCode) {
			this.transactionCode = transactionCode;
		}
		public String getStatus() {
			return status;
		}
		public void setStatus(String status) {
			this.status = status;
		}
		public long getUser_id() {
			return user_id;
		}
		public void setUser_id(long user_id) {
			this.user_id = user_id;
		}
		public String getPaymentMethod() {
			return paymentMethod;
		}
		public void setPaymentMethod(String paymentMethod) {
			this.paymentMethod = paymentMethod;
		}
		public String getEmail() {
			return email;
		}
		public void setEmail(String email) {
			this.email = email;
		}
		public String getCardCvv() {
			return cardCvv;
		}
		public void setCardCvv(String cardCvv) {
			this.cardCvv = cardCvv;
		}
		public String getCardExpirationMonth() {
			return cardExpirationMonth;
		}
		public void setCardExpirationMonth(String cardExpirationMonth) {
			this.cardExpirationMonth = cardExpirationMonth;
		}
		public String getCardExpirationYear() {
			return cardExpirationYear;
		}
		public void setCardExpirationYear(String cardExpirationYear) {
			this.cardExpirationYear = cardExpirationYear;
		}
		public String getCardNumber() {
			return cardNumber;
		}
		public void setCardNumber(String cardNumber) {
			this.cardNumber = cardNumber;
		}
		public String getCreditCardBrand() {
			return creditCardBrand;
		}
		public void setCreditCardBrand(String creditCardBrand) {
			this.creditCardBrand = creditCardBrand;
		}
		public String getCreditCardHolderAreaCode() {
			return creditCardHolderAreaCode;
		}
		public void setCreditCardHolderAreaCode(String creditCardHolderAreaCode) {
			this.creditCardHolderAreaCode = creditCardHolderAreaCode;
		}
		public String getCreditCardHolderBirthDate() {
			return creditCardHolderBirthDate;
		}
		public void setCreditCardHolderBirthDate(String creditCardHolderBirthDate) {
			this.creditCardHolderBirthDate = creditCardHolderBirthDate;
		}
		public String getCreditCardHolderCPF() {
			return creditCardHolderCPF;
		}
		public void setCreditCardHolderCPF(String creditCardHolderCPF) {
			this.creditCardHolderCPF = creditCardHolderCPF;
		}
		public String getCreditCardHolderName() {
			return creditCardHolderName;
		}
		public void setCreditCardHolderName(String creditCardHolderName) {
			this.creditCardHolderName = creditCardHolderName;
		}
		public String getCreditCardHolderPhone() {
			return creditCardHolderPhone;
		}
		public void setCreditCardHolderPhone(String creditCardHolderPhone) {
			this.creditCardHolderPhone = creditCardHolderPhone;
		}
		public String getCreditCardToken() {
			return creditCardToken;
		}
		public void setCreditCardToken(String creditCardToken) {
			this.creditCardToken = creditCardToken;
		}
		public String getItemAmount() {
			return itemAmount;
		}
		public void setItemAmount(String itemAmount) {
			this.itemAmount = itemAmount;
		}
		public String getItemDescription() {
			return itemDescription;
		}
		public void setItemDescription(String itemDescription) {
			this.itemDescription = itemDescription;
		}
		public String getItemId() {
			return itemId;
		}
		public void setItemId(String itemId) {
			this.itemId = itemId;
		}
		public String getItemQuantity() {
			return itemQuantity;
		}
		public void setItemQuantity(String itemQuantity) {
			this.itemQuantity = itemQuantity;
		}
		public String getSenderHash() {
			return senderHash;
		}
		public void setSenderHash(String senderHash) {
			this.senderHash = senderHash;
		}
		public static long getSerialversionuid() {
			return serialVersionUID;
		}
}
