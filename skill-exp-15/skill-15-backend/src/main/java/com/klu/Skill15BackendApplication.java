package com.klu;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.persistence.autoconfigure.EntityScan;

@SpringBootApplication
@EntityScan(basePackages = "com.klu")
public class Skill15BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(Skill15BackendApplication.class, args);
    }
}