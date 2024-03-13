package be.arbiter.clouddragonsheet.data.dtos.auth;

import lombok.Data;

@Data
public class LoginDTO {
    private String username;
    private String password;
}
