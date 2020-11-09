DROP DATABASE IF EXISTS tuber ;
CREATE DATABASE tuber ;
USE tuber ;

CREATE TABLE validations (
    id INT NOT NULL AUTO_INCREMENT ,
    driver_id INT NOT NULL ,
    status VARCHAR(20) NOT NULL,
    PRIMARY KEY (id) 
);

CREATE TABLE requests (
    id INT NOT NULL AUTO_INCREMENT,
    request VARCHAR(30) NOT NULL,
    init_position DOUBLE NOT NULL,
    final_position DOUBLE NOT NULL,
    PRIMARY KEY (id)
)