-- Admin
GRANT EXECUTE ON PROCEDURE store_security_db.AddProduct TO 'Admin_Role';
GRANT EXECUTE ON PROCEDURE store_security_db.UpdateOrderStatus TO 'Admin_Role';
GRANT EXECUTE ON PROCEDURE store_security_db.CreateOrder TO 'Admin_Role';
GRANT SELECT, INSERT, UPDATE, DELETE ON store_security_db.* TO 'Admin_Role';

-- Worker
GRANT EXECUTE ON PROCEDURE store_security_db.AddProduct TO 'Worker_Role';
GRANT EXECUTE ON PROCEDURE store_security_db.UpdateOrderStatus TO 'Worker_Role';
GRANT SELECT, UPDATE ON store_security_db.product TO 'Worker_Role';
GRANT SELECT, UPDATE ON store_security_db.order TO 'Worker_Role';

-- Customer
GRANT EXECUTE ON PROCEDURE store_security_db.CreateOrder TO 'Customer_Role';
GRANT SELECT ON store_security_db.product TO 'Customer_Role';