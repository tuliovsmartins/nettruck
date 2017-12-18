package classified.Converter;

import java.util.ArrayList;
import java.util.List;
import classified.Entity.UsuarioTransacao;
import classified.View.Model.UsuarioTransacaoDataVM;

public class UsuarioTransacaoConverter {
	
	public UsuarioTransacao convert(UsuarioTransacaoDataVM usuarioTransacaoDataVM){
		
		UsuarioTransacao usuarioTransacao = new UsuarioTransacao();
		
		usuarioTransacao.setId(usuarioTransacaoDataVM.getId());
		usuarioTransacao.setUserId(usuarioTransacaoDataVM.getUserId());
		usuarioTransacao.setTipo(usuarioTransacaoDataVM.getTipo());
		usuarioTransacao.setValor(usuarioTransacaoDataVM.getValor());
		usuarioTransacao.setAnuncios(usuarioTransacaoDataVM.getAnuncios());
		usuarioTransacao.setFormaPagamento(usuarioTransacaoDataVM.getFormaPagamento());
		usuarioTransacao.setStatus(usuarioTransacaoDataVM.getStatus());
		usuarioTransacao.setStatusData(usuarioTransacaoDataVM.getStatusData());
		usuarioTransacao.setDataTransacao(usuarioTransacaoDataVM.getDataTransacao());
		usuarioTransacao.setDataCadastro(usuarioTransacaoDataVM.getDataCadastro());
		
		return usuarioTransacao;
	}
	
	public UsuarioTransacaoDataVM convert(UsuarioTransacao usuarioTransacao){
		
		UsuarioTransacaoDataVM usuarioTransacaoDataVM = new UsuarioTransacaoDataVM();
		
		usuarioTransacaoDataVM.setId(usuarioTransacao.getId());
		usuarioTransacaoDataVM.setUserId(usuarioTransacao.getUserId());
		usuarioTransacaoDataVM.setTipo(usuarioTransacao.getTipo());
		usuarioTransacaoDataVM.setValor(usuarioTransacao.getValor());
		usuarioTransacaoDataVM.setAnuncios(usuarioTransacao.getAnuncios());
		usuarioTransacaoDataVM.setFormaPagamento(usuarioTransacao.getFormaPagamento());
		usuarioTransacaoDataVM.setStatus(usuarioTransacao.getStatus());
		usuarioTransacaoDataVM.setStatusData(usuarioTransacao.getStatusData());
		usuarioTransacaoDataVM.setDataTransacao(usuarioTransacao.getDataTransacao());
		usuarioTransacaoDataVM.setDataCadastro(usuarioTransacao.getDataCadastro());
		
		return usuarioTransacaoDataVM;
	}
	
	public List<UsuarioTransacaoDataVM> convertMainList(List<UsuarioTransacao> usuarioTransacao){
		
		List<UsuarioTransacaoDataVM> usuarioTransacaoDataVM = new  ArrayList<UsuarioTransacaoDataVM>();
		
		for(UsuarioTransacao usuarioTransacaos : usuarioTransacao){
			usuarioTransacaoDataVM.add(this.convert(usuarioTransacaos));
        }
		
		return usuarioTransacaoDataVM;
		
	}

}
