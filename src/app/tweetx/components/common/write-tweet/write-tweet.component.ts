import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Tweet } from 'src/app/shared/models';

@Component({
  selector: 'app-write-tweet',
  templateUrl: './write-tweet.component.html',
  styleUrls: ['./write-tweet.component.css'],
})
export class WriteTweetComponent {
  write = false;

  @Output() postEvent = new EventEmitter<Tweet>();

  tweetForm = new FormGroup({
    post: new FormControl<string>('', [Validators.required]),
    date: new FormControl<Date>(new Date(Date.now()), [Validators.required]),
  });

  writePost() {
    this.write = !this.write;
  }

  postTweet() {
    if (this.tweetForm.valid) {
      this.postEvent.emit(this.tweetForm.value as Tweet);
      this.write = !this.write;
      this.tweetForm.reset()
    }
  }
}
