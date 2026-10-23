# Store Management System with RBAC

A collaborative university project that demonstrates a store management system with Role-Based Access Control (RBAC), using MySQL, Node.js, Express.js, and React.

## About the Project

This project integrates a MySQL database with a web application to demonstrate authentication, user roles, product management, and order processing.

The frontend and backend were developed to work with the existing database project. The original SQL scripts are preserved and are not modified by the web application.

## Features

- User authentication using JWT
- Role-based access control
- Product listing and product creation
- Order creation and management
- Order status updates
- Customer access to their own orders
- Integration with MySQL stored procedures

Available actions depend on the user's role and the permissions implemented in the project.

## Technologies

- **Frontend:** React, Vite
- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Authentication:** JSON Web Tokens (JWT)

## User Roles

| Role | Access |
|---|---|
| Admin | Administrative features permitted by the project |
| Worker | Supported product and order management features |
| Customer | Product browsing, order creation, and viewing personal orders |

## Project Structure

```text
store-rbac-project/
├── backend/
│   ├── routes/
│   ├── db.js
│   ├── middleware.js
│   └── server.js
├── database/
│   ├── database.sql
│   ├── permissions.sql
│   ├── procedures.sql
│   ├── roles.sql
│   ├── test_scenarios.sql
│   └── users_roles_assignment.sql
├── frontend/
│   └── src/
├── .gitignore
└── README.md
```

## Getting Started

### Requirements

- Node.js 20 or later
- MySQL 8 or later
- npm

### 1. Set Up the Database

Import the SQL scripts from the `database/` directory into your MySQL environment, following the setup requirements of the original database project.

### 2. Configure the Backend

Open a terminal in the project directory and run:

```bash
cd backend
npm install
```

Create a local `.env` file by copying `.env.example`.

On Windows:

```bat
copy .env.example .env
```

On Linux or macOS:

```bash
cp .env.example .env
```

Configure your local database connection and a secure JWT secret in `.env`. Never commit real credentials or secrets to GitHub.

Start the backend:

```bash
npm run dev
```

### 3. Start the Frontend

Open another terminal and run:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed by Vite in your browser.

## Security

- Authentication tokens are handled by the backend.
- Protected operations use authentication and role-based authorization.
- Database credentials and JWT secrets must remain in environment variables.
- Public registration is restricted to Customer accounts.

## Team Contributions

This project was developed collaboratively as part of a university assignment.

- **[Ali Mohammadi](https://github.com/alimohammadi05):** Database design and SQL implementation.
- **Frontend and Backend Integration:** Frontend development and integration of the application components.

## Academic Purpose

This project demonstrates database integration, role-based access control, authentication, and full-stack web development.

## License

No license has been specified. Please agree on a license with all contributors before permitting others to reuse the code.
