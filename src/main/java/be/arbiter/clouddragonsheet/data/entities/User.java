package be.arbiter.clouddragonsheet.data.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.util.StringUtils;

import java.util.*;
import java.util.stream.Collectors;

@Entity
@Table(name = "users")
@Data
@EqualsAndHashCode(callSuper=true)
@AllArgsConstructor
@NoArgsConstructor
public class User extends AuditableEntity{
    private String username;
    private String email;
    @JsonIgnore
    private String password;
    private String lastName;
    private String firstName;
    private Boolean activated;
    @JsonIgnore
    private String activationCode;
    @JsonIgnore
    @Column(name="roles")
    private String rolesString;

    public List<String> getRoles(){
        if(!StringUtils.hasLength(rolesString)){
            return new ArrayList<>();
        }
        return Arrays.stream(rolesString.split(",")).collect(Collectors.toList());
    }

    public Set<String> getRoleSet(){
        if(!StringUtils.hasLength(rolesString)){
            return new HashSet<>();
        }
        return Arrays.stream(rolesString.split(",")).collect(Collectors.toSet());
    }

}
