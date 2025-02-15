import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GestionIncidenciaDto } from '../dto/GestionIncidenciaDto';
import { Result } from '../dto/Result';
import { PagedEnumerable } from '../dto/PagedEnumerable';

@Injectable()
export class ManagementIssuesService{
    constructor(private http: HttpClient) {}

    getIssuesList(): Observable<Result<PagedEnumerable<GestionIncidenciaDto[]>>> {
        return this.http.post<Result<PagedEnumerable<GestionIncidenciaDto[]>>>('https://localhost:7063/ManagementIssue/GetAll', {size:100030});
    }

}


