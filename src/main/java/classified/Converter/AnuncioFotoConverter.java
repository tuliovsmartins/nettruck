package classified.Converter;

import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Component;
import classified.Entity.AnuncioFoto;
import classified.View.Model.AnuncioFotoDataVM;

@Component
public class AnuncioFotoConverter {
	
	public AnuncioFoto convert(AnuncioFotoDataVM anuncioFotoDataVM){
			
			AnuncioFoto anuncioFoto = new AnuncioFoto();
			
			anuncioFoto.setId(anuncioFotoDataVM.getId());
			anuncioFoto.setAnuncioId(anuncioFotoDataVM.getAnuncioId());
			anuncioFoto.setFoto(anuncioFotoDataVM.getFoto());
			anuncioFoto.setPrincipal(anuncioFotoDataVM.getPrincipal());
			anuncioFoto.setCadData(anuncioFotoDataVM.getCadData());
			
			return anuncioFoto;
			
	}
	
	public AnuncioFotoDataVM convert(AnuncioFoto anuncioFoto){
		
		AnuncioFotoDataVM anuncioFotoDataVM = new AnuncioFotoDataVM();
		
		anuncioFotoDataVM.setId(anuncioFoto.getId());
		anuncioFotoDataVM.setAnuncioId(anuncioFoto.getAnuncioId());
		anuncioFotoDataVM.setFoto(anuncioFoto.getFoto());
		anuncioFotoDataVM.setPrincipal(anuncioFoto.getPrincipal());
		anuncioFotoDataVM.setCadData(anuncioFoto.getCadData());
		
		return anuncioFotoDataVM;
		
	}
	
	
	public List<AnuncioFotoDataVM> convertMainList(List<AnuncioFoto> anuncioFoto){
		
		List<AnuncioFotoDataVM> anuncioFotoDataVM = new  ArrayList<AnuncioFotoDataVM>();
		
		for(AnuncioFoto anuncioFotos : anuncioFoto){
			anuncioFotoDataVM.add(this.convert(anuncioFotos));
        }
		
		return anuncioFotoDataVM;
		
	}
	
	

}
