package classified.Interface;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import classified.Entity.User;

@Repository
@Transactional
public interface UserInterface extends JpaRepository<User, Long> {

	
	User findById(long Name);
	User findByEmail(String Name);
	List<User> findByIdIn(List<Long> ids);
	User findByName(String Name);
	User findByDocument(String document);
	
    // Equivalente ao like, mas não precisamos nos preocupar com o sinal de percentual. 
    List<User> findByNameStartingWith(String Name);
    
    User findByConfirmcode(String uuid);
    
    // Equivalente ao like, mas não precisamos nos preocupar com o sinal de percentual. 
    // Podemos usar também EndingWith, Containing.
    List<User> findByNameEndingWith(String Name);
    
    // Equivalente ao like, mas não precisamos nos preocupar com o sinal de percentual. 
    List<User> findByNameContaining(String Name);
	
    // Ordenando pelo .
    List<User> findByNameStartingWithOrderByName(String Name);
	
    // Não levar em consideração a caixa.
    List<User> findByNameStartingWithIgnoreCase(String Name);
 
    // Pesquisando por duas propriedades:  e ativo.
    List<User> findByNameStartingWithIgnoreCaseAndStatusEquals(String Name, String ativo);
	
    // Nesse caso, precisamos usar o sinal de percentual em nossas consultas.
    List<User> findByNameLike(String Name);
	
//    // Podemos usar também IsNotNull ou NotNull.
//    List<User> findByDescricaoIsNull(); 
	
    // Quando você quer negar o que passa no parâmetro
    List<User> findByNameNot(String Name);
	
    // Todos os produtos com os IDs passados no varargs. Poderia usar NotIn para negar os IDs.
    List<User> findByIdIn(Long ids);
	
    // Todos onde a propriedade ativo é true. Poderia ser falso, usando False.
    //List<User> findByStatusTrue();
	
    // Buscar onde a data de cadastro é depois do parâmetro passado. 
    List<User> findBySignindateAfter(Date data);
    
 // Buscar onde a data de cadastro é antes do parâmetro passado. 
    List<User> findBySignindateBefore(Date data);
	
    // Buscar onde a data cadastro está dentro de um período.
    List<User> findBySignindateBetween(Date startdate, Date enddate);
    
//    @Query("from Client where  like concat(?1, '%')")
//    List<User> pesquisarClientes(String Name);


}
