DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_CreateUser`(IN `nombre` VARCHAR(255), IN `apellido` VARCHAR(255), IN `email` VARCHAR(60), IN `pass` VARCHAR(60), OUT `rows_affectted` INT(2))
BEGIN
INSERT INTO usuarios (id, usuario_nombre, usuario_apellido, usuario_email, usuario_pass, usuario_alta, usuario_baja ) VALUES (DEFAULT, nombre, apellido, email, pass, current_date(), NULL );
SET rows_affectted = ROW_COUNT();
END$$
DELIMITER ;