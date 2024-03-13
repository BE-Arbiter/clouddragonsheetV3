package be.arbiter.clouddragonsheet.repositories;

import be.arbiter.clouddragonsheet.data.entities.Role;
import be.arbiter.clouddragonsheet.data.enums.RoleEnum;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role,Long> {
    Optional<Role> findByName(RoleEnum name);
    boolean existsByName(RoleEnum name);
}
