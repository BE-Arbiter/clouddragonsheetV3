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

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User findById(Integer id) {
        if (id == null) {
            return null;
        }
        return userRepository.findById(id).orElse(null);
    }

    public User save(User user) {
        return userRepository.save(user);
    }
    public void delete(Integer id) {
        userRepository.deleteById(id);
    }

    public Boolean existByUsername(String username) {
        if (!StringUtils.hasLength(username)) {
            return null;
        }
        return userRepository.existsByUsername(username);
    }
    public Boolean existById(Integer id) {
        return userRepository.existsById(id);
    }

    public Boolean existByEmail(String email) {
        if (!StringUtils.hasLength(email)) {
            return null;
        }
        return userRepository.existsByEmail(email);
    }
}
