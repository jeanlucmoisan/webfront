//import { Component, OnInit, HostBinding } from '@angular/core';
import { Component, OnChanges, EventEmitter, Input, SimpleChange } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

//import { Router, ActivatedRoute } from '@angular/router';
//import { routerTransition } from '../../../shared/router.animations';

import { DepartmentService } from './../department.service';
import { Department } from './../../../models/department.model';
import { Link } from './../../../models/link.model';

@Component({
    selector:'edit-department',
    templateUrl: './edit-department.component.html',
    styleUrls: ['./edit-department.component.scss'],
    //animations: [routerTransition],
    outputs: ['onBackEvent']
})

export class EditDepartmentComponent implements OnChanges {

    @Input() department:any;
    @Input() departmentList:EditDepartmentModel[];
    //@HostBinding('@routerTransition')

    //public get childRouteTransition() { return this.route.snapshot;}

    public onBackEvent = new EventEmitter();
    departmentControl: FormControl = new FormControl();
    attachedToControl: FormControl = new FormControl();
    formTitle = 'Department';
    editDepartmentModel:EditDepartmentModel = new EditDepartmentModel('','','');
    attachedToDepartment:EditDepartmentModel = new EditDepartmentModel('','','');
    //options = [new EditDepartmentModel('1','one','xxx'),new EditDepartmentModel('2','two','yyy')];
    filteredOptions: Observable<EditDepartmentModel[]>;

    //constructor(private router:Router, private route:ActivatedRoute) {}
    constructor(private departmentService:DepartmentService, private translateService:TranslateService) {
    }
    
    //ngOnInit() {
        //console.log('Entering edit-department');
        //this.route.params.subscribe((params:{id:string}) => {
        //});
    //}

    ngOnChanges(changes: {[propKey: string]:SimpleChange}) {
        this.filteredOptions = this.attachedToControl.valueChanges
            .startWith(null)
            .map(attachedToDepartment => attachedToDepartment && typeof attachedToDepartment === 'object' ? attachedToDepartment.name : attachedToDepartment)
            .map(name => name ? this.filter(name) : this.departmentList.slice());
        const department = changes.department;
        if (!department) {
            this.formTitle = this.translateService.instant('DEPARTMENT.formTitleCreate');
        } else {
            this.formTitle = this.translateService.instant('DEPARTMENT.formTitleEdit');
        }
        if (department.currentValue.hasOwnProperty('_key')) {
            console.log('Edit-department ngOnChanges - Edited Department: '+JSON.stringify(department.currentValue));
            this.departmentService.getDepartment('id',department.currentValue['_key']).subscribe((departments)=> {
                console.log('department received from API '+JSON.stringify(departments));
                this.editDepartmentModel = <EditDepartmentModel>departments[0];
                for (let i=0;i<this.departmentList.length;i++) {
                    if (this.departmentList[i]._id === this.editDepartmentModel.attachedTo) 
                        // kind of deep copy
                        this.attachedToDepartment = new EditDepartmentModel(this.departmentList[i]._id,this.departmentList[i].name,'');
                }
                console.log('Edit-department ngOnChanges - After get Department: '+ JSON.stringify(this.editDepartmentModel));
            });
        }
    }

    private goBackToParent():void {
        this.onBackEvent.emit({
            value: true
        });
        //this.router.navigate(['/organization/department']);
    }

    private filter(name:string): EditDepartmentModel[] {
        return this.departmentList.filter(option => option.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
    }

    private displayFn(value: any): string {
        return value && typeof value === 'object' ? value.name : value;
    }

    private selectedParent(department:EditDepartmentModel) {
        this.editDepartmentModel.attachedTo = department._id;
        console.log('Edit-department attachedTo updated with '+ department._id);
    }

    private save() {
        console.log('Edit-department save clicked');
    }
}

export class EditDepartmentModel {
    _id: string;
    name: string;
    attachedTo: string;

    constructor($id:string, $name:string, $attachedTo:string) {
        this._id = $id;
        this.name = $name;
        this.attachedTo = $attachedTo;
    }
}