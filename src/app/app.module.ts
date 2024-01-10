import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ModelComponent } from './model/model.component';
import { PlatformComponent } from './view/platform/platform.component';
import { PlatformFormComponent } from './view/platform-form/platform-form.component';
import {AppRoutingModule} from "./app.routes";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PlatformService} from "./services/platform.service";
import { DashboardComponent } from './view/dashboard/dashboard.component';
import { PlatformDetailComponent } from './view/platform-detail/platform-detail.component';
import { NavigationColumnComponent } from './view/navigation-column/navigation-column.component';
import {ApiHeadersInterceptor} from "./conf/http-interceptor";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {LoginComponent} from "./view/login/login.component";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MainViewComponent} from "./view/main-view/main-view.component";
import {SignUpComponent} from "./view/sign-up/sign-up.component";
// import { MatFormFieldModule } from "@angular/material/form-field";

@NgModule({
  declarations: [
    AppComponent,
    ModelComponent,
    PlatformComponent,
    PlatformFormComponent,
    DashboardComponent,
    PlatformDetailComponent,
    NavigationColumnComponent,
    LoginComponent,
    MainViewComponent,
    SignUpComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    // MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule
  ],
  providers: [
    PlatformService,
    LoginComponent,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiHeadersInterceptor,
      multi: true,
    }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
