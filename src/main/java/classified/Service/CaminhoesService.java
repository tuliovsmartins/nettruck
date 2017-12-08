package classified.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import classified.Converter.AcessoriosConverter;
import classified.Converter.CaminhoesAnoConverter;
import classified.Converter.CaminhoesMarcaConverter;
import classified.Converter.CaminhoesModeloConverter;
import classified.Interface.AcessoriosInterface;
import classified.Interface.CaminhoesAnoInterface;
import classified.Interface.CaminhoesMarcaInterface;
import classified.Interface.CaminhoesModeloInterface;
import classified.View.Model.AcessoriosDataVM;
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
	
	@Autowired
	private AcessoriosConverter acessoriosConverter;
	
	@Autowired
	private AcessoriosInterface acessoriosInterface;
	
	
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
	
	public List<CaminhoesMarcaDataVM> getMarcas(){
		
		List<CaminhoesMarcaDataVM> listaMarcas = caminhoesMarcaConverter.convertMainList(caminhoesMarcaInterface.findAll());
		 
		return listaMarcas;
		
	}
	
	public List<CaminhoesModeloDataVM> getModeloById(long id){
		List<CaminhoesModeloDataVM> listaModelos = caminhoesModeloConverter.convertMainList(caminhoesModeloInterface.findById(id));
		 
		return listaModelos;
		
	}
	
	public List<CaminhoesModeloDataVM> getModeloByMarcaId(long id){
		List<CaminhoesModeloDataVM> listaModelos = caminhoesModeloConverter.convertMainList(caminhoesModeloInterface.findByMarcaId(id));
		 
		return listaModelos;
		
	}
	
	public List<CaminhoesAnoDataVM> getAnoByModeloId(long id){
		
		List<CaminhoesAnoDataVM> listaAnos = caminhoesAnoConverter.convertMainList(caminhoesAnoInterface.findByModeloId(id));
		 
		return listaAnos;
		
	}
	
	public CaminhoesAnoDataVM getAnoById(long id){
		
		CaminhoesAnoDataVM listaAnos = caminhoesAnoConverter.convert(caminhoesAnoInterface.findById(id));
		 
		return listaAnos;
		
	}
	
	
	public List<AcessoriosDataVM> getAcessorios(){
		
		List<AcessoriosDataVM> acessorios = acessoriosConverter.convertMainList(acessoriosInterface.findAll());
		 
		return acessorios;
		
	}

}
