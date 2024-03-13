package be.arbiter.clouddragonsheet.controllers;

import be.arbiter.clouddragonsheet.data.entities.User;
import be.arbiter.clouddragonsheet.services.UserService;
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


    @GetMapping("byId/{id}")
    public User getUserById(@PathVariable long id){
        return userService.findById(id);
    }
    @GetMapping("byUsername/{username}")
    public User getUserByUsername(@PathVariable String username){
        return userService.findByUsername(username);
    }
    @GetMapping("all")
    public List<User> getUsers(){
        return userService.findAll();
    }
}
