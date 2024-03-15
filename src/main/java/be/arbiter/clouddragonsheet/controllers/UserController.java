package be.arbiter.clouddragonsheet.controllers;

import be.arbiter.clouddragonsheet.configuration.security.jwt.JwtUtils;
import be.arbiter.clouddragonsheet.data.dtos.UserAdminDto;
import be.arbiter.clouddragonsheet.data.dtos.UserDto;
import be.arbiter.clouddragonsheet.data.dtos.UserFullDto;
import be.arbiter.clouddragonsheet.data.entities.User;
import be.arbiter.clouddragonsheet.data.enums.RoleEnum;
import be.arbiter.clouddragonsheet.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.commons.codec.digest.DigestUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.Calendar;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    private ModelMapper mapper;

    @Autowired
    JwtUtils jwtUtils;

    @GetMapping("all")
    @Secured("ROLE_ADMIN")
    public List<UserAdminDto> getUsers() {
        return userService.findAll().stream()
                .map(user -> mapper.map(user, UserAdminDto.class)).toList();
    }
    @GetMapping("/{id}")
    @Secured("ROLE_ADMIN")
    public UserAdminDto getUserById(@PathVariable long id) {
        return mapper.map(userService.findById(id), UserAdminDto.class);
    }
    @GetMapping("/{id}/username")
    @Secured("ROLE_USER")
    public UserDto getUsernameById(@PathVariable long id) {
        return mapper.map(userService.findById(id), UserDto.class);
    }
    @PutMapping("")
    @Secured("ROLE_ADMIN")
    public ResponseEntity<?> editUser(@RequestBody UserAdminDto adminDto,HttpServletRequest httpServletRequest) {
        if(adminDto.getId() == null || adminDto.getId() <= 0){
            return ResponseEntity.badRequest().body("Id is required to update user");
        }
        User user = userService.findById(adminDto.getId());
        if(!user.getUsername().equals(adminDto.getUsername())){
            return ResponseEntity.badRequest().body("the username can't be changed");
        }
        if(!user.getUsername().equals(adminDto.getEmail())
                && userService.existByEmail(adminDto.getEmail())){
            return ResponseEntity.badRequest().body("the email is already used");
        }
        //Si password est rempli il faut l'encoder avant de le sauvegarder
        if(StringUtils.hasLength(adminDto.getPassword())){
            adminDto.setPassword(encoder.encode(adminDto.getPassword()));
        }

        String token = jwtUtils.getJwtFromCookies(httpServletRequest);
        String username = jwtUtils.getUserNameFromJwtToken(token);

        user = mapper.map(adminDto,User.class);
        user.setRolesString(String.join(",", adminDto.getRoles()));
        //Auditing
        user.setUpUser(username);
        user.setUpDate(Calendar.getInstance());

        return ResponseEntity.ok().body(mapper.map(userService.save(user), UserAdminDto.class));
    }
    @PostMapping("")
    @Secured("ROLE_ADMIN")
    public ResponseEntity<?> createUser(@RequestBody UserAdminDto adminDto, HttpServletRequest httpServletRequest) {
        if(adminDto.getId() != null && adminDto.getId() > 0){
            return ResponseEntity.badRequest().body("Id forbidden to create user");
        }
        if(userService.existByEmail(adminDto.getEmail())){
            return ResponseEntity.badRequest().body("the email is already used");
        }
        if(userService.existByUsername(adminDto.getEmail())){
            return ResponseEntity.badRequest().body("the username is already used");
        }
        String token = jwtUtils.getJwtFromCookies(httpServletRequest);
        String username = jwtUtils.getUserNameFromJwtToken(token);

        // Create new user's account
        User user = mapper.map(adminDto,User.class);
        user.setPassword(encoder.encode(adminDto.getPassword()));
        user.setActivationCode(DigestUtils.sha256Hex(adminDto.getEmail()));
        user.setRolesString(RoleEnum.ROLE_USER.name());
        //Auditing
        user.setCrUser(username);
        user.setCrDate(Calendar.getInstance());
        //Vérifier l'username & l'email, Si il existe => Erreur
        return ResponseEntity.ok().body(mapper.map(userService.save(user), UserAdminDto.class));
    }


}
