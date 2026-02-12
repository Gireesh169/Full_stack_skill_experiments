package com.klu.skill_exp_2;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;

import com.klu.Entity.Product;

public class App {

    public static void main(String[] args) {

        // Step 1: Create SessionFactory
        SessionFactory factory = new Configuration()
                .configure("hibernate.cfg.xml")
                .addAnnotatedClass(Product.class)
                .buildSessionFactory();

        // Step 2: Open Session
        Session session = factory.openSession();

        // Step 3: Begin Transaction
        Transaction tx = session.beginTransaction();

        // ---------- CREATE ----------
        Product p1 = new Product(1, "Laptop", "Gaming Laptop", 75000, 5);
        Product p2 = new Product(2, "Keyboard", "Mechanical Keyboard", 3500, 10);

        session.save(p1);
        session.save(p2);

        // ---------- READ ----------
        Product product = session.get(Product.class, 1);
        System.out.println("Retrieved Product: " + product);

        // ---------- UPDATE ----------
        product.setPrice(72000);
        product.setQuantity(7);
        session.update(product);

        // ---------- DELETE ----------
        Product deleteProduct = session.get(Product.class, 2);
        if (deleteProduct != null) {
            session.delete(deleteProduct);
        }

        // Step 4: Commit Transaction
        tx.commit();

        // Step 5: Close Resources
        session.close();
        factory.close();

        System.out.println("Hibernate CRUD operations executed successfully");
    }
}
