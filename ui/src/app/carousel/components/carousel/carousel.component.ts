import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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

  swiperConfigMultiple: SwiperConfigInterface  = {
    slidesPerView: 1,
    keyboard: true,
    mousewheel: true,
    scrollbar: false,
    navigation: true,
    pagination: true,
    spaceBetween: 10
  };

  swiperConfigSingle: SwiperConfigInterface  = {
    slidesPerView: 1,
  };

  @Input() images: CarouselImage[];
  @Input() index: number;
  @Output() close = new EventEmitter<void>();

  constructor(
  ) { }

  ngOnInit() {
  }

  onClose() {
    this.close.emit();
  }


}
