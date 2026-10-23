DELIMITER //
CREATE PROCEDURE RegisterUser(
    IN p_username VARCHAR(50),
    IN p_password VARCHAR(255),
    IN p_role ENUM('Admin', 'Worker', 'Customer')
)
BEGIN
    INSERT INTO users (username, password_hash, role) 
    VALUES (p_username, SHA2(p_password, 256), p_role);
END //
DELIMITER ;

-- testing
CALL RegisterUser('ali_admin', '123456', 'Admin');
CALL RegisterUser('sara_worker', 'password789', 'Worker');
CALL RegisterUser('reza_customer', 'qwerty321', 'Customer');

SELECT * FROM users;
-- test was ssuccessful

DELIMITER //
CREATE PROCEDURE LoginUser(
    IN p_username VARCHAR(50),
    IN p_password VARCHAR(255)
)
BEGIN
    SELECT user_id, username, role,
           IF(password_hash = SHA2(p_password, 256), 'Login Success', 'Invalid Password') AS login_status
    FROM users
    WHERE username = p_username;
END //
DELIMITER ;

-- test
CALL LoginUser('ali_admin', '123456');
CALL LoginUser('ali_admin', 'wrong_password');
-- test was ssuccessful

DELIMITER //
CREATE PROCEDURE CreateOrder(
    IN p_customer_id INT,
    IN p_product_id INT,
    IN p_quantity INT,
    IN p_unit_price DECIMAL(10, 2)
)
BEGIN
    DECLARE v_order_id INT;
    DECLARE v_total DECIMAL(10, 2);
    SET v_total = p_quantity * p_unit_price;
    INSERT INTO `order` (customer_id, total_amount, status) 
    VALUES (p_customer_id, v_total, 'Pending');
    SET v_order_id = LAST_INSERT_ID();
    INSERT INTO order_item (order_id, product_id, quantity, unit_price)
    VALUES (v_order_id, p_product_id, p_quantity, p_unit_price);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE AddProduct(
    IN p_name VARCHAR(100),
    IN p_description TEXT,
    IN p_price DECIMAL(10, 2),
    IN p_stock INT
)
BEGIN
    INSERT INTO product (name, description, price, stock) 
    VALUES (p_name, p_description, p_price, p_stock);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE UpdateOrderStatus(
    IN p_order_id INT,
    IN p_status ENUM('Pending', 'Completed', 'Cancelled')
)
BEGIN
    UPDATE `order`
    SET status = p_status
    WHERE order_id = p_order_id;
END //
DELIMITER ;




