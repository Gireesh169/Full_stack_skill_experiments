package com.klu;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/library")
public class LibraryController {

    private List<Book> bookList = new ArrayList<>();

    // 1. /welcome
    @GetMapping("/welcome")
    public String welcome() {
        return "Welcome to Library Management System!";
    }

    // 2. /count
    @GetMapping("/count")
    public int count() {
        return 150;
    }

    // 3. /price
    @GetMapping("/price")
    public double price() {
        return 499.99;
    }

    // 4. /books
    @GetMapping("/books")
    public List<String> books() {
        return Arrays.asList("Java Basics", "Spring Boot Guide", "Data Structures");
    }

    // 5. /books/{id}
    @GetMapping("/books/{id}")
    public String getBookById(@PathVariable int id) {
        return "Book details for ID: " + id;
    }

    // 6. /search?title=Java
    @GetMapping("/search")
    public String searchBook(@RequestParam String title) {
        return "Searching for book with title: " + title;
    }

    // 7. /author/{name}
    @GetMapping("/author/{name}")
    public String getAuthor(@PathVariable String name) {
        return "Books written by author: " + name;
    }

    // 8. /addbook (POST)
    @PostMapping("/addbook")
    public String addBook(@RequestBody Book book) {
        bookList.add(book);
        return "Book added successfully!";
    }

    // 9. /viewbooks
    @GetMapping("/viewbooks")
    public List<Book> viewBooks() {
        return bookList;
    }
}
