package classified.Interface;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import classified.Entity.Tipos;

@Repository
@Transactional
public interface TiposInterface extends JpaRepository<Tipos, Long> {

}
