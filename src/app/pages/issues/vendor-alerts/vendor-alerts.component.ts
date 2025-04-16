import { Component,  } from '@angular/core';
import { Product, ProductService } from '../../service/product.service';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { GestionIncidenciaDto } from '../../dto/GestionIncidenciaDto';
import { ManagementIssuesService } from '../../service/managementissues.service';
import { PagedEnumerable } from '../../dto/PagedEnumerable';
import { Result } from '../../dto/Result';
import { SkeletonModule } from 'primeng/skeleton';
import { TooltipModule } from 'primeng/tooltip';

interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

interface ExportColumn {
  title: string;
  dataKey: string;
}

@Component({
  selector: 'app-vendor-alerts',
  imports: [TableModule, ButtonModule, CommonModule, SkeletonModule, TooltipModule],
  templateUrl: './vendor-alerts.component.html',
  styleUrl: './vendor-alerts.component.scss',
  providers: [ProductService,ManagementIssuesService],
})
export class VendorAlertsComponent {
  products: GestionIncidenciaDto[] = Array.from({ length: 3 }, () => new GestionIncidenciaDto());

  selectedProducts!: GestionIncidenciaDto[];

  constructor(private managementIssuesService: ManagementIssuesService) {}

  cols!: Column[];

  exportColumns!: ExportColumn[];

  isLoading = false;
  ngOnInit() {
    this.isLoading = true;
    const subscription = this.managementIssuesService.getIssuesList().subscribe((res: Result<PagedEnumerable<GestionIncidenciaDto[]>>) => {
      this.products = res.data.items;
      this.isLoading = false;
      subscription.unsubscribe();
    });

    
    
    this.cols = [
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
      

    this.exportColumns = this.cols.map((col) => ({
      title: col.header,
      dataKey: col.field,
    }));
  }
}


