package be.arbiter.clouddragonsheet.data.dtos;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
public class UserFullDto extends BaseDto {
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private List<String> roles;


    static public UserFullDto guest(){
        UserFullDto guest = new UserFullDto();
        guest.setUsername("guest");
        return guest;
    }
}
