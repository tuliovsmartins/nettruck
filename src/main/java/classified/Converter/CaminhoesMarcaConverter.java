package classified.Converter;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import classified.Entity.CaminhoesMarca;
import classified.View.Model.CaminhoesMarcaDataVM;

@Component
public class CaminhoesMarcaConverter {

	public CaminhoesMarca convert(CaminhoesMarcaDataVM caminhoesMarcaDataVM){
		
		CaminhoesMarca caminhoesMarca = new CaminhoesMarca();
		
		caminhoesMarca.setId(caminhoesMarcaDataVM.getId());
		caminhoesMarca.setFipeId(caminhoesMarcaDataVM.getFipeId());
		caminhoesMarca.setMarca(caminhoesMarcaDataVM.getMarca());
		caminhoesMarca.setTipo(caminhoesMarcaDataVM.getTipo());
		
		return caminhoesMarca;
	}
	
	public CaminhoesMarcaDataVM convert(CaminhoesMarca caminhoesMarca){
		
		CaminhoesMarcaDataVM caminhoesMarcaDataVM = new CaminhoesMarcaDataVM();
		
		caminhoesMarcaDataVM.setId(caminhoesMarca.getId());
		caminhoesMarcaDataVM.setFipeId(caminhoesMarca.getFipeId());
		caminhoesMarcaDataVM.setMarca(caminhoesMarca.getMarca());
		caminhoesMarcaDataVM.setTipo(caminhoesMarca.getTipo());
		
		return caminhoesMarcaDataVM;
	}
	
	public List<CaminhoesMarcaDataVM> convertMainList(List<CaminhoesMarca> caminhoesMarca){
		
		List<CaminhoesMarcaDataVM> caminhoesMarcaDataVM = new  ArrayList<CaminhoesMarcaDataVM>();
		
		for(CaminhoesMarca caminhoesMarcas : caminhoesMarca){
			caminhoesMarcaDataVM.add(this.convert(caminhoesMarcas));
        }
		
		return caminhoesMarcaDataVM;
		
	}
}
