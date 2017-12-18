package classified.Converter;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;
import classified.Entity.UsuarioConta;
import classified.View.Model.UsuarioContaDataVM;

@Component
public class UsuarioContaConverter {
	
	public UsuarioConta convert(UsuarioContaDataVM usuarioContaDataVM){
		
		UsuarioConta usuarioConta = new UsuarioConta();
		
		usuarioConta.setId(usuarioContaDataVM.getId());
		usuarioConta.setUserId(usuarioContaDataVM.getUserId());
		usuarioConta.setAnuncios(usuarioContaDataVM.getAnuncios());
		
		return usuarioConta;
	}
	
	public UsuarioContaDataVM convert(UsuarioConta usuarioConta){
		
		UsuarioContaDataVM usuarioContaDataVM = new UsuarioContaDataVM();
		
		usuarioContaDataVM.setId(usuarioConta.getId());
		usuarioContaDataVM.setUserId(usuarioConta.getUserId());
		usuarioContaDataVM.setAnuncios(usuarioConta.getAnuncios());
		
		return usuarioContaDataVM;
	}
	
	public List<UsuarioContaDataVM> convertMainList(List<UsuarioConta> usuarioConta){
	
		List<UsuarioContaDataVM> usuarioContaDataVM = new  ArrayList<UsuarioContaDataVM>();
		
		for(UsuarioConta usuarioContas : usuarioConta){
			usuarioContaDataVM.add(this.convert(usuarioContas));
        }
		
		return usuarioContaDataVM;
		
	}

}
