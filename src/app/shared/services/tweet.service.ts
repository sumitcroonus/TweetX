import { Injectable, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Tweet } from '../models';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class TweetService {
  private readonly angularFirestore = inject(AngularFirestore);
  private readonly userService = inject(UserService);

  private readonly uid = this.userService.getLogedInUser();

  saveTweet(data: Tweet) {
    return this.angularFirestore.collection<Tweet>('tweets').add(data);
  }

  getMyTweets() {
    return this.angularFirestore
      .collection<Tweet>('tweets', (ref) => ref.where('userId', '==', this.uid))
      .valueChanges();
  }

  getTweetsByIds(tweetIds: string[]) {
    return this.angularFirestore
      .collection<Tweet>('tweets', (ref) => ref.where('userId', 'in', tweetIds))
      .valueChanges();
  }
}
