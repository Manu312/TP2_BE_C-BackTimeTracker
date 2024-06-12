Comandos mySql dbPRD:

CREATE DATABASE apptimetracker;

use apptimetracker;

CREATE TABLE users (
id INT AUTO_INCREMENT PRIMARY KEY,
username VARCHAR(255) NOT NULL,
password VARCHAR(255) NOT NULL,
email VARCHAR(255) NOT NULL,
role ENUM('user', 'admin') DEFAULT 'user',
full_name VARCHAR(255),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Crear usuarios ejemplo

-- Insertar usuario administrador
INSERT INTO users (username, password, email, role, full_name)
VALUES ('admin', 'admin123', 'admin@example.com', 'admin', 'Admin User');

-- Insertar usuario normal
INSERT INTO users (username, password, email, role, full_name)
VALUES ('user', 'user123', 'user@example.com', 'user', 'Normal User');

--Creat tabla "peoyectos"

CREATE TABLE projects (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(255) NOT NULL UNIQUE,
pricePerHour INT NOT NULL,
description VARCHAR(255),
userId INT,
CONSTRAINT fk_projects_users
FOREIGN KEY (userId)
REFERENCES users(id)
);
