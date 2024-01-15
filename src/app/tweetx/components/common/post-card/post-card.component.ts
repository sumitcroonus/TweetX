import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Tweet } from 'src/app/shared/models';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css'],
})
export class PostCardComponent implements OnChanges {
  showMessage = false;
  @Input() postData: Tweet[] = [];
  @Input() type: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['postData'] && changes['postData'].currentValue) {
      setTimeout(() => {
        if (this.postData.length == 0) {
          this.showMessage = true;
        }
      }, 1000);
    }
  }
}
