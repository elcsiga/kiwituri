import { Component, OnInit } from '@angular/core';
import { ConfigService } from "../../services/config.service";

@Component({
  selector: 'app-config-view',
  templateUrl: './config-view.component.html',
  styleUrls: ['./config-view.component.css']
})
export class ConfigViewComponent implements OnInit {

  config$ = this.coofigService.config$;

  constructor(
    private coofigService: ConfigService
  ) { }

  ngOnInit() {
  }

}
