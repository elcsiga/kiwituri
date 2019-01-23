import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CarouselComponent} from "./components/carousel/carousel.component";
import {SwiperModule} from "ngx-swiper-wrapper";
import {MatButtonModule, MatIconModule} from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    SwiperModule,
    MatIconModule,
    MatButtonModule
  ],
  declarations: [
    CarouselComponent,
  ],
  providers: [],
  exports: [
    CarouselComponent
  ]
})
export class CarouselModule {
}
