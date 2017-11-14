DELIMITER // 
CREATE TRIGGER comprobacion_titulo BEFORE INSERT ON image
FOR EACH ROW
BEGIN
        IF (CHAR_LENGTH(NEW.title) < 5) THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error, el titulo debe incluir al menos 5 letras';
        END IF;
          
END ;
//
DELIMITER ;

DELIMITER // 
CREATE TRIGGER validacion_datos_person BEFORE INSERT ON person
FOR EACH ROW
BEGIN
   
       IF (NEW.typeOfPerson != 'null' AND NEW.typeOfPerson != 'USER') THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error, no es user ni null';
       END IF;

        IF (CHAR_LENGTH(NEW.name) < 5) THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error, el name debe contener al menos 5 caracteres';
       END IF;
          
END ;
//
DELIMITER ;

DELIMITER // 
CREATE TRIGGER comprobacion_datos_user BEFORE INSERT ON user
FOR EACH ROW
BEGIN
   
       IF (CHAR_LENGTH(NEW.username) < 5 OR  CHAR_LENGTH(NEW.password) < 5 OR CHAR_LENGTH(NEW.email) < 5) THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error, username, email y password deben tener mas de 5 caracteres';
       END IF;
          
END ;
//
DELIMITER ;

DELIMITER // 
CREATE TRIGGER comprobacion_datos_session BEFORE INSERT ON session
FOR EACH ROW
BEGIN
   
       IF (NEW.status != 'online' AND NEW.status != 'offline') THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error, el status debe ser online o offline';
       END IF;
          

       IF (CHAR_LENGTH(NEW.ip) < 7) THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error, la IP debe tener mas de 7 caracteres';
       END IF;
END ;
//
DELIMITER ;
