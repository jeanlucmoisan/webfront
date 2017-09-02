import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Department } from './../../models/department.model';
import { Link } from './../../models/link.model';

@Injectable()
export class DepartmentService {

  constructor(private http: Http) { }

  getAllDepartments(): Observable<Department[]> {
    return this.http.get('/departments', { cache: true })
      .map((res: Response) => res.json())
      .catch(() => Observable.of('Error, could not load departments :-('));
  }

  getDepartmentTree(node:string,level:string): Observable<any> {
    return this.http.get('/department/tree/'+node+'/'+level, { cache: true })
    .map((res: Response) => res.json())
    .catch(() => Observable.of('Error, could not load departments links :-('));
  }

  getTopDepartment(): Observable<Department> {
    return this.http.get('/department/property/topDepartment/1', { cache: true })
    .map((res: Response) => res.json())
    .catch(() => Observable.of('Error, could not load departments links :-('));
  }
}
