package classified.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import classified.Converter.AnuncioFotoConverter;
import classified.Converter.AnunciosConverter;
import classified.Interface.AnuncioFotoInterface;
import classified.Interface.AnunciosInterface;
import classified.View.Model.AnuncioFotoDataVM;
import classified.View.Model.AnunciosDataVM;

@Service
public class AnunciosService {
	
	@Autowired
	AnunciosConverter anunciosConverter;
	
	@Autowired
	AnunciosInterface anunciosInterface;
	
	@Autowired
	AnuncioFotoConverter anuncioFotoConverter;
	
	@Autowired
	AnuncioFotoInterface anuncioFotoInterface;
	
	public AnunciosDataVM createAnuncio( AnunciosDataVM anunciosDataVM){
		
		AnunciosDataVM retAnunciosDataVM = anunciosConverter.convert(anunciosInterface.saveAndFlush(anunciosConverter.convert(anunciosDataVM)));
		 
		return retAnunciosDataVM;
		
	}
	
	public AnuncioFotoDataVM cadFotos( AnuncioFotoDataVM anuncioFotoDataVM){
		
		AnuncioFotoDataVM retAnuncioFotoDataVM = anuncioFotoConverter.convert(anuncioFotoInterface.saveAndFlush(anuncioFotoConverter.convert(anuncioFotoDataVM)));
		 
		return retAnuncioFotoDataVM;
		
	}
}
