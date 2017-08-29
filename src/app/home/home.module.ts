import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { DepartmentService } from './department.service';

import { CovalentMessageModule } from '@covalent/core';
import { CovalentDataTableModule } from '@covalent/core';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    HomeRoutingModule,
    CovalentMessageModule,
    CovalentDataTableModule
  ],
  declarations: [
    HomeComponent
  ],
  providers: [
    DepartmentService
  ]
})
export class HomeModule { }
