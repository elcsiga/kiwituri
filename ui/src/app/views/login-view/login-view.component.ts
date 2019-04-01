import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {NotificationService} from "../../services/notification.service";
import {User} from '../../../../../server/src/common/interfaces/user';
import {HttpClient} from "@angular/common/http";
import {RouterUtilsService} from "../../services/router-utils.service";


@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.css']
})
export class LoginViewComponent {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private routerUtilsService: RouterUtilsService,
    private userService: UserService,
    private notificationService: NotificationService
  ) {

  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;
      this.http.post<User>('/api/auth/login', credentials)
        .subscribe(user => {
          this.userService.setUser(user);
          this.routerUtilsService.goBack('/');
        }, error => {
          this.notificationService.error('Nem jó az e-mail vagy a jelszó!');
          console.error(error);
        })
    } else {
      console.error('Trying to submit an invalid form...');
    }
  }

  navigateBack(event) {
    event.preventDefault();
    this.routerUtilsService.goBack('/');
  }

}
