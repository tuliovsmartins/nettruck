package classified.Interface;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import classified.Entity.UsuarioConta;

@Repository
@Transactional
public interface UsuarioContaInterface extends JpaRepository<UsuarioConta, Long> {

}
