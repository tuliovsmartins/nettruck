package classified.Converter;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;
import classified.Entity.Planos;
import classified.View.Model.PlanosDataVM;

@Component
public class PlanosConverter {
	
	public Planos convert(PlanosDataVM planosDataVM){
		
		Planos planos = new Planos();
		
		planos.setId(planosDataVM.getId());
		planos.setNome(planosDataVM.getNome());
		planos.setValor(planosDataVM.getValor());
		planos.setDescrição(planosDataVM.getDescrição());
		planos.setPrazo(planosDataVM.getPrazo());
		planos.setPromocional(planosDataVM.isPromocional());
		planos.setQuantidade(planosDataVM.getQuantidade());
		planos.setDataCadastro(planosDataVM.getDataCadastro());
		planos.setDataFimPromocao(planosDataVM.getDataFimPromocao());
		
		return planos;
	}
	
	public PlanosDataVM convert(Planos planos){
		
		PlanosDataVM planosDataVM = new PlanosDataVM();
		
		planosDataVM.setId(planos.getId());
		planosDataVM.setNome(planos.getNome());
		planosDataVM.setValor(planos.getValor());
		planosDataVM.setDescrição(planos.getDescrição());
		planosDataVM.setPrazo(planos.getPrazo());
		planosDataVM.setPromocional(planos.isPromocional());
		planosDataVM.setQuantidade(planos.getQuantidade());
		planosDataVM.setDataCadastro(planos.getDataCadastro());
		planosDataVM.setDataFimPromocao(planos.getDataFimPromocao());
		
		return planosDataVM;
	}
	
	public List<PlanosDataVM> convertMainList(List<Planos> planos){
		
		List<PlanosDataVM> planosDataVM = new  ArrayList<PlanosDataVM>();
		
		for(Planos plano : planos){
			planosDataVM.add(this.convert(plano));
        }
		
		return planosDataVM;
		
	}

}
