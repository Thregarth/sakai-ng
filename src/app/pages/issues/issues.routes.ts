import { Routes } from "@angular/router";
import { QueryComponent } from "./query/query.component";
import { NewComponent } from "./new/new.component";
import { ManagememtComponent } from "./managememt/managememt.component";
import { VendorAlertsComponent } from "./vendor-alerts/vendor-alerts.component";

export default [
    { path: 'query', data: { breadcrumb: 'Consulta de incidencias' }, component: QueryComponent },
    { path: 'new', data: { breadcrumb: 'Nueva Incidencia' }, component: NewComponent },
    { path: 'management', data: { breadcrumb: 'Nueva Incidencia' }, component: ManagememtComponent },
    { path: 'vendor-alerts', data: { breadcrumb: 'Avisos a Proveedor' }, component: VendorAlertsComponent },
    { path: '**', redirectTo: '/notfound' }
] as Routes