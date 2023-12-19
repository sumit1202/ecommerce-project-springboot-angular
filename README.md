# My E-Commerce Shop

This Full-Stack project was developed using Angular as Frontend, Spring Boot as Backend and MySQL as Database.

![App Screenshot](<Screenshot 2023-12-16 at 12.10.43 PM.png>)

## Features

- Browse products by category
- View product details
- Search for a product
- Pagination
- Add product to your cart
- Check your final cart status - total price and quantity
- Increment or Decrement quantity of product in your cart
- Remove product from your cart
- Cart checkout
- Checkout form with validation
- Purchase - save order details to database

## Development server

Frontend Dev Server:

- In terminal change directory to `03-frontend-angular/ecommerce-angular`. Run `ng serve` for a frontend dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

```
> cd 03-frontend-angular/ecommerce-angular
> ng serve
```

Backend Dev Server:

- Run required MySQL Scripts to setup database.

- In another terminal change directory to `02-backend-springboot/ecommerce`. Run `./mvnw spring-boot:run` for a backend dev server. Navigate to `http://localhost:8080/api`. The application will automatically reload if you change any of the source files.

```
> cd 02-backend-springboot/ecommerce
> ./mvnw spring-boot:run
```

## Courtesy

[Full Stack: Angular and Java Spring Boot E-Commerce Website](https://www.udemy.com/course/full-stack-angular-spring-boot-tutorial/) - Udemy Course by Chad Darby and Harinath Kuntamukkala.
