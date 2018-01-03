package classified.Service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import classified.Converter.PlanosConverter;
import classified.Interface.PlanosInterface;
import classified.View.Model.PlanosDataVM;

@Service
public class PlanosService {
	
	@Autowired
	private PlanosConverter planosConverter;
	
	@Autowired
	private PlanosInterface planosInterface;
	
public List<PlanosDataVM> getPlanos(){
		
		List<PlanosDataVM> listaPlanos = planosConverter.convertMainList(planosInterface.findAll());
		 
		return listaPlanos;
		
	}

}
