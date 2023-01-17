DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_GetUser`(IN `id` INT(50))
    COMMENT 'SP para leer un usuario en particular'
BEGIN
SELECT * from usuarios where id = id and usuario_baja is null;
END$$
DELIMITER ;