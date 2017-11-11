CREATE TABLE image(
   idImage int  AUTO_INCREMENT PRIMARY KEY,
   directory VARCHAR(80) NOT NULL,
   extension VARCHAR(80) NOT NULL,
   description VARCHAR(255) NOT NULL,
   title VARCHAR(20) NOT NULL,
   comment VARCHAR(255),
   user INT(10) NOT NULL,
   FOREIGN KEY(user) REFERENCES user(person)
);

CREATE TABLE person(
    personId INT(10) PRIMARY KEY,
    name VARCHAR(40) NOT NULL,
    typeOfPerson VARCHAR(4) NOT NULL
);

CREATE TABLE user(   
   username VARCHAR(20) NOT NULL,
   avatar VARCHAR(80) NOT NULL,
   password VARCHAR(20) NOT NULL,
   email VARCHAR(20) NOT NULL,
   person INT(10) PRIMARY KEY,
   FOREIGN KEY(person) REFERENCES person(personId),
   UNIQUE(username)
);

CREATE TABLE session(   
     sessionId VARCHAR(255) PRIMARY KEY,
     status VARCHAR(8) NOT NULL,
     ip VARCHAR(128) NOT NULL,
     user INT(10) NOT NULL,
     FOREIGN KEY(user) REFERENCES user(person)
);

CREATE TABLE album(    
    albumId int AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    description VARCHAR(255) NOT NULL,
    user INT(10) NOT NULL,
    FOREIGN KEY(user) REFERENCES user(person)
);

CREATE TABLE albumximage(
    orderNumber INT(10) NOT NULL,
    image INT(10) NOT NULL,
    album INT(30) NOT NULL,
    FOREIGN KEY(image) REFERENCES image(idImage),
    FOREIGN KEY(album) REFERENCES album(albumId),
    PRIMARY KEY(image,album)
);
