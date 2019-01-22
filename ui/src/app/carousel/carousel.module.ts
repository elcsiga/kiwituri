import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from "./components/carousel/carousel.component";
import { SwiperModule } from "ngx-swiper-wrapper";

@NgModule({
  imports: [
    CommonModule,
    SwiperModule
  ],
  declarations: [
    CarouselComponent,
  ],
  providers: [
  ],
  exports: [
    CarouselComponent
  ]
})
export class CarouselModule { }
