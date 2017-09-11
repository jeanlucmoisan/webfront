import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';
import { DataSource } from '@angular/cdk/table';
import { MdPaginator } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { DepartmentService } from './department.service';
import { Department } from './../../models/department.model';
import { Link } from './../../models/link.model';
import { EditDepartmentComponent } from './edit/edit-department.component';

@Component({
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})

export class DepartmentComponent implements OnInit {
  
  deptLinks: Link[] = [];
  nodes: any[] = [];
  links: any[] = [];
  topDepartment:any = {};
  
  editing:boolean = false;
  editDepartment:any;

  // table var
  @ViewChild('filter') filter:ElementRef;
  @ViewChild(MdPaginator) paginator: MdPaginator;
  dataLength:Number = 0;
  dataSource: DepartmentDataSource|null;
  displayedColumns = ['name'];

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
  
  constructor(
    private departmentService: DepartmentService, 
    private translateService:TranslateService, 
    private router:Router,
    private route: ActivatedRoute) {
    }
    
  ngOnInit() {
    this.editing = false;
    this.editDepartment = {};
    const departmentDatabase:DepartmentDatabase = new DepartmentDatabase(this.departmentService);
    departmentDatabase.getDepartments()
      .subscribe(departments => {
        this.dataSource = new DepartmentDataSource(departmentDatabase, this.paginator);
        this.dataLength = departments.length;
      })

    Observable.fromEvent(this.filter.nativeElement, 'keyup')
    .debounceTime(150)
    .distinctUntilChanged()
    .subscribe(() => {
      if (!this.dataSource) { return; }
      this.dataSource.filter = this.filter.nativeElement.value;
      this.paginator.pageIndex = 0;
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

  editAndChangeTreeFocus(row:any) {
    if (!this.editing) {
      this.editing = true;
      this.editDepartment = row;
      //this.router.navigate([{ outlets: { 'edit-department-outlet':['edit-department',row._key]}}], { relativeTo: this.route });
      console.log('rowClick event for '+JSON.stringify(row));
      this.getDepartmentTreeByNode(row._key,'2');
    }
  }
  
  addNewDepartment() {
    if (!this.editing) {
      this.editing = true;
      this.editDepartment = {};
      //this.router.navigate([{ outlets: { 'edit-department-outlet':['edit-department','new']}}], { relativeTo: this.route });
      console.log('department creation');
    }
  }

  onBackFromEdit(event:Event) {
    this.editing = false;
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

export class DepartmentDatabase {

  // stream to emit data changes
  public dataChange: BehaviorSubject<Department[]> = new BehaviorSubject<Department[]>([]);
  get data(): Department[] {
    return this.dataChange.value;
  };

  // Fill up the local database with simplified json response
  getDepartments(): Observable<Department[]> {
    return this.departmentService.getAllDepartments()
      .map(this.extractDepartment);
  }

  extractDepartment(result:any[]):any[] {
    return result.map(_department=> {
      return {
        _key: _department._key,
        name: _department.name
      }
    })
  }

  // data change emission
  constructor(private departmentService: DepartmentService ) {
    this.getDepartments().subscribe(data => this.dataChange.next(data));
  }

}

export class DepartmentDataSource extends DataSource<Department> {

  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }
 
  constructor(private _departmentDatabase: DepartmentDatabase, private _paginator:MdPaginator) {
  //constructor(private _departmentDatabase: DepartmentDatabase) {
    super();
  }

  // Connect function called by the table to retrieve one stream containing the data to render.
  // dataChange is an observable from database collection
  connect(): Observable<Department[]> {
    var previousFilter = '';
    const displayDataChanges = [
      this._departmentDatabase.dataChange,
      this._filterChange,
      this._paginator.page
    ];

    return Observable.merge(...displayDataChanges)                  // convert object to array with spread syntax
      .map(() => {                                                  // data sent to observables depend on event, rather change in data, click on page...
      // data removed from viewed table
      const dataSlice = this._departmentDatabase.data.filter((dept) => {
        let searchStr = dept.name.toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) != -1 ;
      });
      this._paginator.length = dataSlice.length;
      var startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      // re-init table if filter change
      if (this.filter.toLowerCase() != previousFilter) {
        startIndex = 0;
        this._paginator.pageIndex = 0;        
        previousFilter = this.filter.toLowerCase();
      }
      return dataSlice.splice(startIndex, this._paginator.pageSize);
    });
  }

  disconnect() {
    this._filterChange.complete();
    this._filterChange.observers = [];
  }
}