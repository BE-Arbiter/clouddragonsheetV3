package be.arbiter.clouddragonsheet.data.dtos;

import be.arbiter.clouddragonsheet.data.entities.AuditableEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
public class UserAdminDto extends AuditableEntity {
    private String username;
    private String email;
    @JsonIgnore
    private String password;
    private String lastName;
    private String firstName;
    private Boolean activated;
    List<String> roles;
}
