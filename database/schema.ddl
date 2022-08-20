--- Warepair Schema

DROP TABLE IF EXISTS user CASCADE;
DROP TABLE IF EXISTS request_history CASCADE;
DROP TYPE IF EXISTS request_type CASCADE;

CREATE TABLE user (
  first_name VARCHAR not NULL,
  last_name VARCHAR not NULL,
  email VARCHAR not NULL,
  password VARCHAR not NULL,


);

CREATE TABLE request_history (
  request_type INT not NULL,
  
);

CREATE TABLE request_type (

);