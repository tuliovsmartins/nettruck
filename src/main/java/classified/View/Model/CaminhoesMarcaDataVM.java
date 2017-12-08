package classified.View.Model;

public class CaminhoesMarcaDataVM {
	
	private static final long serialVersionUID = 1L;
	
	private long id;
	private String fipeId;
	private String marca;
	private String tipo;
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getFipeId() {
		return fipeId;
	}
	public void setFipeId(String fipeId) {
		this.fipeId = fipeId;
	}
	public String getMarca() {
		return marca;
	}
	public void setMarca(String marca) {
		this.marca = marca;
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
