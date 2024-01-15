import { Injectable, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly angularFirestore = inject(AngularFirestore);

  getLogedInUser() {
    const userData = localStorage.getItem('token');
    if (userData) {
      // console.log(userData)
      return JSON.parse(userData);
    }
    return '';
  }

  getMyProfile() {
    const id = this.getLogedInUser();
    return this.angularFirestore
      .collection<User>('users', (ref) => ref.where('uid', '==', id))
      .valueChanges();
  }

  getUserById(id: string) {
    return this.angularFirestore
      .collection<User>('users', (ref) => ref.where('uid', '==', id))
      .valueChanges();
  }

  getAllUsersExceptlogedInUser() {
    return this.angularFirestore
      .collection<User>('users', (ref) =>
        ref.where('uid', '!=', this.getLogedInUser())
      )
      .valueChanges();
  }
}
