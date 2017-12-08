package classified.Converter;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import classified.Entity.User;
import classified.View.Model.UserDataVM;

@Component
public class UserConverter {
	
	public User convert(UserDataVM userDataVM){
		
		User user = new User();
		
		user.setBirthdate(userDataVM.getBirthdate());
		user.setCadtype(userDataVM.getCadtype());
		user.setCompanyName(userDataVM.getCompanyName());
		user.setCity(userDataVM.getCity());
		user.setNeighborhood(userDataVM.getNeighborhood());
		user.setStreet(userDataVM.getStreet());
		user.setNumber(userDataVM.getNumber());
		user.setComplement(userDataVM.getComplement());
		user.setPostal(userDataVM.getPostal());
		user.setCowntry(userDataVM.getCowntry());
		user.setEmail(userDataVM.getEmail());
		user.setId(userDataVM.getId());
		user.setName(userDataVM.getName());
		user.setPassword(userDataVM.getPassword());
		user.setRole(userDataVM.getRole());
		user.setSignindate(userDataVM.getSignindate());
		user.setState(userDataVM.getState());
		user.setFirst_login(userDataVM.getFirst_login());
		user.setBirthdate(userDataVM.getBirthdate());
		user.setTelephone(userDataVM.getTelephone());
		user.setCellphone(userDataVM.getCellphone());
		user.setWhatsapp(userDataVM.getWhatsapp());
		user.setConfirmed(userDataVM.getConfirmed());
		user.setConfirmcode(userDataVM.getConfirmcode());
		user.setStatus(userDataVM.getStatus());
		user.setPromocionalCode(userDataVM.getPromocionalCode());
		user.setDocument(userDataVM.getDocument());
		
		return user;
	}
	
	public UserDataVM convert(User user){
		
		UserDataVM userDataVM = new UserDataVM();
		
		userDataVM.setBirthdate(user.getBirthdate());
		userDataVM.setCadtype(user.getCadtype());
		user.setCompanyName(userDataVM.getCompanyName());
		userDataVM.setCity(user.getCity());
		userDataVM.setNeighborhood(user.getNeighborhood());
		userDataVM.setStreet(user.getStreet());
		userDataVM.setNumber(user.getNumber());
		userDataVM.setComplement(user.getComplement());
		userDataVM.setPostal(user.getPostal());
		userDataVM.setConfirmed(user.getConfirmed());
		userDataVM.setCowntry(user.getCowntry());
		userDataVM.setEmail(user.getEmail());
		userDataVM.setId(user.getId());
		userDataVM.setName(user.getName());
		userDataVM.setPassword(user.getPassword());
		userDataVM.setRole(user.getRole());
		userDataVM.setSignindate(user.getSignindate());
		userDataVM.setState(user.getState());
		userDataVM.setFirst_login(user.getFirst_login());
		userDataVM.setBirthdate(user.getBirthdate());
		userDataVM.setTelephone(user.getTelephone());
		userDataVM.setCellphone(user.getCellphone());
		userDataVM.setWhatsapp(user.getWhatsapp());
		userDataVM.setStatus(user.getStatus());
		userDataVM.setConfirmcode(user.getConfirmcode());
		userDataVM.setPromocionalCode(user.getPromocionalCode());
		userDataVM.setDocument(user.getDocument());
		
		return userDataVM;
	}

	public List<UserDataVM> convertMainList(List<User> user){
		
		List<UserDataVM> userDataVM = new  ArrayList<UserDataVM>();
		
		for(User users : user){
			users.setSignindate(users.getSignindate());
			userDataVM.add(this.convert(users));
        }
		
		return userDataVM;
		
	}
}
