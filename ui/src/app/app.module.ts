import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatChipsModule,
  MatIconModule, MatInputModule,
  MatListModule, MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatToolbarModule
} from "@angular/material";
import { AppRoutingModule } from './app-routing.module';
import { UploadViewComponent } from './views/upload-view/upload-view.component';
import { HomeViewComponent } from './views/home-view/home-view.component';
import { HttpClientModule } from "@angular/common/http";
import { UploadModule } from "./upload/upload.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";

@NgModule({
  declarations: [
    AppComponent,
    UploadViewComponent,
    HomeViewComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    AppRoutingModule,
    UploadModule,
    MatChipsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
