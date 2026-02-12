package com.klu.skill_exp_3;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;
import org.hibernate.query.Query;

import com.klu.Entity.Product;

public class HCQL_APP {

    public static void main(String[] args) {

        SessionFactory factory = new Configuration()
                .configure("hibernate.cfg.xml")
                .addAnnotatedClass(Product.class)
                .buildSessionFactory();

        Session session = factory.openSession();
        Transaction tx = session.beginTransaction();

        // ---------------- SORTING ----------------
        // Price Ascending
        Query<Product> q1 = session.createQuery(
                "from Product order by price asc", Product.class);
        List<Product> list1 = q1.list();
        System.out.println("Price Ascending:");
        list1.forEach(System.out::println);

        // Price Descending
        Query<Product> q2 = session.createQuery(
                "from Product order by price desc", Product.class);
        System.out.println("Price Descending:");
        q2.list().forEach(System.out::println);

        // Quantity Highest First
        Query<Product> q3 = session.createQuery(
                "from Product order by quantity desc", Product.class);
        System.out.println("Quantity Highest First:");
        q3.list().forEach(System.out::println);

        // ---------------- PAGINATION ----------------
        Query<Product> q4 = session.createQuery("from Product", Product.class);
        q4.setFirstResult(0);   // start index
        q4.setMaxResults(3);    // first 3 records
        System.out.println("First 3 Products:");
        q4.list().forEach(System.out::println);

        Query<Product> q5 = session.createQuery("from Product", Product.class);
        q5.setFirstResult(3);   // next records
        q5.setMaxResults(3);
        System.out.println("Next 3 Products:");
        q5.list().forEach(System.out::println);

        // ---------------- AGGREGATES ----------------
        // Count total products
        Long count = session.createQuery(
                "select count(p) from Product p", Long.class)
                .uniqueResult();
        System.out.println("Total Products: " + count);

        // Count products where quantity > 0
        Long availableCount = session.createQuery(
                "select count(p) from Product p where quantity > 0", Long.class)
                .uniqueResult();
        System.out.println("Products with quantity > 0: " + availableCount);

        // Min and Max price
        Object[] result = session.createQuery(
                "select min(price), max(price) from Product", Object[].class)
                .uniqueResult();
        System.out.println("Min Price: " + result[0]);
        System.out.println("Max Price: " + result[1]);

        // ---------------- FILTERING ----------------
        Query<Product> q6 = session.createQuery(
                "from Product where price between 3000 and 80000", Product.class);
        System.out.println("Products in Price Range:");
        q6.list().forEach(System.out::println);

        // ---------------- LIKE ----------------
        Query<Product> q7 = session.createQuery(
                "from Product where name like 'L%'", Product.class);
        System.out.println("Names starting with L:");
        q7.list().forEach(System.out::println);

        Query<Product> q8 = session.createQuery(
                "from Product where name like '%board'", Product.class);
        System.out.println("Names ending with 'board':");
        q8.list().forEach(System.out::println);

        Query<Product> q9 = session.createQuery(
                "from Product where name like '%top%'", Product.class);
        System.out.println("Names containing 'top':");
        q9.list().forEach(System.out::println);

        tx.commit();
        session.close();
        factory.close();
    }
}
