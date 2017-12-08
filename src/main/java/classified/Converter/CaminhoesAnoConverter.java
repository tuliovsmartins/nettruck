package classified.Converter;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;
import classified.Entity.CaminhoesAno;
import classified.View.Model.CaminhoesAnoDataVM;

@Component
public class CaminhoesAnoConverter {
	
	public CaminhoesAno convert(CaminhoesAnoDataVM caminhoesAnoDataVM){
		
		CaminhoesAno caminhoesAno = new CaminhoesAno();
		
		caminhoesAno.setId(caminhoesAnoDataVM.getId());
		caminhoesAno.setModeloId(caminhoesAnoDataVM.getModeloId());
		caminhoesAno.setAno(caminhoesAnoDataVM.getAno());
		caminhoesAno.setModelo(caminhoesAnoDataVM.getModelo());
		caminhoesAno.setValor(caminhoesAnoDataVM.getValor());
		caminhoesAno.setTipo(caminhoesAnoDataVM.getTipo());
		
		return caminhoesAno;
	}
	
	public CaminhoesAnoDataVM convert(CaminhoesAno caminhoesAno){
		
		CaminhoesAnoDataVM caminhoesAnoDataVM = new CaminhoesAnoDataVM();
		
		caminhoesAnoDataVM.setId(caminhoesAno.getId());
		caminhoesAnoDataVM.setModeloId(caminhoesAno.getModeloId());
		caminhoesAnoDataVM.setAno(caminhoesAno.getAno());
		caminhoesAnoDataVM.setModelo(caminhoesAno.getModelo());
		caminhoesAnoDataVM.setValor(caminhoesAno.getValor());
		caminhoesAnoDataVM.setTipo(caminhoesAno.getTipo());
		
		return caminhoesAnoDataVM;
	}
	
	public List<CaminhoesAnoDataVM> convertMainList(List<CaminhoesAno> caminhoesAno){
		
		List<CaminhoesAnoDataVM> caminhoesAnoDataVM = new  ArrayList<CaminhoesAnoDataVM>();
		
		for(CaminhoesAno caminhoesAnos : caminhoesAno){
			caminhoesAnoDataVM.add(this.convert(caminhoesAnos));
        }
		
		return caminhoesAnoDataVM;
		
	}

}
