package classified.Interface;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import classified.Entity.UserCreditCard;

@Repository
@Transactional
public class PaymentDao {
	
	@Autowired
	private EntityManager entityManager;
	
	public void create(UserCreditCard userCreditCard) {
		
		entityManager.merge(userCreditCard);
		return;
	}
	
	public UserCreditCard getTransactionByCode(String code) {
		
		UserCreditCard userCreditCard = new UserCreditCard();
		
		Query got = entityManager.createQuery("from UserCreditCard where transactionCode = :code");
		got.setParameter("code", code);
		try {
			userCreditCard = (UserCreditCard) got.getSingleResult();
			return userCreditCard;
		} catch (Exception ex) {
			return userCreditCard;
		}
	}

}
