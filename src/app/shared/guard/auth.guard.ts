import { CanActivateFn } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { take, map } from 'rxjs/operators';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const angularFireAuth = inject(AngularFireAuth);

  return angularFireAuth.authState.pipe(
    take(1),
    map((user) => {
      if (user) {
        return true;
      } else {
        console.log('return to login');
        router.navigate(['login']);
        return false;
      }
    })
  );
};
export const dashGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const angularFireAuth = inject(AngularFireAuth);

  return angularFireAuth.authState.pipe(
    take(1),
    map((user) => {
      if (user) {
        console.log(user);
        router.navigate(['tweetx/feed']);
        console.log('return to dashboard');
        return false;
      } else {
        return true;
      }
    })
  );
};
