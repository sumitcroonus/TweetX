import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedComponent } from './components/feed/feed.component';
import { TweetxLayoutComponent } from './components/tweetx-layout/tweetx-layout.component';
import { ProfileComponent } from './components/profile/profile.component';
import { WriteTweetComponent } from './components/common/write-tweet/write-tweet.component';
import { PostCardComponent } from './components/common/post-card/post-card.component';
import { UserCardComponent } from './components/common/user-card/user-card.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  {
    path: '',
    component: TweetxLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'feed',
        pathMatch: 'full',
      },
      {
        path: 'feed',
        component: FeedComponent,
      },
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TweetxRoutingModule {}
