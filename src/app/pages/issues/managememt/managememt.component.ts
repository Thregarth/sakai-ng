import { Component, LOCALE_ID, ViewChild, computed, signal, viewChild } from '@angular/core';
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
import * as xlsx from 'xlsx'
import * as FileSaver from 'file-saver';
import { dt } from '@primeng/themes';


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
    { field: 'idIncidencia', header: 'ID Incidencia',},
    { field: 'fechaIncidencia', header: 'Fecha Incidencia '},
    { field: 'equipo', header: 'Equipo' },
    { field: 'estado', header: 'Estado' },
    { field: 'usuarioAfectado', header: 'Usuario Afectado' },
    { field: 'usuarioAsignado', header: 'Usuario Asignado' },
    { field: 'nivel1', header: 'Nivel 1' },
    { field: 'nivel2', header: 'Nivel 2' },
    { field: 'descripcion', header: 'Descripción' },
    { field: 'resolucionIncidencia', header: 'Resolución'},
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
      try {
        this.issues = res.data.items;
      } catch (error) {
        console.error('Error al obtener la lista de incidencias', error);
      }
      this.isLoading = false;
      subscription.unsubscribe();
    });
  }

  getMaxWidth(): string {
    return this.layoutService.isOverlay() ? 'calc(100vw - 100px)' : 'calc(100vw - 420px)';
  }
  exportExcel() {
   
      const worksheet: xlsx.WorkSheet = xlsx.utils.json_to_sheet(
          this.dt.filteredValue ? this.dt.filteredValue : this.issues
      );
      this.issues.forEach((issue, index) => {
        const rowIndex = index + 2; // Assuming the header is in the first row
        [`B${rowIndex}`, `K${rowIndex}`].forEach(element => {
          if (worksheet[element]) {
            worksheet[element].t = 'd';
            worksheet[element].z = 'dd/mm/yyyy HH:mm';
          }  
        });
      });
      const workbook:xlsx.WorkBook = {
          Sheets: { data: worksheet },
          SheetNames: ['data'],
      };
      const excelBuffer: any = xlsx.write(workbook, {
          bookType: 'xlsx',
          type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'movies');

  }
  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE,
    });
    FileSaver.saveAs(
        data,
        fileName + '_' + new Date().getTime() + EXCEL_EXTENSION
    );  
  }
}

