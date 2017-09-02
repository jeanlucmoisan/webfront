import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { OrganizationRoutingModule } from './organization-routing.module';
import { OrganizationComponent } from './organization.component';

import { DepartmentComponent } from './department/department.component';
import { DepartmentService } from './department/department.service';

import { CovalentMessageModule } from '@covalent/core';
import { CovalentDataTableModule } from '@covalent/core';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    OrganizationRoutingModule,
    CovalentMessageModule,
    CovalentDataTableModule
  ],
  declarations: [
    OrganizationComponent,
    DepartmentComponent
  ],
  providers: [
    DepartmentService
  ]
})
export class OrganizationModule { }
