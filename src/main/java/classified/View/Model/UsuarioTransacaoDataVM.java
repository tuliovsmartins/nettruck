package classified.View.Model;

import java.util.Date;

public class UsuarioTransacaoDataVM {
	
	private long id;
	private long userId;
	private String tipo;
	private String valor;
	private long anuncios;
	private String formaPagamento;
	private String status;
	private Date statusData;
	private Date dataTransacao;
	private Date dataCadastro;
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public long getUserId() {
		return userId;
	}
	public void setUserId(long userId) {
		this.userId = userId;
	}
	public String getTipo() {
		return tipo;
	}
	public void setTipo(String tipo) {
		this.tipo = tipo;
	}
	public String getValor() {
		return valor;
	}
	public void setValor(String valor) {
		this.valor = valor;
	}
	public long getAnuncios() {
		return anuncios;
	}
	public void setAnuncios(long anuncios) {
		this.anuncios = anuncios;
	}
	public String getFormaPagamento() {
		return formaPagamento;
	}
	public void setFormaPagamento(String formaPagamento) {
		this.formaPagamento = formaPagamento;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public Date getStatusData() {
		return statusData;
	}
	public void setStatusData(Date statusData) {
		this.statusData = statusData;
	}
	public Date getDataTransacao() {
		return dataTransacao;
	}
	public void setDataTransacao(Date dataTransacao) {
		this.dataTransacao = dataTransacao;
	}
	public Date getDataCadastro() {
		return dataCadastro;
	}
	public void setDataCadastro(Date dataCadastro) {
		this.dataCadastro = dataCadastro;

	}
}
