package com.example.language.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.dao.DataAccessException;

import com.example.language.Repository.UserRepository;
import com.example.language.model.register;

@Service
public class UserService {

    private static final Logger log = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserRepository userRepository;

    public String registerUser(register user) {
        // Your existing code...

        if (user.getPassword().equals(user.getConfirmPassword())) {
            userRepository.save(user);
            return "User registered successfully!";
        } else {
            return "Password and confirm password do not match.";
        }
    }

    public String loginUser(String username, String password) {
        try {
            log.info("Login attempt for username: {}", username);

            register user = userRepository.findByUsername(username);
            if (user != null && user.getPassword() != null && user.getPassword().equals(password)) {
                return "Login successful!";
            } else {
                return "Invalid username or password.";
            }
        } catch (DataAccessException e) {
            log.error("An error occurred during login", e);
            return "An error occurred during login.";
        }
    }

}
