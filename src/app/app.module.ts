import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//import { CovalentLayoutModule, CovalentStepsModule /*, any other modules */ } from '@covalent/core';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { AgmCoreModule } from '@agm/core';
import APIKey from './../assets/gmapAPIkey.json';

import { HomeModule } from './home/home.module';
import { OrganizationModule } from './organization/organization.module';
import { AboutModule } from './about/about.module';
import { LoginModule } from './login/login.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot(),
//    CovalentLayoutModule,
//    CovalentStepsModule,
    CoreModule,
    SharedModule,
    AgmCoreModule.forRoot({
      apiKey:APIKey.APIKey
    }),
    HomeModule,
    OrganizationModule,
    AboutModule,
    LoginModule,
    AppRoutingModule
  ],
  declarations: [AppComponent],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
