package classified.Interface;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import classified.Entity.UsuarioTransacao;

@Repository
@Transactional
public interface UsuarioTransacaoInterface extends JpaRepository<UsuarioTransacao, Long> {

}
