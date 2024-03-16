package be.arbiter.clouddragonsheet.controllers;

import be.arbiter.clouddragonsheet.configuration.security.jwt.JwtUtils;
import be.arbiter.clouddragonsheet.data.dtos.SimpleAnswerDTO;
import be.arbiter.clouddragonsheet.data.dtos.UserAdminDto;
import be.arbiter.clouddragonsheet.data.dtos.UserDto;
import be.arbiter.clouddragonsheet.data.entities.User;
import be.arbiter.clouddragonsheet.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.Calendar;
import java.util.List;

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
    public ResponseEntity<List<UserAdminDto>> getUsers() {
        return ResponseEntity.ok(userService.findAll().stream()
                .map(user -> {
                    UserAdminDto userMap = mapper.map(user, UserAdminDto.class);
                    userMap.setPassword("");
                    return userMap;
                }).toList());
    }
    @GetMapping("/{id}")
    @Secured("ROLE_ADMIN")
    public ResponseEntity<UserAdminDto> getUserById(@PathVariable long id) {
        UserAdminDto userMap = mapper.map(userService.findById(id), UserAdminDto.class);
        userMap.setPassword("");
        return ResponseEntity.ok(userMap);
    }

    @DeleteMapping("/{id}")
    @Secured("ROLE_ADMIN")
    public ResponseEntity<?> deleteUser(@PathVariable long id){
        if(!userService.existById(id)){
            return ResponseEntity.badRequest().body("errors.userNotFound");
        }
        userService.delete(id);
        return ResponseEntity.ok(new SimpleAnswerDTO("user.deleted"));
    }
    @GetMapping("/{id}/username")
    @Secured("ROLE_USER")
    public ResponseEntity<UserDto> getUsernameById(@PathVariable long id) {
        return ResponseEntity.ok(mapper.map(userService.findById(id), UserDto.class));
    }
    @PutMapping("")
    @Secured("ROLE_ADMIN")
    public ResponseEntity<?> editUser(@RequestBody UserAdminDto adminDto,HttpServletRequest httpServletRequest) {
        if(adminDto.getId() == null || adminDto.getId() <= 0){
            return ResponseEntity.badRequest().body("errors.idRequired");
        }
        User user = userService.findById(adminDto.getId());
        if(user == null){
            return ResponseEntity.badRequest().body("errors.userNotFound");
        }
        if(!user.getUsername().equals(adminDto.getUsername())){
            return ResponseEntity.badRequest().body("errors.changedUsername");
        }
        if(!user.getEmail().equals(adminDto.getEmail())
                && userService.existByEmail(adminDto.getEmail())){
            return ResponseEntity.badRequest().body("errors.emailUsed");
        }
        String token = jwtUtils.getJwtFromCookies(httpServletRequest);
        String username = jwtUtils.getUserNameFromJwtToken(token);
        user.setFirstName(adminDto.getFirstName());
        user.setLastName(adminDto.getLastName());
        user.setEmail(adminDto.getEmail());
        //Si password est rempli il faut l'encoder avant de le sauvegarder
        if(StringUtils.hasLength(adminDto.getPassword())){
            user.setPassword(encoder.encode(adminDto.getPassword()));
        }
        user.setActivated(adminDto.getActivated());
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
            return ResponseEntity.badRequest().body("errors.idForbidden");
        }
        adminDto.setUsername(adminDto.getUsername().toLowerCase());
        if("guest".equals(adminDto.getUsername()) || "liquibase".equals(adminDto.getUsername())){
            return ResponseEntity.badRequest().body("errors.usernameRestricted");
        }
        if(userService.existByEmail(adminDto.getEmail())){
            return ResponseEntity.badRequest().body("errors.emailUsed");
        }
        if(userService.existByUsername(adminDto.getEmail())){
            return ResponseEntity.badRequest().body("errors.usernameUsed");
        }
        String token = jwtUtils.getJwtFromCookies(httpServletRequest);
        String username = jwtUtils.getUserNameFromJwtToken(token);

        // Create new user's account
        User user = mapper.map(adminDto,User.class);
        user.setPassword(encoder.encode(adminDto.getPassword()));
        user.setRolesString(String.join(",",adminDto.getRoles()));
        //Auditing
        user.setCrUser(username);
        user.setCrDate(Calendar.getInstance());
        UserAdminDto userMap = mapper.map(userService.save(user), UserAdminDto.class);
        userMap.setPassword("");
        return ResponseEntity.ok(userMap);
    }


}
