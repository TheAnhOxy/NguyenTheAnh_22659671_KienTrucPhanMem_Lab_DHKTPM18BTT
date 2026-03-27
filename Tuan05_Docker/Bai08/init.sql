CREATE DATABASE mydb;

\c mydb;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT
);

INSERT INTO users(name) VALUES ('Nguyen'), ('Anh');