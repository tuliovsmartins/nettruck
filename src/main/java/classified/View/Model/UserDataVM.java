package classified.View.Model;

import java.io.Serializable;
import java.util.Date;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotEmpty;
import org.hibernate.validator.constraints.br.CPF;

public class UserDataVM implements Serializable {

	 private static final long serialVersionUID = 1L;
	
	private long id;
	private String cadtype;
	@Email(message="O e-mail digitado é inválido.") @NotNull @NotEmpty(message = "O Campo e-mail é obrigatório")
	private String email;
	private String companyName;
	@NotNull @NotEmpty(message = "O Campo Nome é obrigatório")
	private String name;
	@NotNull @NotEmpty(message = "O Campo Senha é obrigatório")
	private String password;
	@NotNull @NotEmpty(message = "O Campo Data de nascimento é obrigatório")
	private String birthdate;
	private String document;
	private String cowntry;
	@Size(min=2, max=2, message="O campo Estado deve conter apenas a sigla") @NotEmpty(message = "O Campo Estado é obrigatório")
	private String state;
	@NotEmpty(message = "O Campo Cidade é obrigatório")
	private String city;
	@NotEmpty(message = "O Campo Bairro é obrigatório")
	private String neighborhood;
	@NotEmpty(message = "O Campo Rua é obrigatório")
	private String street;
	@NotEmpty(message = "O Campo Número é obrigatório")
	private String number;
	private String complement;
	@Size(max=10, min=10, message="O campo Cep é inválido") @NotEmpty(message = "O Campo Cep é obrigatório")
	private String postal;
	private String telephone;
	@NotNull @NotEmpty(message = "O Campo Telefone Celular é obrigatório")
	private String cellphone;
	private boolean whatsapp;
	private String promocionalCode;
	private Date signindate;
	private String confirmcode;
	private boolean confirmed;
	private String status;
	private String role;
	private boolean first_login;
	
	public UserDataVM(){}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getBirthdate() {
		return birthdate;
	}

	public void setBirthdate(String birthdate) {
		this.birthdate = birthdate;
	}

	public String getDocument() {
		return document;
	}

	public void setDocument(String document) {
		this.document = document;
	}

	public String getCowntry() {
		return cowntry;
	}

	public void setCowntry(String cowntry) {
		this.cowntry = cowntry;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getNeighborhood() {
		return neighborhood;
	}

	public void setNeighborhood(String neighborhood) {
		this.neighborhood = neighborhood;
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public String getNumber() {
		return number;
	}

	public void setNumber(String number) {
		this.number = number;
	}

	public String getComplement() {
		return complement;
	}

	public void setComplement(String complement) {
		this.complement = complement;
	}

	public String getPostal() {
		return postal;
	}

	public void setPostal(String postal) {
		this.postal = postal;
	}

	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}

	public String getCellphone() {
		return cellphone;
	}

	public void setCellphone(String cellphone) {
		this.cellphone = cellphone;
	}

	public boolean getWhatsapp() {
		return whatsapp;
	}

	public void setWhatsapp(boolean whatsapp) {
		this.whatsapp = whatsapp;
	}
	
	public String getPromocionalCode() {
		return promocionalCode;
	}

	public void setPromocionalCode(String promocionalCode) {
		this.promocionalCode = promocionalCode;
	}

	public Date getSignindate() {
		return signindate;
	}

	public void setSignindate(Date signindate) {
		this.signindate = signindate;
	}
	
	public String getConfirmcode() {
		return confirmcode;
	}

	public void setConfirmcode(String uuid) {
		this.confirmcode = uuid;
	}

	public boolean isConfirmed() {
		return confirmed;
	}
	
	public boolean getConfirmed() {
		return confirmed;
	}
	
	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public void setConfirmed(boolean confirmed) {
		this.confirmed = confirmed;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}


	public boolean getFirst_login() {
		return first_login;
	}

	public void setFirst_login(boolean first_login) {
		this.first_login = first_login;
	}
	
	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public String getCadtype() {
		return cadtype;
	}

	public void setCadtype(String cadtype) {
		this.cadtype = cadtype;
	}
}
