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

CREATE TABLE userMessages(
    id VARCHAR(20) PRIMARY KEY,
    userSourceId VARCHAR(20) NOT NULL,
    userTargetId VARCHAR(20) NOT NULL,
    message TEXT NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userSourceId) REFERENCES user(id),
    FOREIGN KEY (userTargetId) REFERENCES user(id)
);

CREATE TABLE userFriends(
    id VARCHAR(20) PRIMARY KEY,
    userSourceId VARCHAR(20) NOT NULL,
    userTargetId VARCHAR(20) NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userSourceId) REFERENCES user(id),
    FOREIGN KEY (userTargetId) REFERENCES user(id)
);

CREATE TABLE userLink(
    id VARCHAR(20) PRIMARY KEY,
    userSourceId VARCHAR(20) UNIQUE NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    userClicked VARCHAR(20),
    FOREIGN KEY (userSourceId) REFERENCES user(id)
);