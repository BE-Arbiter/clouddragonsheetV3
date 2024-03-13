package be.arbiter.clouddragonsheet.data.dtos.auth;

import lombok.Data;

@Data
public class UserSignInDTO {
    private String username;
    private String email;
    private String password;
    private String lastName;
    private String firstName;
}
