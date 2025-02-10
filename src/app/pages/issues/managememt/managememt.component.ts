import { Component, LOCALE_ID, } from '@angular/core';
import { TableModule } from 'primeng/table';
import { OnInit } from '@angular/core';
import { ManagementIssuesService } from '../../service/managementissues.service';
import { GestionIncidenciaDto } from '../../dto/GestionIncidenciaDto';
import { Result } from '../../dto/Result';
import { TooltipModule } from 'primeng/tooltip';
import { DatePipe } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es'

registerLocaleData(localeEs, 'es');

@Component({
  selector: 'app-managememt',
  imports: [TableModule, TooltipModule, DatePipe],
  templateUrl: './managememt.component.html',
  styleUrl: './managememt.component.scss',
  providers:[ManagementIssuesService,{ provide: LOCALE_ID, useValue: 'es' }]
})
  export class ManagememtComponent implements OnInit {
    issues: GestionIncidenciaDto[] = [];

    constructor(private managementIssuesService: ManagementIssuesService) {}

    ngOnInit() {
      this.getIssuesList();
    }

    getIssuesList() {
      const subscription = this.managementIssuesService.getIssuesList().subscribe((res: Result<GestionIncidenciaDto[]>) => {
        this.issues = res.data;
        subscription.unsubscribe();
      });
    }
  }

