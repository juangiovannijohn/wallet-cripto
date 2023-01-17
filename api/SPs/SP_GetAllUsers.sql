DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_GetAllUsers`()
    COMMENT 'SP para leer todos los usuarios'
BEGIN
    SELECT * FROM usuarios WHERE usuario_baja is null;
END$$
DELIMITER ;