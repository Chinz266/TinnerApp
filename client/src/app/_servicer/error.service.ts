import { error, t } from 'elysia';
import { NavigationExtras, Router } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { MatSnackBar,MatSnackBarConfig } from '@angular/material/snack-bar';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  private router = inject(Router)
  private snackbaBar = inject(MatSnackBar)
  private snackBarConfig: MatSnackBarConfig = {
    horizontalPosition: 'right',
    verticalPosition: 'top',
  }
  constructor() { }

  handelError(err: any) {
    if (err) {
      switch (err.status) {
        case 400:
          this.snackbaBar.open('Bad Request', 'OK', this.snackBarConfig)
          break
        case 404:
          this.router.navigate(['/404'])
          break
        case 500:
        case 501:
        case 502:
        case 503:
        case 504:
        case 505:
        case 506:
        case 507:
        case 508:
        case 509:
        case 510:
        case 511:
          if (err.error.message === 'Token has expired'){
            this.router.navigate(['/'])
          }
          const navExtras : NavigationExtras ={
            state: {
              massage: err.error,
              code: err.status
            }
          }
          this.router.navigate(['/server-error'],navExtras)
          break;
        default:
          this.snackbaBar.open('something went wrong please try again', 'OK', this.snackBarConfig)
          break;
      }
    }
    return throwError(() => err)
  }
}
