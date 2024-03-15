package be.arbiter.clouddragonsheet.data.dtos;

import lombok.Data;

import java.util.List;

@Data
public class UserInfoDTO {
    private String username;
    private String email;
    private String lastName;
    private String firstName;
    private List<String> roles;
}
