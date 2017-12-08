package classified.Converter;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import classified.Entity.Acessorios;
import classified.View.Model.AcessoriosDataVM;

@Component
public class AcessoriosConverter {
	
	public Acessorios convert(AcessoriosDataVM acessoriosDataVM){
		
		Acessorios acessorios = new Acessorios();
		
		acessorios.setId(acessoriosDataVM.getId());
		acessorios.setAcessorio(acessoriosDataVM.getAcessorio());
		
		return acessorios;
	}
	
	public AcessoriosDataVM convert(Acessorios acessorios){
		
		AcessoriosDataVM acessoriosDataVM = new AcessoriosDataVM();
		
		acessoriosDataVM.setId(acessorios.getId());
		acessoriosDataVM.setAcessorio(acessorios.getAcessorio());
		
		return acessoriosDataVM;
	}
	
	public List<AcessoriosDataVM> convertMainList(List<Acessorios> acessorios){
		
		List<AcessoriosDataVM> acessoriosDataVM = new  ArrayList<AcessoriosDataVM>();
		
		for(Acessorios acessorio : acessorios){
			acessoriosDataVM.add(this.convert(acessorio));
        }
		
		return acessoriosDataVM;
		
	}

}
