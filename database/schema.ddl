--- Warepair Schema

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS request CASCADE;

CREATE TABLE users (
  user_id uuid PRIMARY KEY NOT NULL,
  first_name varchar (50) NOT NULL,
  last_name varchar (50) NOT NULL,
  email varchar (50) NOT NULL,
  password varchar (50) NOT NULL,
  location varchar (100),
  is_contractor BOOLEAN NOT NULL,
  radius INTEGER
);

CREATE TABLE request (
  request_id uuid PRIMARY KEY NOT NULL,
  user_id varchar (50),
  title varchar (50) NOT NULL,
  request_description varchar (50) NOT NULL,
  location varchar (100) NOT NULL,
  contact_info varchar (100) NOT NULL,
  compensation varchar (50) NOT NULL,
  is_complete BOOLEAN NOT NULL
);