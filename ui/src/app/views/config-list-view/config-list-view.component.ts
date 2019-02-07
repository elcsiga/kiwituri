import { Component, OnInit } from '@angular/core';
import {ConfigService} from "../../services/config.service";

@Component({
  selector: 'app-config-list-view',
  templateUrl: './config-list-view.component.html',
  styleUrls: ['./config-list-view.component.css']
})
export class ConfigListViewComponent implements OnInit {

  configs$ = this.configService.configs$;

  constructor(
    private configService: ConfigService,
  ) { }

  ngOnInit() {

  }


}
