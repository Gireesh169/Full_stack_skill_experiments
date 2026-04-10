package com.klu;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class AuthController {

  @Autowired
  private UserService service;

  // Register
  @PostMapping("/register")
  public User register(@RequestBody User user) {
    return service.register(user);
  }

  // Login
  @PostMapping("/login")
  public User login(@RequestBody User user) {
    return service.login(user.getUsername(), user.getPassword());
  }

  // Profile
  @GetMapping("/profile/{id}")
  public User getUser(@PathVariable Long id) {
    return service.getUser(id);
  }
}