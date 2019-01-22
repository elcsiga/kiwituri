import { Component, OnInit } from '@angular/core';
import { SwiperConfigInterface } from "ngx-swiper-wrapper";
import { CarouselImage, CarouselService } from "../../carousel.service";
import { Observable } from "rxjs/index";

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  swiperConfig: SwiperConfigInterface  = {
    direction: 'horizontal',
    slidesPerView: 'auto'
  };

  index = 0;

  images$: Observable<CarouselImage[]> = this.carouselServce.images$;

  constructor(
    private carouselServce: CarouselService
  ) { }

  ngOnInit() {
  }


}
