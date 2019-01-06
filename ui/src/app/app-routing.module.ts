import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadViewComponent } from "./views/upload-view/upload-view.component";
import { HomeViewComponent } from "./views/home-view/home-view.component";


const routes: Routes = [
  { path: '', component: HomeViewComponent, pathMatch: 'full' },
  { path: 'upload', component: UploadViewComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}


