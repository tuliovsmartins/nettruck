package classified.Interface;

import org.springframework.data.jpa.repository.JpaRepository;

import classified.Entity.Acessorios;


public interface AcessoriosInterface extends JpaRepository<Acessorios, Long> {

}
