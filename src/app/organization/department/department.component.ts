import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { TdDataTableService, ITdDataTableColumn, IPageChangeEvent } from '@covalent/core';

import { DepartmentService } from './department.service';
import { Department } from './../../models/department.model';
import { Link } from './../../models/link.model';

@Component({
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})

export class DepartmentComponent implements OnInit {
  
  departments: Department[] = [];
  deptLinks: Link[] = [];
  nodes: any[] = [];
  links: any[] = [];
  topDepartment:any = {};

  // layout
  tableWidth:Number;
  editWidth:Number;
  tableDisplay:Number;
  editDisplay:Number;

  //dataTable options
  columns: ITdDataTableColumn[] = [
    { name:'name', label:'departments'}
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
  

  constructor(private departmentService: DepartmentService, private _dataTableService: TdDataTableService, private translateService:TranslateService) {
  }

  ngOnInit() {
    this.tableWidth = 100;
    this.editWidth = 0;
    this.tableDisplay = 1;
    this.editDisplay = 0;

    this.columns[0].label = this.translateService.instant('DEPARTMENT.departments');
    this.departmentService.getAllDepartments()
      .subscribe((departments:Department[]) => { 
        this.departments = departments;
        this.filter();
      });
      this.departmentService.getTopDepartment()
      .first()
      .subscribe(val => {
        console.log('Top department is '+JSON.stringify(val));
        this.topDepartment = val[0];
        if (this.topDepartment._key) {
          this.getDepartmentTreeByNode(this.topDepartment._key,'2');
        }
      },err=>{
        console.log('Error retrieving top department '+JSON.stringify(err));
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

  editAndChangeTreeFocus(event:any) {
    this.tableWidth = 50;
    this.editWidth = 100;
    this.tableDisplay = 0;
    this.editDisplay = 1;

    console.log('rowClick event for '+JSON.stringify(event));
    this.getDepartmentTreeByNode(event.row._key,'2');
  }

  getDepartmentTreeByNode(node:string,level:string) {
    return this.departmentService.getDepartmentTree(node,level)
    .subscribe(response => { 
      this.nodes = [];
      for (var i=0;i<response.vertices.length;i++) {
        var node = {'id':'','label':''};
        node.id = response.vertices[i]._key.replace(/[^\w]*/g, '');
        node.label = response.vertices[i].name;
        this.nodes.push(node);
      }
      this.nodes = [...this.nodes];
      this.links = [];
      for (var i=0;i<response.links.length;i++) {
        var link: any = {};
        link.source = response.links[i].target.replace(/[^\w]*/g, '');
        link.target = response.links[i].source.replace(/[^\w]*/g, '');
        link.label = '';
        this.links.push(link);
      }
      this.links = [...this.links];
    },
    err => {
      console.log('Error retrieving department tree '+JSON.stringify(err));
    });
  }
}
