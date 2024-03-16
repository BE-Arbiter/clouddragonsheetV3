package be.arbiter.clouddragonsheet.controllers;

import be.arbiter.clouddragonsheet.configuration.security.jwt.JwtUtils;
import be.arbiter.clouddragonsheet.configuration.security.services.UserDetailsImpl;
import be.arbiter.clouddragonsheet.data.dtos.SimpleAnswerDTO;
import be.arbiter.clouddragonsheet.data.dtos.UserFullDto;
import be.arbiter.clouddragonsheet.data.dtos.auth.LoginDTO;
import be.arbiter.clouddragonsheet.data.dtos.auth.SubscribeDTO;
import be.arbiter.clouddragonsheet.data.entities.User;
import be.arbiter.clouddragonsheet.data.enums.RoleEnum;
import be.arbiter.clouddragonsheet.repositories.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.commons.codec.digest.DigestUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.Calendar;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    ModelMapper mapper;

    @Autowired
    JwtUtils jwtUtils;

    @GetMapping("/me")
    public ResponseEntity<UserFullDto> getSelf(HttpServletRequest request){
        String token = jwtUtils.getJwtFromCookies(request);
        if(!StringUtils.hasLength(token)){
            return ResponseEntity.ok().body(UserFullDto.guest());
        }
        String username = jwtUtils.getUserNameFromJwtToken(token);
        User user = userRepository.findByUsername(username).orElse(null);
        if(user == null){
            return ResponseEntity.ok().body(UserFullDto.guest());
        }
        return ResponseEntity.ok().body(mapper.map(user,UserFullDto.class));
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginDTO loginRequest) {

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(userDetails);

        User user = userRepository.findByUsername(userDetails.getUsername()).orElse(null);

        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, jwtCookie.toString()).body( (user!= null)? mapper.map(user,UserFullDto.class): UserFullDto.guest());
    }
    @PostMapping("/logout")
    public ResponseEntity<UserFullDto> logoutUser() {
        ResponseCookie cookie = jwtUtils.getCleanJwtCookie();
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString()).body(UserFullDto.guest());
    }

    @PostMapping("/subscribe")
    public ResponseEntity<?> registerUser(@RequestBody SubscribeDTO newUser) {
        newUser.setUsername(newUser.getUsername().toLowerCase());
        if("guest".equals(newUser.getUsername()) || "liquibase".equals(newUser.getUsername())){
            return ResponseEntity.badRequest().body("errors.usernameRestricted");
        }
        if (userRepository.existsByUsername(newUser.getUsername())) {
            return ResponseEntity.badRequest().body("errors.usernameUsed");
        }

        if (userRepository.existsByEmail(newUser.getEmail())) {
            return ResponseEntity.badRequest().body("errors.emailUsed");
        }

        // Create new user's account
        User user = new User();
        user.setUsername(newUser.getUsername());
        user.setEmail(newUser.getEmail());
        user.setPassword(encoder.encode(newUser.getPassword()));
        user.setLastName(newUser.getLastName());
        user.setFirstName(newUser.getFirstName());
        user.setActivated(true);
        user.setActivationCode(DigestUtils.sha256Hex(newUser.getEmail()));
        user.setRolesString(RoleEnum.ROLE_USER.name());
        //Auditing
        user.setCrUser(newUser.getUsername());
        user.setCrDate(Calendar.getInstance());





        userRepository.save(user);

        return ResponseEntity.ok(new SimpleAnswerDTO("user.saved"));
    }

}