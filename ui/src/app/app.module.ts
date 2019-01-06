import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule } from "@angular/material";
import { AppRoutingModule } from './/app-routing.module';
import { UploadViewComponent } from './views/upload-view/upload-view.component';
import { HomeViewComponent } from './views/home-view/home-view.component';
import { HttpClientModule } from "@angular/common/http";
import { UploadModule } from "./upload/upload.module";

@NgModule({
  declarations: [
    AppComponent,
    UploadViewComponent,
    HomeViewComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    AppRoutingModule,
    UploadModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
