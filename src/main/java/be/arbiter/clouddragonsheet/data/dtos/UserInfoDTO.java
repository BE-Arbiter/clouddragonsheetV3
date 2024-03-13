package be.arbiter.clouddragonsheet.data.dtos;

import lombok.Data;

@Data
public class UserInfoDTO {
    private String username;
    private String email;
    private String lastName;
    private String firstName;
}
