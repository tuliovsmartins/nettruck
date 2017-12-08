package classified.Entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

@Entity
@Table(name = "anuncios")
public class Anuncios {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)

	private long id;
	private long tipoId;
	private long userId;
	private long marcaId;
	private long modeloId;
	private long anoId;
	private String acessorios;
	private String preco;
	private String carroceria;
	private String cor;
	private String odometro;
	private String tracao;
	@Lob
	private String obs;
	private String status;
	private Date cadastroData;
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public long getTipoId() {
		return tipoId;
	}
	public void setTipoId(long tipoId) {
		this.tipoId = tipoId;
	}
	public long getUserId() {
		return userId;
	}
	public void setUserId(long userId) {
		this.userId = userId;
	}
	public long getMarcaId() {
		return marcaId;
	}
	public void setMarcaId(long marcaId) {
		this.marcaId = marcaId;
	}
	public long getModeloId() {
		return modeloId;
	}
	public void setModeloId(long modeloId) {
		this.modeloId = modeloId;
	}
	public long getAnoId() {
		return anoId;
	}
	public void setAnoId(long anoId) {
		this.anoId = anoId;
	}
	public String getAcessorios() {
		return acessorios;
	}
	public void setAcessorios(String acessorios) {
		this.acessorios = acessorios;
	}
	public String getPreco() {
		return preco;
	}
	public void setPreco(String preco) {
		this.preco = preco;
	}
	public String getCarroceria() {
		return carroceria;
	}
	public void setCarroceria(String carroceria) {
		this.carroceria = carroceria;
	}
	public String getCor() {
		return cor;
	}
	public void setCor(String cor) {
		this.cor = cor;
	}
	public String getOdometro() {
		return odometro;
	}
	public void setOdometro(String odometro) {
		this.odometro = odometro;
	}
	public String getTracao() {
		return tracao;
	}
	public void setTracao(String tracao) {
		this.tracao = tracao;
	}
	public String getObs() {
		return obs;
	}
	public void setObs(String obs) {
		this.obs = obs;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public Date getCadastroData() {
		return cadastroData;
	}
	public void setCadastroData(Date cadastroData) {
		this.cadastroData = cadastroData;
	}
	
	
	
	
}
