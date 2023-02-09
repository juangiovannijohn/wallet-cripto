DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_CreateUser`(IN `nombre` VARCHAR(255), IN `apellido` VARCHAR(255), IN `email` VARCHAR(60), IN `pass` VARCHAR(60), OUT `rows_affectted` INT(2))
BEGIN
  SET @verify_email = (SELECT COUNT(*) FROM usuarios WHERE usuario_email = email);

  IF (@verify_email = 0) THEN
    INSERT INTO usuarios (id, usuario_nombre, usuario_apellido, usuario_email, usuario_pass, usuario_alta, usuario_baja)
    VALUES (DEFAULT, nombre, apellido, email, pass, current_date(), NULL );

    SET rows_affectted = ROW_COUNT();
  ELSE
    SET rows_affectted = -1;
  END IF;
END$$
DELIMITER ;