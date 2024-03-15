package be.arbiter.clouddragonsheet.data.dtos;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
public class UserFullDto extends BaseDto {
    String username;
    String email;
    String firstName;
    String lastName;
    List<String> roles;


    static public UserFullDto guest(){
        UserFullDto guest = new UserFullDto();
        guest.setUsername("guest");
        return guest;
    }
}
