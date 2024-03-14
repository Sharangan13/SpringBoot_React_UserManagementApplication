package com.CRUDApplication.SpringBootCRUDApplication.controller;
import com.CRUDApplication.SpringBootCRUDApplication.exception.userNotFoundException;
import com.CRUDApplication.SpringBootCRUDApplication.model.User;
import com.CRUDApplication.SpringBootCRUDApplication.repository.UserRepository;
import org.aspectj.apache.bcel.Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("http://localhost:3000")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/user")
    User newUser(@RequestBody User newUser){
        return userRepository.save(newUser);
    }

    @GetMapping("/users")
    List<User> getAllUser(){
        return userRepository.findAll();
    }

    @GetMapping("/user/{id}")
    User getUserById(@PathVariable Long id){
        return userRepository.findById(id).orElseThrow(()->new userNotFoundException(id));

    }

    @PutMapping("/user/{id}")
    User updateUser(@RequestBody User newUser,@PathVariable Long id){
        return userRepository.findById(id)
                .map(user -> {user.setUserName(newUser.getUserName());
                    user.setEmail(newUser.getEmail());
                    user.setPhoneNumber(newUser.getPhoneNumber());
                    return  userRepository.save(user);
                }).orElseThrow(()->new userNotFoundException(id));

    }

    @DeleteMapping("/user/{id}")
    String deleteUser(@PathVariable Long id){
        if (!userRepository.existsById(id)) {
            throw new userNotFoundException(id);
        }
        else {
            userRepository.deleteById(id);
            return "User with id "+id+" has been deleted successfully";
        }
    }
}
