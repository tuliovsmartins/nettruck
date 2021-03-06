package classified.Interface;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import classified.Entity.CaminhoesModelo;

@Repository
@Transactional
public interface CaminhoesModeloInterface extends JpaRepository<CaminhoesModelo, Long> {

	List<CaminhoesModelo> findById(long id);
	List<CaminhoesModelo> findByMarcaId(long id);
}
