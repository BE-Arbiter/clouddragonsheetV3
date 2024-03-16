package be.arbiter.clouddragonsheet.repositories;

import be.arbiter.clouddragonsheet.data.entities.Sheet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SheetRepository extends JpaRepository<Sheet,Integer> {
    public List<Sheet> findAllByOwnerId(Integer ownerId);
    public Boolean existsByOwnerIdAndId(Integer ownerId,Integer id);
}
