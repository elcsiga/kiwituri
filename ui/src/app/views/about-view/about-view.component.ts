import { Component, OnInit } from '@angular/core';
import {ConfigService} from "../../services/config.service";

@Component({
  selector: 'app-about-view',
  templateUrl: './about-view.component.html',
  styleUrls: ['./about-view.component.css']
})
export class AboutViewComponent implements OnInit {

  constructor(
    private configService: ConfigService
  ) { }

  content$ = this.configService.getText('about');

  ngOnInit() {
  }

}
