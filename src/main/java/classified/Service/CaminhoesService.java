package classified.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import classified.Converter.CaminhoesAnoConverter;
import classified.Converter.CaminhoesMarcaConverter;
import classified.Converter.CaminhoesModeloConverter;
import classified.Interface.CaminhoesAnoInterface;
import classified.Interface.CaminhoesMarcaInterface;
import classified.Interface.CaminhoesModeloInterface;
import classified.View.Model.CaminhoesAnoDataVM;
import classified.View.Model.CaminhoesMarcaDataVM;
import classified.View.Model.CaminhoesModeloDataVM;

@Service
public class CaminhoesService {
	
	@Autowired
	private CaminhoesMarcaConverter caminhoesMarcaConverter;
	
	@Autowired
	private CaminhoesMarcaInterface caminhoesMarcaInterface;
	
	@Autowired
	private CaminhoesModeloConverter caminhoesModeloConverter;
	
	@Autowired
	private CaminhoesModeloInterface caminhoesModeloInterface;
	
	@Autowired
	private CaminhoesAnoConverter caminhoesAnoConverter;
	
	@Autowired
	private CaminhoesAnoInterface caminhoesAnoInterface;
	
	
	public CaminhoesMarcaDataVM createMarca( CaminhoesMarcaDataVM caminhoesMarcaDataVM){
		
		CaminhoesMarcaDataVM auxCaminhoesMarcaDataVM = caminhoesMarcaConverter.convert(caminhoesMarcaInterface.saveAndFlush(caminhoesMarcaConverter.convert(caminhoesMarcaDataVM)));
		 
		return auxCaminhoesMarcaDataVM;
		
	}
	
	public CaminhoesModeloDataVM createModelo( CaminhoesModeloDataVM caminhoesModeloDataVM){
		
		CaminhoesModeloDataVM auxCaminhoesModeloDataVM = caminhoesModeloConverter.convert(caminhoesModeloInterface.saveAndFlush(caminhoesModeloConverter.convert(caminhoesModeloDataVM)));
		 
		return auxCaminhoesModeloDataVM;
		
	}
	
	public CaminhoesAnoDataVM createAno( CaminhoesAnoDataVM caminhoesAnoDataVM){
		
		CaminhoesAnoDataVM auxCaminhoesAnoDataVM = caminhoesAnoConverter.convert(caminhoesAnoInterface.saveAndFlush(caminhoesAnoConverter.convert(caminhoesAnoDataVM)));
		 
		return auxCaminhoesAnoDataVM;
		
	}
	

}
