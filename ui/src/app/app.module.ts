import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatCardModule,
  MatChipsModule,
  MatIconModule, MatInputModule,
  MatListModule, MatProgressBarModule, MatRadioModule,
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
import { FormModule } from "./form/form.module";
import { AboutViewComponent } from './views/about-view/about-view.component';

@NgModule({
  declarations: [
    AppComponent,
    UploadViewComponent,
    HomeViewComponent,
    AboutViewComponent
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
    FormModule,
    MatChipsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
