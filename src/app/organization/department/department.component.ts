import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';
import { DataSource } from '@angular/cdk/table';
import { MdPaginator } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';

import { DepartmentService } from './department.service';
import { Department } from './../../models/department.model';
import { Link } from './../../models/link.model';

@Component({
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})

export class DepartmentComponent implements OnInit {
  
  deptLinks: Link[] = [];
  nodes: any[] = [];
  links: any[] = [];
  topDepartment:any = {};
  
  // table var
  @ViewChild('filter') filter:ElementRef;
  @ViewChild(MdPaginator) paginator: MdPaginator;
  departmentDatabase:DepartmentDatabase|null;
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
    this.departmentDatabase = new DepartmentDatabase(this.departmentService);
    this.dataSource = new DepartmentDataSource(this.departmentDatabase, this.paginator);

    Observable.fromEvent(this.filter.nativeElement, 'keyup')
    .debounceTime(150)
    .distinctUntilChanged()
    .subscribe(() => {
      if (!this.dataSource) { return; }
      this.dataSource.filter = this.filter.nativeElement.value;
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

  editAndChangeTreeFocus(event:any) {
    //this.router.navigate(['organization',{ outlets: { 'edit-department-outlet':['edit-department',event.row._key]}}]);
    this.router.navigate(['../edit-department',event.row._key], { relativeTo: this.route});
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

export class DepartmentDatabase {
  pageLength: number = 0;  
  constructor(private departmentService: DepartmentService ) {
  }
  // Fill up the database with json response
  getDepartments(): Observable<Department[]> {
    return this.departmentService.getAllDepartments().map(this.extractDepartment);
  }

  extractDepartment(result:any[]):any[] {
    this.pageLength = result.length;
    console.log(this.pageLength);
    return result.map(_department=> {
      return {
        _key: _department._key,
        name: _department.name
      }
    })
  }
}

export class DepartmentDataSource extends DataSource<Department> {
  subject: BehaviorSubject<Department[]> = new BehaviorSubject([]);
  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }

  constructor(private _departmentDatabase: DepartmentDatabase, private _paginator:MdPaginator) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<any[]> {
    const displayDataChanges = [
      this.subject,
      this._filterChange,
      this._paginator.page
    ];

    // TO DO find a way to get page and update data stream like in
    // https://stackoverflow.com/questions/45014257/how-to-use-md-table-with-services-in-angular-4
    Observable.merge(...displayDataChanges).subscribe((d) => {
      console.log(JSON.stringify(d));
      this._departmentDatabase.getDepartments()
      .map((departments)=> departments.filter((dept) => {
        let searchStr = dept.name.toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) != -1 ;
      })).subscribe((departments)=>{
        this.subject.next(departments);
      })
    });

    // init
    if (!this.subject.isStopped)
      this._departmentDatabase.getDepartments().subscribe((departments)=>this.subject.next(departments));

    return Observable.merge(this.subject);
  }

  disconnect() {
    this.subject.complete();
    this.subject.observers = [];
  }
}