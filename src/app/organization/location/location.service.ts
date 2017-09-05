import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Location } from './../../models/location.model';
import { Link } from './../../models/link.model';

@Injectable()
export class LocationService {

  constructor(private http: Http) { }

  getAllLocations(): Observable<Location[]> {
    return this.http.get('/locations', { cache: true })
      .map((res: Response) => res.json())
      .catch(() => Observable.of('Error, could not load locations :-('));
  }
}
