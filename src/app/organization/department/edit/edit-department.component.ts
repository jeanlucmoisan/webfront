import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { DepartmentService } from './../department.service';
import { Department } from './../../../models/department.model';
import { Link } from './../../../models/link.model';

@Component({
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.scss']
})

export class EditDepartmentComponent implements OnInit {
    constructor() {}

    ngOnInit() {
        console.log('Entering edit-department');
    }

}
