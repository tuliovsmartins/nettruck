package classified.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import classified.Converter.AnunciosConverter;
import classified.Interface.AnunciosInterface;
import classified.View.Model.AnunciosDataVM;

@Service
public class AnunciosService {
	
	@Autowired
	AnunciosConverter anunciosConverter;
	
	@Autowired
	AnunciosInterface anunciosInterface;
	
	public AnunciosDataVM createAnuncio( AnunciosDataVM anunciosDataVM){
		
		AnunciosDataVM retAnunciosDataVM = anunciosConverter.convert(anunciosInterface.saveAndFlush(anunciosConverter.convert(anunciosDataVM)));
		 
		return retAnunciosDataVM;
		
	}
}