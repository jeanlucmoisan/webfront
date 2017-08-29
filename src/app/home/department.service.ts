import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Department } from './../models/department.model';

@Injectable()
export class DepartmentService {

  constructor(private http: Http) { }

  getAllDepartments(): Observable<Department[]> {
    return this.http.get('/departments', { cache: true })
      .map((res: Response) => res.json())
      .catch(() => Observable.of('Error, could not load departments :-('));
  }

}
