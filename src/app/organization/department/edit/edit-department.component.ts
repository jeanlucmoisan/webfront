import { Component, OnInit, HostBinding, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { routerTransition } from '../../../shared/router.animations';

import { DepartmentService } from './../department.service';
import { Department } from './../../../models/department.model';
import { Link } from './../../../models/link.model';

@Component({
    selector:'edit-department',
    templateUrl: './edit-department.component.html',
    styleUrls: ['./edit-department.component.scss'],
    animations: [routerTransition],
    outputs: ['onBackEvent']
})

export class EditDepartmentComponent implements OnInit {

    @HostBinding('@routerTransition')

    public get childRouteTransition() { return this.route.snapshot;}

    public onBackEvent = new EventEmitter();

    constructor(private router:Router, private route:ActivatedRoute) {}

    ngOnInit() {
        console.log('Entering edit-department');
        this.route.params.subscribe((params:{id:string}) => {
        });
    }

    goBackToParent():void {
        this.onBackEvent.emit({
            value: true
        });
        this.router.navigate(['/organization/department']);
    }
}
