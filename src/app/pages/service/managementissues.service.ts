import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GestionIncidenciaDto } from '../dto/GestionIncidenciaDto';
import { Result } from '../dto/Result';

@Injectable()
export class ManagementIssuesService{
    constructor(private http: HttpClient) {}

    getIssuesList(): Observable<Result<GestionIncidenciaDto[]>> {
        return this.http.post<Result<GestionIncidenciaDto[]>>('https://localhost:7063/ManagementIssue/GetAll', {});
    }

}


