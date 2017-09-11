//import { Component, OnInit, HostBinding } from '@angular/core';
import { Component, OnChanges, EventEmitter, Input, SimpleChange } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormControl } from '@angular/forms';

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
    //@HostBinding('@routerTransition')

    //public get childRouteTransition() { return this.route.snapshot;}

    public onBackEvent = new EventEmitter();
    departmentControl: FormControl = new FormControl();
    formTitle = 'Department';
    departmentModel:Department;

    //constructor(private router:Router, private route:ActivatedRoute) {}
    constructor(private departmentService:DepartmentService, private translateService:TranslateService) {}
    
    //ngOnInit() {
        //console.log('Entering edit-department');
        //this.route.params.subscribe((params:{id:string}) => {
        //});
    //}

    ngOnChanges(changes: {[propKey: string]:SimpleChange}) {
        const department = changes.department;
        if (!department) {
            this.formTitle = this.translateService.instant('DEPARTMENT.formTitleCreate');
        } else {
            this.formTitle = this.translateService.instant('DEPARTMENT.formTitleEdit');
        }
        if (department.currentValue.hasOwnProperty('_key')) {
            console.log('Edit-department ngOnChanges - Edited Department: '+JSON.stringify(department.currentValue));
            this.departmentService.getDepartment(department.currentValue['_key']).subscribe((department)=> {
                this.departmentModel = department
                console.log('Edit-department ngOnChanges - After get Department: '+JSON.stringify(this.departmentModel));
            });
        }
    }

    goBackToParent():void {
        this.onBackEvent.emit({
            value: true
        });
        //this.router.navigate(['/organization/department']);
    }
}
