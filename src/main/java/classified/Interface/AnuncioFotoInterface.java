package classified.Interface;

import org.springframework.data.jpa.repository.JpaRepository;

import classified.Entity.AnuncioFoto;

public interface AnuncioFotoInterface extends JpaRepository<AnuncioFoto, Long> {

}
