package be.arbiter.clouddragonsheet.data.dtos.auth;

import lombok.Data;

@Data
public class SubscribeDTO {
    private String username;
    private String email;
    private String password;
    private String passwordConfirmation;
    private String lastName;
    private String firstName;
}
