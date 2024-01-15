import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private readonly matSnackBar = inject(MatSnackBar);

  toggleSnackbar(message: string) {
    this.matSnackBar.open(message, '', {
      duration: 10000,
      horizontalPosition: 'right',
    });
  }
}
