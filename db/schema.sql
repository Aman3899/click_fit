DROP PROCEDURE IF EXISTS addUser;
DROP TABLE IF EXISTS users;


CREATE TABLE users (
    ID INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) CHARACTER SET 'utf8mb4' NOT NULL,
    password VARCHAR(255) CHARACTER SET 'utf8mb4' NOT NULL,
    type VARCHAR(50) CHARACTER SET 'utf8mb4' NOT NULL,
    active TINYINT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (ID),
    UNIQUE KEY uk_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
DELIMITER //

CREATE PROCEDURE addUser (
    IN p_email VARCHAR(255),
    IN p_password VARCHAR(255),
    IN p_type VARCHAR(50)
)
BEGIN
    INSERT INTO users (email, password, type) VALUES (p_email, p_password, p_type);
END //

DELIMITER ;


CALL addUser(
    'test.user@example.com',                 
    '$2b$10$examplehashstringgeneratedbybcrypt',
    'member'
);

CALL addUser(
    'admin.user@example.com',
    '$2b$10$anotherexamplehashstringgeneratedbybcrypt',
    'admin'
);
