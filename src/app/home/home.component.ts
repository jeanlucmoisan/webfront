import 'rxjs/add/operator/finally';

import { Component, OnInit } from '@angular/core';

import { ITdDataTableColumn } from '@covalent/core';

import { DepartmentService } from './department.service';
import { Department } from './../models/department.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  departments: Department[] = [];
  isLoading: boolean;
  columns: ITdDataTableColumn[] = [
    { name:'name', label:'dapartment'}
  ];
  
  constructor(private departmentService: DepartmentService) {}

  ngOnInit() {
    this.isLoading = true;
    this.departmentService.getAllDepartments()
      .finally(() => { this.isLoading = false; })
      .subscribe((departments:Department[]) => { this.departments = departments; });
  }

}
