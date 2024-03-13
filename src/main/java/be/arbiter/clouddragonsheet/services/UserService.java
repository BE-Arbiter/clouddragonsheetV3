package be.arbiter.clouddragonsheet.services;

import be.arbiter.clouddragonsheet.data.entities.User;
import be.arbiter.clouddragonsheet.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    public List<User> findAll(){
        return userRepository.findAll();
    }

    public User findById(Long id){
        if(id == null){
            return null;
        }
        return userRepository.findById(id).orElse(null);
    }
    public User findByUsername(String username){
        if(StringUtils.hasLength(username)){
            return null;
        }
        return userRepository.findByUsername(username).orElse(null);
    }
}
