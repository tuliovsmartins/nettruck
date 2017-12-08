package classified.Interface;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import classified.Entity.CaminhoesAno;

public interface CaminhoesAnoInterface extends JpaRepository<CaminhoesAno, Long> {
	
	List<CaminhoesAno> findByModeloId(long id);
	CaminhoesAno findById(long id);

}
