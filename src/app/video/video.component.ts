import { AfterViewChecked, AfterViewInit, Component, DoCheck, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  video1Playing = true;

  @ViewChild('video1', {static: true})
  video1!: ElementRef;

  @ViewChild('video2', {static: true})
  video2!: ElementRef;

  currentTime: number = 0;

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.currentTime = this.video1.nativeElement.currentTime;
      this.video2.nativeElement.currentTime = this.currentTime;
      this.video2.nativeElement.onplaying = () => {
        this.video1Playing = false;
        this.video1.nativeElement.pause();
      }
      this.video2.nativeElement.play();
    }, 5000);
  }
}
