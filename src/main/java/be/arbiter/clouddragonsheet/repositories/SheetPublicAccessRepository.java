package be.arbiter.clouddragonsheet.repositories;

import be.arbiter.clouddragonsheet.data.entities.SheetPublicAccess;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SheetPublicAccessRepository extends JpaRepository<SheetPublicAccess,Integer> {
    public SheetPublicAccess getSheetPublicAccessByToken(String token);
}
