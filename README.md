# Store Management System with RBAC

A collaborative university project demonstrating a store management system with Role-Based Access Control (RBAC).

## About the Project

This project integrates a MySQL database with a web application to demonstrate authentication, user roles, product management, and order processing.

It was developed collaboratively as part of a university assignment.

## Features

- User login and authentication using JWT
- Role-based access control
- Product listing and product creation
- Order creation and management
- Order status updates
- Customer access to their own orders
- Integration between React, Express.js, and MySQL stored procedures

## Technologies

- **Frontend:** React, Vite
- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Authentication:** JSON Web Tokens (JWT)

## User Roles

| Role | Access |
|---|---|
| Admin | Administrative features allowed by the implemented permissions |
| Worker | Supported product and order management features |
| Customer | Product browsing, order creation, and viewing personal orders |

## Team Contributions

- **[Ali Mohammadi](https://github.com/alimohammadi05):** Database design and SQL implementation.
- **Frontend and Backend Integration:** Web interface development and integration of the application components.

This project was developed collaboratively as part of a university assignment.

## Security Notes

- Database credentials and secret keys must be kept in environment variables.
- Environment files containing secrets must not be committed to GitHub.
- Public registration is restricted to Customer accounts.

## Academic Purpose

Developed for educational purposes to demonstrate database security, role-based permissions, and full-stack web application development.
