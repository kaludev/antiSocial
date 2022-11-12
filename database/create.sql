CREATE DATABASE if not exists antiSocial;

USE antiSocial;

CREATE TABLE IF NOT EXISTS user(
    id VARCHAR(20) PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    regitreredAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
    confirmed BOOLEAN,
    status BOOLEAN;
);

CREATE TABLE IF NOT EXISTS userMessages(
    id VARCHAR(20) PRIMARY KEY,
    userSourceId VARCHAR(20) NOT NULL,
    userTargetId VARCHAR(20) NOT NULL,
    message TEXT NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userSourceId) REFERENCES user(id),
    FOREIGN KEY (userTargetId) REFERENCES user(id)
);

CREATE TABLE IF NOT EXISTS userFriends(
    id VARCHAR(20) PRIMARY KEY,
    userSourceId VARCHAR(20) NOT NULL,
    userTargetId VARCHAR(20) NOT NULL,
    accepted BOOLEAN NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userSourceId) REFERENCES user(id),
    FOREIGN KEY (userTargetId) REFERENCES user(id)
);