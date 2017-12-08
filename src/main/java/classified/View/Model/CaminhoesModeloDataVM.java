package classified.View.Model;

public class CaminhoesModeloDataVM {
	
	private static final long serialVersionUID = 1L;
	
	private long id;
	private long marcaId;
	private String modelo;
	private String tipo;
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public long getMarcaId() {
		return marcaId;
	}
	public void setMarcaId(long marcaId) {
		this.marcaId = marcaId;
	}
	public String getModelo() {
		return modelo;
	}
	public void setModelo(String modelo) {
		this.modelo = modelo;
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
