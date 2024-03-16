package be.arbiter.clouddragonsheet.data.dtos;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
public class UserAdminDto extends AuditableDto {
    private String username;
    private String email;
    private String password;
    private String lastName;
    private String firstName;
    private Boolean activated;
    private List<String> roles;
}
