package classified.Entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "usuario_conta")
public class UsuarioConta {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	
	private long id;
	private long userId;
	private long anuncios;
	
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
	public long getAnuncios() {
		return anuncios;
	}
	public void setAnuncios(long anuncios) {
		this.anuncios = anuncios;
	}
	
	
}
