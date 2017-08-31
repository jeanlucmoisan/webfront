import 'rxjs/add/operator/finally';

import { Component, OnInit } from '@angular/core';

import { TdDataTableService, ITdDataTableColumn, IPageChangeEvent } from '@covalent/core';

import { DepartmentService } from './department.service';
import { Department } from './../models/department.model';
import { Link } from './../models/link.model';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})

export class OrganizationComponent implements OnInit {
  
  departments: Department[] = [];
  deptLinks: Link[] = [];
  nodes: any[] = [];
  links: any[] = [];
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

  // graph options
  chartType = 'directed-graph';
  chartGroups: any;
  chart: any;
  view: any[];
  autoZoom: boolean = false;
  showLegend = false;
  orientation: string = 'TB'; // LR, RL, TB, BT
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  

  constructor(private departmentService: DepartmentService, private _dataTableService: TdDataTableService) {
  }

  ngOnInit() {
    this.isLoading = true;
    this.departmentService.getAllDepartments()
      .finally(() => { this.isLoading = false; })
      .subscribe((departments:Department[]) => { 
        this.departments = departments;
        this.nodes = [];
        for (var i=0;i<departments.length;i++) {
          var node = {'id':'','label':''};
          node.id = departments[i]._key.replace(/[^\w]*/g, '');
          node.label = departments[i].name;
          this.nodes.push(node);
        }
        this.nodes = [...this.nodes];
        this.filter();
      });
      this.departmentService.getAllDepartmentLinks()
      .finally(() => { this.isLoading = false; })
      .subscribe((deptLinks:any[]) => { 
        this.links = [];
        for (var i=0;i<deptLinks.length;i++) {
          var link: any = {};
          link.source = deptLinks[i].target.replace(/[^\w]*/g, '');
          link.target = deptLinks[i].source.replace(/[^\w]*/g, '');
          link.label = '';
          this.links.push(link);
        }
        this.links = [...this.links];
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
