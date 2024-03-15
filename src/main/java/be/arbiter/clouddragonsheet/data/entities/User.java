package be.arbiter.clouddragonsheet.data.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.util.StringUtils;

import java.util.*;
import java.util.stream.Collectors;

@Entity
@Table(name = "users")
@Data
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
    private String roles;

    public Set<String> getRoleSet(){
        if(!StringUtils.hasLength(roles)){
            return new HashSet<>();
        }
        return Arrays.stream(roles.split(",")).collect(Collectors.toSet());
    }
}
