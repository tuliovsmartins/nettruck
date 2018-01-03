package classified.View.Model;

import java.util.Date;

public class PlanosDataVM {
	
	private long id;
	private String nome;
	private String valor;
	private long quantidade;
	private String prazo;
	private String descricao;
	private boolean promocional;
	private Date dataFimPromocao;
	private Date dataCadastro;
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getValor() {
		return valor;
	}
	public void setValor(String valor) {
		this.valor = valor;
	}
	public long getQuantidade() {
		return quantidade;
	}
	public void setQuantidade(long quantidade) {
		this.quantidade = quantidade;
	}
	public String getPrazo() {
		return prazo;
	}
	public void setPrazo(String prazo) {
		this.prazo = prazo;
	}
	public String getDescricao() {
		return descricao;
	}
	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}
	public boolean isPromocional() {
		return promocional;
	}
	public void setPromocional(boolean promocional) {
		this.promocional = promocional;
	}
	public Date getDataFimPromocao() {
		return dataFimPromocao;
	}
	public void setDataFimPromocao(Date dataFimPromocao) {
		this.dataFimPromocao = dataFimPromocao;
	}
	public Date getDataCadastro() {
		return dataCadastro;
	}
	public void setDataCadastro(Date dataCadastro) {
		this.dataCadastro = dataCadastro;
	}

}
