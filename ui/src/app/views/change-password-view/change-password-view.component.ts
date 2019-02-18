import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Location} from "@angular/common";
import {UserService} from "../../services/user.service";
import {NotificationService} from "../../services/notification.service";
import {ChangePasswordData, User} from "../../../../../server/src/common/interfaces/user";

@Component({
  selector: 'app-change-password-view',
  templateUrl: './change-password-view.component.html',
  styleUrls: ['./change-password-view.component.css']
})
export class ChangePasswordViewComponent implements OnInit {


  passwordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private location: Location,
    private userService: UserService,
    private notificationService: NotificationService
  ) {

  }

  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      newPasswordAgain: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.passwordForm.valid) {
      const changePasswordData: ChangePasswordData = this.passwordForm.value;
      this.http.post<User>('/api/auth/change-password', changePasswordData)
        .subscribe(user => {
          this.notificationService.info('Sikeres jelszóváltoztatás.');
          this.location.back();
        }, error => {
          const errorCode = error && error.error && error.error.error;
          if (errorCode === 'WRONG_OLD_PASSWORD') {
            this.notificationService.error('Hibás a régi jelszó!');
            this.passwordForm.controls['oldPassword'].setErrors({'incorrect': true});
          } else if (errorCode === 'PASSWORDS_NOT_MATCH') {
            this.notificationService.error('Nem egyezik a két új jelszó!');
            this.passwordForm.controls['newPasswordAgain'].setErrors({'incorrect': true});
          } else if (errorCode === 'PASSWORD_TOO_SHORT') {
            this.notificationService.error('A jelszó tűl rövid!');
            this.passwordForm.controls['newPassword'].setErrors({'incorrect': true});
          } else {
            this.notificationService.error('Sikertelen jelszóváltoztatás');
            console.error(error);
          }
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
