DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_RecoverUser`(IN `id_usuario` INT(50), OUT `rows_affectted` INT(2))
BEGIN
UPDATE usuarios set usuario_baja = null where id = id_usuario and usuario_baja is not null;
set rows_affectted = row_count();
END$$
DELIMITER ;