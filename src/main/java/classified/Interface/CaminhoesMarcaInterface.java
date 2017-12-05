package classified.Interface;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import classified.Entity.CaminhoesMarca;

@Repository
@Transactional
public interface CaminhoesMarcaInterface extends JpaRepository<CaminhoesMarca, Long>{

}
