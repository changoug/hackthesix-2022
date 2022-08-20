CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `first name` varchar(255) NOT NULL,
  `last name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `is_contractor` tinyint(1) NOT NULL,
  PRIMARY KEY (`user_id`)
);

CREATE TABLE IF NOT EXISTS `requests` (
  `request_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `request description` varchar(3000) NOT NULL,
  `location` varchar(255) NOT NULL,
  `contact info` varchar(255) NOT NULL,
  `compensation` float,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`request_id`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
);