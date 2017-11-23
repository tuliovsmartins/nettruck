package classified.Service;

import java.text.ParseException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import classified.Interface.UserInterface;
import classified.Converter.UserConverter;
import classified.View.Model.UserDataVM;

@Service
public class UserService {
	
	@Autowired
	private UserConverter userConverter;
	
	@Autowired
	private UserInterface userInterface;
	
	public boolean checkDuplicateEmail(String email, UserDataVM userDataVM){
		
		UserDataVM result = userConverter.convert(userInterface.findByEmail(email));
		
		if(result.getEmail() == "" || result.getEmail() == null){

			return true;
			
		}else{
			
			return false;
		}
	}
	
	public UserDataVM createUser( UserDataVM userDataVM){
		
		UserDataVM AuxUserDataVM = userConverter.convert(userInterface.saveAndFlush(userConverter.convert(userDataVM)));
		 
		return AuxUserDataVM;
		
	}
	
	public UserDataVM findByConfirmCode( String uuid){
		
		UserDataVM AuxUserDataVM = userConverter.convert(userInterface.findByConfirmcode(uuid));
		 
		return AuxUserDataVM;
		
	}
	
	public UserDataVM getByEmail(String email){
		 
		UserDataVM result = null ;
		try {
				return result = userConverter.convert(userInterface.findByEmail(email));  
		    
			}
			    catch (Exception ex) {
			     return result;
		    }
	}
	
	public List<UserDataVM> getAllUsers() throws ParseException{
		
		List<UserDataVM> allUsers = userConverter.convertMainList(userInterface.findAll()); 
		return allUsers;
	}
}
