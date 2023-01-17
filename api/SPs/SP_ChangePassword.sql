DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_ChangePassword`(IN `id_usuario` INT(50), IN `pass` VARCHAR(60), OUT `rows_affectted` INT(2))
BEGIN
UPDATE usuarios set usuario_pass = pass where id = id_usuario and usuario_baja is null;
SET rows_affectted = row_count();
END$$
DELIMITER ;