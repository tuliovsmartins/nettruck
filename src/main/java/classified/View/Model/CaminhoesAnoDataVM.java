package classified.View.Model;

public class CaminhoesAnoDataVM {
	
	private static final long serialVersionUID = 1L;
	
	private long id;
	private long modeloId;
	private String ano;
	private String modelo;
	private String valor;
	private String tipo;
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public long getModeloId() {
		return modeloId;
	}
	public void setModeloId(long modeloid) {
		this.modeloId = modeloid;
	}
	public String getAno() {
		return ano;
	}
	public void setAno(String ano) {
		this.ano = ano;
	}
	public String getModelo() {
		return modelo;
	}
	public void setModelo(String modelo) {
		this.modelo = modelo;
	}
	public String getValor() {
		return valor;
	}
	public void setValor(String valor) {
		this.valor = valor;
	}
	public String getTipo() {
		return tipo;
	}
	public void setTipo(String tipo) {
		this.tipo = tipo;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	

}
