CREATE DATABASE if not exists antiSocial;

USE antiSocial;

CREATE TABLE user(
    id VARCHAR(20) PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    regitreredAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
    confirmed BOOLEAN
);