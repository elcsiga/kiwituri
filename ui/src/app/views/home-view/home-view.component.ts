import { Component, OnInit } from '@angular/core';
import {ConfigService} from "../../services/config.service";

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css']
})
export class HomeViewComponent implements OnInit {

  constructor(
    private configService: ConfigService
  ) { }

  tldr$ = this.configService.getText('tldr');

  ngOnInit() {
  }

}
