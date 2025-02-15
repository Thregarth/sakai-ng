import { Component, LOCALE_ID, ViewChild, computed, signal } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { OnInit } from '@angular/core';
import { ManagementIssuesService } from '../../service/managementissues.service';
import { GestionIncidenciaDto } from '../../dto/GestionIncidenciaDto';
import { Result } from '../../dto/Result';
import { TooltipModule } from 'primeng/tooltip';
import { CommonModule, registerLocaleData} from '@angular/common';
import localeEs from '@angular/common/locales/es'
import { SkeletonModule } from 'primeng/skeleton';
import { LayoutService } from '../../../layout/service/layout.service';
import { PagedEnumerable } from '../../dto/PagedEnumerable';
import { ButtonModule } from 'primeng/button';


registerLocaleData(localeEs, 'es');

@Component({
  selector: 'app-managememt',
  imports: [TableModule, TooltipModule,  SkeletonModule, CommonModule, ButtonModule],
  templateUrl: './managememt.component.html',
  styleUrl: './managememt.component.scss',
  providers:[ManagementIssuesService,{ provide: LOCALE_ID, useValue: 'es' }]
})
  export class ManagememtComponent implements OnInit {

    @ViewChild('dt') dt!: Table;

    // issues: GestionIncidenciaDto[] = [];
    issues: GestionIncidenciaDto[] = Array.from({ length: 3 }, () => new GestionIncidenciaDto());
    isLoading: boolean = false;
    cols = [
      { field: 'idIncidencia', header: 'ID Incidencia', customExportHeader: 'Incidencia ID' },
      { field: 'fechaIncidencia', header: 'Fecha Incidencia', customExportHeader: 'Fecha' },
      { field: 'equipo', header: 'Equipo' },
      { field: 'estado', header: 'Estado' },
      { field: 'usuarioAfectado', header: 'Usuario Afectado', customExportHeader: 'Afectado' },
      { field: 'usuarioAsignado', header: 'Usuario Asignado', customExportHeader: 'Asignado' },
      { field: 'nivel1', header: 'Nivel 1' },
      { field: 'nivel2', header: 'Nivel 2' },
      { field: 'descripcion', header: 'Descripción' },
      { field: 'resolucionIncidencia', header: 'Resolución', customExportHeader: 'Resolución Final' },
      { field: 'fecCierre', header: 'Fecha Cierre' },
    ];

    maxWidth = computed(() => {
      return this.layoutService.layoutState().staticMenuDesktopInactive
        ? 'calc(100vw - 115px)'  // Si el menú está colapsado
        : 'calc(100vw - 420px)'; // Si el menú está expandido
    });

    constructor(private managementIssuesService: ManagementIssuesService, private layoutService: LayoutService) {}

    ngOnInit() {
      this.getIssuesList();
    }

    getIssuesList() {
      this.isLoading = true;
      const subscription = this.managementIssuesService.getIssuesList().subscribe((res: Result<PagedEnumerable<GestionIncidenciaDto[]>>) => {
        this.issues = res.data.items;
        this.isLoading = false;
        subscription.unsubscribe();
      });
    }

    getMaxWidth(): string {
      return this.layoutService.isOverlay() ? 'calc(100vw - 100px)' : 'calc(100vw - 420px)';
    }
    exportCSV(){
    if(this.dt){
      this.dt.exportCSV({selectionOnly: false , allValues: true});
    } else {
      console.log("No se ha podido exportar el archivo CSV");
    }
  }
}

