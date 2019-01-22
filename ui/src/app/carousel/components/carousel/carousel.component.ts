import {Component, Input, OnInit} from '@angular/core';
import { SwiperConfigInterface } from "ngx-swiper-wrapper";

export interface CarouselImage {
  url: string;
}
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

  @Input() images: CarouselImage[];

  constructor(
  ) { }

  ngOnInit() {
  }


}
