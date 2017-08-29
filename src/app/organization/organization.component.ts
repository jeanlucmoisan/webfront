import 'rxjs/add/operator/finally';

import { Component, OnInit } from '@angular/core';

import { TdDataTableService, ITdDataTableColumn, IPageChangeEvent } from '@covalent/core';

import { DepartmentService } from './department.service';
import { Department } from './../models/department.model';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements OnInit {

  departments: Department[] = [];
  isLoading: boolean;
  columns: ITdDataTableColumn[] = [
    { name:'name', label:'department'}
  ];
  filteredData: any[] = this.departments;
  filteredTotal: number = this.departments.length;
  currentPage: number = 1;
  pageSize: number = 5;
  searchTerm: string = '';
  fromRow: number = 1;

  constructor(private departmentService: DepartmentService, private _dataTableService: TdDataTableService) {}

  ngOnInit() {
    this.isLoading = true;
    this.departmentService.getAllDepartments()
      .finally(() => { this.isLoading = false; })
      .subscribe((departments:Department[]) => { 
        this.departments = departments;
        this.filter();
      });
  }

  page(pagingEvent: IPageChangeEvent): void {
    this.fromRow = pagingEvent.fromRow;
    this.currentPage = pagingEvent.page;
    this.pageSize = pagingEvent.pageSize;
    this.filter();
  }

  filter(): void {
    let newData: any[] = this.departments;
    let excludedColumns: string[] = this.columns
    .filter((column: ITdDataTableColumn) => {
      return ((column.filter === undefined && column.hidden === true) ||
              (column.filter !== undefined && column.filter === false));
    }).map((column: ITdDataTableColumn) => {
      return column.name;
    });
    newData = this._dataTableService.filterData(newData, this.searchTerm, true, excludedColumns);
    this.filteredTotal = newData.length;
    newData = this._dataTableService.pageData(newData, this.fromRow, this.currentPage * this.pageSize);
    this.filteredData = newData;
  }
}
