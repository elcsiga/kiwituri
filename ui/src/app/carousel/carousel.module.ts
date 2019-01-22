import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from "./components/carousel/carousel.component";
import { CarouselService } from "./carousel.service";
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
    CarouselService
  ],
  exports: [
    CarouselComponent
  ]
})
export class CarouselModule { }
