package classified.Converter;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import classified.Entity.Anuncios;
import classified.View.Model.AnunciosDataVM;

@Component
public class AnunciosConverter {
	
	public Anuncios convert(AnunciosDataVM anunciosDataVM){
		
		Anuncios anuncios = new Anuncios();
		
		anuncios.setId(anunciosDataVM.getId());
		anuncios.setTipoId(anunciosDataVM.getTipoId());
		anuncios.setUserId(anunciosDataVM.getUserId());
		anuncios.setMarcaId(anunciosDataVM.getMarcaId());
		anuncios.setModeloId(anunciosDataVM.getModeloId());
		anuncios.setAnoId(anunciosDataVM.getAnoId());
		anuncios.setAcessorios(anunciosDataVM.getAcessorios());
		anuncios.setPreco(anunciosDataVM.getPreco());
		anuncios.setCarroceria(anunciosDataVM.getCarroceria());
		anuncios.setCor(anunciosDataVM.getCor());
		anuncios.setOdometro(anunciosDataVM.getOdometro());
		anuncios.setTracao(anunciosDataVM.getTracao());
		anuncios.setObs(anunciosDataVM.getObs());
		anuncios.setStatus(anunciosDataVM.getStatus());
		anuncios.setCadastroData(anunciosDataVM.getCadastroData());
		
		
		return anuncios;
	}
	
	public AnunciosDataVM convert(Anuncios anuncios){
		
		AnunciosDataVM anunciosDataVM = new AnunciosDataVM();
		
		anunciosDataVM.setId(anuncios.getId());
		anunciosDataVM.setTipoId(anuncios.getTipoId());
		anunciosDataVM.setUserId(anuncios.getUserId());
		anunciosDataVM.setMarcaId(anuncios.getMarcaId());
		anunciosDataVM.setModeloId(anuncios.getModeloId());
		anunciosDataVM.setAnoId(anuncios.getAnoId());
		anunciosDataVM.setAcessorios(anuncios.getAcessorios());
		anunciosDataVM.setPreco(anuncios.getPreco());
		anunciosDataVM.setCarroceria(anuncios.getCarroceria());
		anunciosDataVM.setCor(anuncios.getCor());
		anunciosDataVM.setOdometro(anuncios.getOdometro());
		anunciosDataVM.setTracao(anuncios.getTracao());
		anunciosDataVM.setObs(anuncios.getObs());
		anunciosDataVM.setStatus(anuncios.getStatus());
		anunciosDataVM.setCadastroData(anuncios.getCadastroData());
		
		
		return anunciosDataVM;
	}
	
	public List<AnunciosDataVM> convertMainList(List<Anuncios> anuncios){
		
		List<AnunciosDataVM> anunciosDataVM = new  ArrayList<AnunciosDataVM>();
		
		for(Anuncios anuncio : anuncios){
			anunciosDataVM.add(this.convert(anuncio));
        }
		
		return anunciosDataVM;
		
	}

}
