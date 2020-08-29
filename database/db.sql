--USERS TABLE
CREATE DATABASE database_fichajes;

USE database_fichajes;

CREATE TABLE users(
    id INT(11) NOT NULL,
    username VARCHAR(60) NOT NULL,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL
);

ALTER TABLE users
    ADD PRIMARY KEY (id);

ALTER TABLE users
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE users;


-- FICHAJE TABLES
CREATE TABLE fichaje(
    id INT(11) NOT NULL,
    user_id INT(11),
    clock_in VARCHAR(60) NOT NULL DEFAULT current_timestamp,
    clock_out VARCHAR(60),
    salida BOOLEAN DEFAULT '1',
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

ALTER TABLE fichaje
    ADD PRIMARY KEY (id);

ALTER TABLE fichaje
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE fichaje;