import { Component, OnInit, inject } from '@angular/core';
import { User } from '../../../shared/models';
import { Tweet } from 'src/app/shared/models';
import { TweetService } from 'src/app/shared/services/tweet.service';
import { UserService } from 'src/app/shared/services/user.service';
import { EMPTY, switchMap, tap } from 'rxjs';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit {
  myProfileDetail!: User;
  allPosts: Tweet[] = [];

  private readonly tweetService = inject(TweetService);
  private readonly userService = inject(UserService);
  private readonly snackbarService = inject(SnackbarService);

  ngOnInit() {
    this.getMyprofile()
      .pipe(switchMap(() => this.getTweets()))
      .subscribe(() => {});
  }

  getMyprofile() {
    return this.userService.getMyProfile().pipe(
      tap((res) => {
        this.myProfileDetail = res[0] as User;
      })
    );
  }

  getTweets() {
    if (this.myProfileDetail.following?.length! > 0) {
      return this.tweetService
        .getTweetsByIds(this.myProfileDetail?.following!)
        .pipe(
          tap((res: Tweet[]) => {
            this.allPosts = res;
            this.allPosts.map((res: any) => {
              res.date = res.date.toDate();
            });
          })
        );
    } else {
      return EMPTY;
    }
  }

  postTweet(body: Tweet) {
    const data: Tweet = {
      userId: this.userService.getLogedInUser(),
      postedBy: this.myProfileDetail.username,
      post: body.post,
      date: body.date,
    };
    this.tweetService.saveTweet(data).then(
      (res) => {
        return;
      },
      (err) => {
        this.snackbarService.toggleSnackbar(err);
      }
    );
  }
}
