package classified.Converter;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import classified.Entity.CaminhoesModelo;
import classified.View.Model.CaminhoesModeloDataVM;

@Component
public class CaminhoesModeloConverter {
	
	public CaminhoesModelo convert(CaminhoesModeloDataVM caminhoesModeloDataVM){
		
		CaminhoesModelo caminhoesModelo = new CaminhoesModelo();
		
		caminhoesModelo.setId(caminhoesModeloDataVM.getId());
		caminhoesModelo.setMarcaId(caminhoesModeloDataVM.getMarcaId());
		caminhoesModelo.setModelo(caminhoesModeloDataVM.getModelo());
		caminhoesModelo.setTipo(caminhoesModeloDataVM.getTipo());
		
		return caminhoesModelo;
	}
	
	public CaminhoesModeloDataVM convert(CaminhoesModelo caminhoesModelo){
		
		CaminhoesModeloDataVM caminhoesModeloDataVM = new CaminhoesModeloDataVM();
		
		caminhoesModeloDataVM.setId(caminhoesModelo.getId());
		caminhoesModeloDataVM.setMarcaId(caminhoesModelo.getMarcaId());
		caminhoesModeloDataVM.setModelo(caminhoesModelo.getModelo());
		caminhoesModeloDataVM.setTipo(caminhoesModelo.getTipo());
		
		return caminhoesModeloDataVM;
	}
	
	public List<CaminhoesModeloDataVM> convertMainList(List<CaminhoesModelo> caminhoesModelo){
		
		List<CaminhoesModeloDataVM> caminhoesModeloDataVM = new  ArrayList<CaminhoesModeloDataVM>();
		
		for(CaminhoesModelo caminhoesModelos : caminhoesModelo){
			caminhoesModeloDataVM.add(this.convert(caminhoesModelos));
        }
		
		return caminhoesModeloDataVM;
		
	}

}
