package classified.Converter;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import classified.Entity.Tipos;
import classified.View.Model.TiposDataVM;

@Component
public class TiposConverter {
	
	public Tipos convert(TiposDataVM tiposDataVM){
		
		Tipos tipos = new Tipos();
		
		tipos.setId(tiposDataVM.getId());
		tipos.setTipo(tiposDataVM.getTipo());
		
		return tipos;
	}
	
	public TiposDataVM convert(Tipos tipos){
		
	    TiposDataVM tiposDataVM = new TiposDataVM();
		
		tiposDataVM.setId(tipos.getId());
		tiposDataVM.setTipo(tipos.getTipo());
		
		return tiposDataVM;
	}
	
	public List<TiposDataVM> convertMainList(List<Tipos> tipos){
		
		List<TiposDataVM> tiposDataVM = new  ArrayList<TiposDataVM>();
		
		for(Tipos tipo : tipos){
			tiposDataVM.add(this.convert(tipo));
        }
		
		return tiposDataVM;
		
	}

}
