DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS post;

CREATE TABLE user (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(31) UNIQUE NOT NULL,
    password VARCHAR(31) NOT NULL,
    email VARCHAR(255) NOT NULL
);