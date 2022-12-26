export interface DataTransacciones {
    classRed:             boolean;
    codigoMovimiento:     string;
    codigoMovimientoText: string;
    cotARSvsBTC:          number;
    cuenta:               string;
    debe:                 number;
    fecha:                string;
    haber:                number;
    id:                   number;
    idUsuario:            number;
    imgCuenta:            string;
    monto:                number;
    signo:                string;
    booleanARS:           boolean;
}

export interface Portafolio {
    ars: number;
    btc: number;
    ars_img: string;
    btc_img: string;
}