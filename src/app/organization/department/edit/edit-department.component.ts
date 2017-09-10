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
    //departmentModel:Department;

    //constructor(private router:Router, private route:ActivatedRoute) {}
    constructor(private departmentService:DepartmentService) {}

    //ngOnInit() {
        //console.log('Entering edit-department');
        //this.route.params.subscribe((params:{id:string}) => {
        //});
    //}

    ngOnChanges(changes: {[propKey: string]:SimpleChange}) {
        console.log('Department '+JSON.stringify(changes));
//        const department = changes.currentValue;
//        if (department.currentValue('_key'))
//            this.departmentService.getDepartment(department['_key']).subscribe((department)=>this.departmentModel = department);
    }

    goBackToParent():void {
        this.onBackEvent.emit({
            value: true
        });
        //this.router.navigate(['/organization/department']);
    }
}
