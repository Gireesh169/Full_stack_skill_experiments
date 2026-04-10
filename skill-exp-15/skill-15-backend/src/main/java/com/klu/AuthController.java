package com.klu;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private UserRepository repo;

    @Autowired
    private JwtUtil jwtUtil;

    // Register
    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return repo.save(user);
    }

    // Login
    @PostMapping("/login")
    public String login(@RequestBody User user) {

        User dbUser = repo.findByUsername(user.getUsername());

        if (dbUser != null && dbUser.getPassword().equals(user.getPassword())) {
            return jwtUtil.generateToken(dbUser.getUsername(), dbUser.getRole());
        }
        return "Invalid credentials";
    }

    // ADMIN APIs
    @GetMapping("/admin/add")
    public String adminAdd() {
        return "Admin can add";
    }

    @GetMapping("/admin/delete")
    public String adminDelete() {
        return "Admin can delete";
    }

    // EMPLOYEE API
    @GetMapping("/employee/profile")
    public String profile() {
        return "Employee profile";
    }
}