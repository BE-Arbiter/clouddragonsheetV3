package be.arbiter.clouddragonsheet.repositories;

import be.arbiter.clouddragonsheet.data.entities.SheetAccess;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SheetAccessRepository extends JpaRepository<SheetAccess,Integer> {
    public List<SheetAccess> findAllByUserId(Integer userId);
    public Boolean existsByUserIdAndSheetIdAndReadonly(Integer ownerId,Integer sheetId,Boolean readonly);
}
