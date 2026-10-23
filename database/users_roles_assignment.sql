-- 1. CREATE DATABASE USERS
CREATE USER IF NOT EXISTS 'ali_admin'@'%' IDENTIFIED BY '123456';
CREATE USER IF NOT EXISTS 'sara_worker'@'%' IDENTIFIED BY '123456';
CREATE USER IF NOT EXISTS 'reza_customer'@'%' IDENTIFIED BY '123456';

-- 2. GRANT ROLES TO USERS
GRANT 'Admin_Role' TO 'ali_admin'@'%';
GRANT 'Worker_Role' TO 'sara_worker'@'%';
GRANT 'Customer_Role' TO 'reza_customer'@'%';

-- 3. SET DEFAULT ROLES
SET DEFAULT ROLE 'Admin_Role' TO 'ali_admin'@'%';
SET DEFAULT ROLE 'Worker_Role' TO 'sara_worker'@'%';
SET DEFAULT ROLE 'Customer_Role' TO 'reza_customer'@'%';

-- 4. TEST AND REGISTER NEW USER
-- Register new customer in the application users table
CALL RegisterUser('morteza_customer', 'morteza123', 'Customer');

-- Create corresponding database user and assign the customer role
CREATE USER IF NOT EXISTS 'morteza_customer'@'%' IDENTIFIED BY 'morteza123';
GRANT 'Customer_Role' TO 'morteza_customer'@'%';
SET DEFAULT ROLE 'Customer_Role' TO 'morteza_customer'@'%';