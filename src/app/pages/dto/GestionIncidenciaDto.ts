export class GestionIncidenciaDto {
    idIncidencia?: number;
    fechaIncidencia?: Date;
    equipo?: string;
    estado?: string;
    usuarioAfectado?: string;
    usuarioAsignado?: string;
    nivel2?: string;
    nivel1?: string;
    descripcion?: string;
    resolucionIncidencia?: string;
    fecCierre?: Date;
}
