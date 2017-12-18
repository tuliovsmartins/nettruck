package classified.View.Model;

import java.util.Date;

public class AnuncioFotoDataVM {
	
	private long id;
	private long anuncioId;
	private String foto;
	private boolean principal;
	private Date cadData;
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public long getAnuncioId() {
		return anuncioId;
	}
	public void setAnuncioId(long anuncioId) {
		this.anuncioId = anuncioId;
	}
	public String getFoto() {
		return foto;
	}
	public void setFoto(String foto) {
		this.foto = foto;
	}
	public boolean getPrincipal() {
		return principal;
	}
	public void setPrincipal(boolean principal) {
		this.principal = principal;
	}
	public Date getCadData() {
		return cadData;
	}
	public void setCadData(Date cadData) {
		this.cadData = cadData;
	}

}
