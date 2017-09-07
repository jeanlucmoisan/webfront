import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { AgmCoreModule } from '@agm/core';

import { OrganizationRoutingModule } from './organization-routing.module';
import { OrganizationComponent } from './organization.component';
import { DepartmentComponent } from './department/department.component';
import { DepartmentService } from './department/department.service';
import { EditDepartmentComponent } from './department/edit/edit-department.component';
import { LocationComponent } from './location/location.component';
import { LocationService } from './location/location.service';

/* import { CovalentMessageModule } from '@covalent/core';
import { CovalentDataTableModule } from '@covalent/core';
 */
@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    RouterModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    AgmCoreModule,
    OrganizationRoutingModule,
//    CovalentMessageModule,
//    CovalentDataTableModule
  ],
  declarations: [
    OrganizationComponent,
    DepartmentComponent,
    EditDepartmentComponent,
    LocationComponent
  ],
  providers: [
    DepartmentService,
    LocationService
  ]
})
export class OrganizationModule { }
