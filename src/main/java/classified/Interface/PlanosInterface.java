package classified.Interface;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import classified.Entity.Planos;

@Repository
@Transactional
public interface PlanosInterface extends JpaRepository<Planos, Long>{

}
