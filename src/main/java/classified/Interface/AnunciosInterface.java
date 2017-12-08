package classified.Interface;

import org.springframework.data.jpa.repository.JpaRepository;
import classified.Entity.Anuncios;

public interface AnunciosInterface extends JpaRepository<Anuncios, Long>{

}
