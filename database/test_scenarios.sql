-- 1. ADD PRODUCT BY ADMIN
CALL AddProduct('Gaming Laptop', 'High-end gaming laptop', 45000000.00, 10);

-- 2. LOGIN USER TEST
CALL LoginUser('reza_customer', 'qwerty321');

-- 3. CREATE ORDER TEST
CALL CreateOrder(4, 1, 2, 45000000.00);

-- 4. LOGIN WORKER TEST
CALL LoginUser('sara_worker', 'password789');

-- 5. UPDATE ORDER STATUS TEST
CALL UpdateOrderStatus(1, 'Completed');

-- 6. VIEW ORDER STATUS TEST
SELECT * FROM `order` WHERE customer_id = 4;

-- 7. SECURITY RESTRICTION TEST
-- Note: To test permission denial, open a separate session as 'reza_customer'.
-- Executing this under the current root connection will not fail.
-- CALL UpdateOrderStatus(1, 'Pending');