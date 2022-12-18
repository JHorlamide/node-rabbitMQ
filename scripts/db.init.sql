CREATE DATABASE 'node_rabbitmq';

DROP TABLE IF EXISTS 'Books';

CREATE TABLE Books (
  id int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (id),
  name varchar(255) NOT NULL,
  authorName varchar(255) NOT NULL,
  description varchar(255) NOT NULL,
  category varchar(255) NOT NULL,
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;