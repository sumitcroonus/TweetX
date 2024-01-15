import { Injectable, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserService } from './user.service';
import { combineLatest, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FollowService {
  private readonly angularFirestore = inject(AngularFirestore);
  private readonly userService = inject(UserService);
  private readonly uid = this.userService.getLogedInUser();

  follow(targetUserId: string) {
    return this.angularFirestore
      .doc(`users/${targetUserId}`)
      .get()
      .pipe(
        switchMap((doc: any) => {
          const followers = doc.data()?.followers || [];
          if (!followers.includes(this.uid)) {
            followers.push(this.uid);
          }
          // console.log("-------rom service___________")
          // console.log(followers)
          const updateFollowers = this.angularFirestore
            .doc(`users/${targetUserId}`)
            .update({ followers });

          const updateFollowing = this.angularFirestore
            .doc(`users/${this.uid}`)
            .get()
            .pipe(
              switchMap((userDoc: any) => {
                const following = userDoc.data()?.following || [];
                if (!following.includes(targetUserId)) {
                  following.push(targetUserId);
                }
                // console.log("_________following update-----------------")
                // console.log(following)
                return this.angularFirestore
                  .doc(`users/${this.uid}`)
                  .update({ following });
              })
            );
          // console.log("_________end-----------------")
          return combineLatest([updateFollowers, updateFollowing]);
        })
      );
  }
}
