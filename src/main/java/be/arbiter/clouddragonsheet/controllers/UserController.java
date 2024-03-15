package be.arbiter.clouddragonsheet.controllers;

import be.arbiter.clouddragonsheet.data.dtos.UserInfoDTO;
import be.arbiter.clouddragonsheet.data.entities.User;
import be.arbiter.clouddragonsheet.services.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private ModelMapper modelMapper;


    @GetMapping("byId/{id}")
    public User getUserById(@PathVariable long id) {
        return userService.findById(id);
    }

    @GetMapping("byUsername/{username}")
    public User getUserByUsername(@PathVariable String username) {
        return userService.findByUsername(username);
    }

    @GetMapping("all")
    public List<UserInfoDTO> getUsers() {
        return userService.findAll().stream()
                .map(user -> modelMapper.map(user, UserInfoDTO.class)).toList();
    }
}
