import {Component, OnDestroy, OnInit} from '@angular/core';
import { ConfigService } from "../../services/config.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Location} from "@angular/common";
import {UserService} from "../../services/user.service";
import {NotificationService} from "../../services/notification.service";
import {combineLatest, Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-config-edit-view',
  templateUrl: './config-view.component.html',
  styleUrls: ['./config-view.component.css']
})
export class ConfigEditViewComponent implements OnInit, OnDestroy {

  config$ = combineLatest(
    this.configService.configs$,
    this.activatedRoute.paramMap
  ).pipe(map( ([configs, params]) => configs.find( config => config.key === params.get('key'))));

  configForm: FormGroup;
  title: string;
  sub: Subscription;

  constructor(
    private configService: ConfigService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private http: HttpClient,
    private location: Location,
    private userService: UserService,
    private notificationService: NotificationService
  ) {

  }

  ngOnInit(): void {
    this.configForm = this.fb.group({
      key: ['', []],
      value: ['', []]
    });
    this.sub = this.config$.subscribe(config => {
      this.configForm.controls['key'].setValue( config ? config.key : '');
      this.configForm.controls['value'].setValue( config ? config.value : '');
      this.title = config ? config.title : '';
    } );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSubmit() {
    if (this.configForm.valid) {
      const key = this.configForm.value.key;
      const value = this.configForm.value.value;
      this.http.put('/api/config/'+key, { config: value } )
        .subscribe(user => {
          this.configService.load();
          this.location.back();
        }, error => {
          this.notificationService.error('Nem sikerült a mentés');
          console.error(error);
        })
    } else {
      console.error('Trying to submit an invalid form...');
    }
  }

  navigateBack(event) {
    event.preventDefault();
    this.location.back();
  }
}
