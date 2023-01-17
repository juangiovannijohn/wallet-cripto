DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_UpdateUser`(IN `id` INT(50), IN `nombre` VARCHAR(255), IN `apellido` VARCHAR(255), OUT `rows_affectted` INT(2))
BEGIN
UPDATE usuarios set usuario_nombre = nombre, usuario_apellido = apellido where id = id and usuario_baja is null ;
SET rows_affectted =  ROW_COUNT();
END$$
DELIMITER ;