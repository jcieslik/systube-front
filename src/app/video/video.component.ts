import { AfterViewChecked, AfterViewInit, Component, DoCheck, ElementRef, HostListener, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from 'src/services/video-service';
import { VideoDto } from '../models/video-dto';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  video1Playing = true;

  video1!: ElementRef;

  sidebarVideos: VideoDto[] = [];

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

  video: VideoDto;

  constructor(private route: ActivatedRoute,
    private videoService: VideoService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (this.id) {
        window.location.reload();
      }
      this.id = params['id'];
    });
    this.videoService.getVideoById(this.id)
      .subscribe((result) => {
        this.video = result;
      })
    this.videoService.getVideosForSidebar(this.id)
      .subscribe((result) => {
        result.forEach(element => {
          element.thumbnail = "data:image/png;base64," + element.thumbnail;
        });
        this.sidebarVideos = result;
      });
    this.videoService.incrementWatched(this.id)
      .subscribe();
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
