import { Component, LOCALE_ID, computed, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { OnInit } from '@angular/core';
import { ManagementIssuesService } from '../../service/managementissues.service';
import { GestionIncidenciaDto } from '../../dto/GestionIncidenciaDto';
import { Result } from '../../dto/Result';
import { TooltipModule } from 'primeng/tooltip';
import { CommonModule, registerLocaleData} from '@angular/common';
import localeEs from '@angular/common/locales/es'
import { SkeletonModule } from 'primeng/skeleton';
import { LayoutService } from '../../../layout/service/layout.service';


registerLocaleData(localeEs, 'es');

@Component({
  selector: 'app-managememt',
  imports: [TableModule, TooltipModule,  SkeletonModule, CommonModule],
  templateUrl: './managememt.component.html',
  styleUrl: './managememt.component.scss',
  providers:[ManagementIssuesService,{ provide: LOCALE_ID, useValue: 'es' }]
})
  export class ManagememtComponent implements OnInit {

    // issues: GestionIncidenciaDto[] = [];
    issues: GestionIncidenciaDto[] = Array.from({ length: 3 }, () => new GestionIncidenciaDto());
    isLoading: boolean = false;

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
      const subscription = this.managementIssuesService.getIssuesList().subscribe((res: Result<GestionIncidenciaDto[]>) => {
        this.issues = res.data;
        this.isLoading = false;
        subscription.unsubscribe();
      });
    }

    getMaxWidth(): string {
      return this.layoutService.isOverlay() ? 'calc(100vw - 100px)' : 'calc(100vw - 420px)';
    }
  }

