import { AfterViewChecked, AfterViewInit, Component, DoCheck, ElementRef, HostListener, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  video1Playing = true;

  video1!: ElementRef;

 @ViewChild('video1', { static: false }) set content(content: ElementRef) {
    if(content) { 
      this.video1 = content;
    }
  }

  @ViewChild('video2', {static: false})
  video2!: ElementRef;

  currentTime: number = 0;

  id: number = 0;

  videoSource = "";

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.videoSource = "http://localhost:5297/api/Video/GetFileById?fileId=" + this.id;
    setTimeout(() => {
      this.currentTime = this.video1.nativeElement.currentTime;
      /*this.video2.nativeElement.currentTime = this.currentTime;
      this.video2.nativeElement.onplaying = () => {
        this.video1Playing = false;
        this.video1.nativeElement.pause();
      }
      this.video2.nativeElement.play();*/
    }, 5000);
  }
}
