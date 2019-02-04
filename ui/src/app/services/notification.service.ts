import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig, MatSnackBarModule} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private config: MatSnackBarConfig = {
    duration: 3000,
  };

  constructor(
    private snackBar: MatSnackBar
  ) {
  }

  info( message: string ) {
    this.snackBar.open(message, null, this.config);
  }

  error( message: string ) {
    //TODO
    this.snackBar.open( message, null, this.config);
  }
}
