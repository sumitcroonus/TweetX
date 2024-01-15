import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from '../models';
import { SnackbarService } from './snackbar.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly angularFireAuth = inject(AngularFireAuth);
  private readonly angularFirestore = inject(AngularFirestore);
  private readonly router = inject(Router);
  private readonly snackbarService = inject(SnackbarService);

  logIn(email: string, password: string) {
    this.angularFireAuth.signInWithEmailAndPassword(email, password).then(
      (res) => {
        localStorage.setItem('token', JSON.stringify(res.user?.uid));
        this.router.navigate(['/tweetx']);
      },
      (err) => {
        this.snackbarService.toggleSnackbar(err.message);
        this.router.navigate(['/login']);
      }
    );
  }

  signUp(email: string, password: string, name: string) {
    this.angularFireAuth.createUserWithEmailAndPassword(email, password).then(
      (res) => {
        const userRef = this.angularFirestore.doc(`users/${res.user?.uid}`);
        const userData: User = {
          uid: res.user?.uid!,
          username: name,
          email: email,
        };
        userRef.set(userData);
        this.router.navigate(['/login']);
      },
      (err) => {
        this.snackbarService.toggleSnackbar(err.message);
        this.router.navigate(['/register']);
      }
    );
  }

  logOut() {
    this.angularFireAuth.signOut().then(
      () => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      },
      (err) => {
        this.snackbarService.toggleSnackbar(err.message);
      }
    );
  }
}
