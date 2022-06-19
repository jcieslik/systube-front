import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { interval } from 'rxjs';
import { environment } from 'src/environments/environment';
import { VideoService } from 'src/services/video-service';
import { Resolution } from '../models/resolution';
import { VideoDto } from '../models/video-dto';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  video1080pPlaying = false;
  video720pPlaying = false;
  video480pPlaying = false;
  video360pPlaying = false;
  video240pPlaying = false;

  video1080p: ElementRef;
  video720p: ElementRef;
  video480p: ElementRef;
  video360p: ElementRef;
  video240p: ElementRef;

  sidebarVideos: VideoDto[] = [];

  @ViewChild('video1080p', { static: false }) set video1080pContent(content: ElementRef) {
    if (content) {
      this.video1080p = content;
    }
  }

  @ViewChild('video720p', { static: false }) set video720pContent(content: ElementRef) {
    if (content) {
      this.video720p = content;
    }
  }

  @ViewChild('video480p', { static: false }) set video480pContent(content: ElementRef) {
    if (content) {
      this.video480p = content;
    }
  }

  @ViewChild('video360p', { static: false }) set video360pContent(content: ElementRef) {
    if (content) {
      this.video360p = content;
    }
  }

  @ViewChild('video240p', { static: false }) set video240pContent(content: ElementRef) {
    if (content) {
      this.video240p = content;
    }
  }

  secondSizesByResolution: any;

  currentTime: number = 0;

  id: number = 0;

  currentVideo: ElementRef;

  videoSource = "";

  video: VideoDto;

  preferredResolutionByInternetSpeed: Resolution;

  previousBufferedTime = 0;

  previousTimestamp = 0;

  timeoutID;

  reducingResolution = false;

  wasTimeChanged = false;

  constructor(private route: ActivatedRoute,
    private videoService: VideoService) { }

  ngOnInit(): void {
    this.getParameters();
    this.videoService.getSizeOfVideoSecondById(this.id)
      .subscribe((result) => {
        this.secondSizesByResolution = result;
        this.testConnection();

        this.videoService.getVideoById(this.id)
          .subscribe((result) => {
            this.video = result;
          });

        this.videoService.getVideosForSidebar(this.id)
          .subscribe((result) => {
            result.forEach(element => {
              element.thumbnail = "data:image/png;base64," + element.thumbnail;
            });
            this.sidebarVideos = result;
          });

        this.videoService.incrementWatched(this.id)
          .subscribe();

        this.videoSource = `${environment.apiUrl}/api/Video/GetFileById?fileId=` + this.id;

        const source = interval(1000);
        source.subscribe(() => {
          this.getBufferedTime();
        });
      })
  }

  getParameters() {
    this.route.params.subscribe(params => {
      if (this.id) {
        window.location.reload();
      }
      this.id = params['id'];
    });
  }

  testConnection() {
    var time = performance.now();
    this.videoService.testConnection().subscribe(() => {
      var passedTime = performance.now() - time;
      this.getResolutionByInternetSpeed(passedTime);
      this.setupVideo();
    })
    const source = interval(15000);
    source.subscribe(() => {
      var time = performance.now();
      this.videoService.testConnection().subscribe(() => {
        var passedTime = performance.now() - time;
        this.getResolutionByInternetSpeed(passedTime);
      })
    });
  }

  getResolutionByInternetSpeed(passedTime: number) {
    var downloadSpeed = (1048576 / passedTime) * 1000;
    if (downloadSpeed > this.secondSizesByResolution._1080p) {
      this.preferredResolutionByInternetSpeed = Resolution._1080p;
    } else if (downloadSpeed > this.secondSizesByResolution._720p) {
      this.preferredResolutionByInternetSpeed = Resolution._720p;
    } else if (downloadSpeed > this.secondSizesByResolution._480p) {
      this.preferredResolutionByInternetSpeed = Resolution._480p;
    } else if (downloadSpeed > this.secondSizesByResolution._360p) {
      this.preferredResolutionByInternetSpeed = Resolution._360p;
    } else {
      this.preferredResolutionByInternetSpeed = Resolution._240p;
    }
  }

  setCurrentVideo(resolution: Resolution) {
    switch (resolution) {
      case Resolution._1080p:
        this.startPlayingVideo(this.video1080p, resolution);
        break;
      case Resolution._720p:
        this.startPlayingVideo(this.video720p, resolution);
        break;
      case Resolution._480p:
        this.startPlayingVideo(this.video480p, resolution);
        break;
      case Resolution._360p:
        this.startPlayingVideo(this.video360p, resolution);
        break;
      case Resolution._240p:
        this.startPlayingVideo(this.video240p, resolution);
        break;
    }
  }

  startPlayingVideo(video: ElementRef, resolution: Resolution) {
    this.currentTime = this.currentVideo ? this.currentVideo.nativeElement.currentTime : 0;
    switch (resolution) {
      case Resolution._1080p:
        video.nativeElement.currentTime = this.currentTime;
        video.nativeElement.onplaying = () => {
          this.video720pPlaying = false;
          this.video480pPlaying = false;
          this.video360pPlaying = false;
          this.video240pPlaying = false;
          this.video1080pPlaying = true;
          if (this.currentVideo !== video) {
            this.currentVideo.nativeElement.pause();
            this.currentVideo.nativeElement.currentTime = 0;
            this.currentVideo.nativeElement.preload = "none";
            this.currentVideo.nativeElement.load();
            this.currentVideo.nativeElement.webkitExitFullscreen();
            this.currentVideo = video;
          }
          this.reducingResolution = false;
        }
        video.nativeElement.play();
        break;
      case Resolution._720p:
        video.nativeElement.currentTime = this.currentTime;
        video.nativeElement.onplaying = () => {
          this.video1080pPlaying = false;
          this.video720pPlaying = true;
          this.video480pPlaying = false;
          this.video360pPlaying = false;
          this.video240pPlaying = false;
          if (this.currentVideo !== video) {
            this.currentVideo.nativeElement.pause();
            this.currentVideo.nativeElement.currentTime = 0;
            this.currentVideo.nativeElement.preload = "none";
            this.currentVideo.nativeElement.load();
            this.currentVideo.nativeElement.webkitExitFullscreen();
            this.currentVideo = video;
          }
          this.reducingResolution = false;
        }
        video.nativeElement.play();
        break;
      case Resolution._480p:
        video.nativeElement.currentTime = this.currentTime;
        video.nativeElement.onplaying = () => {
          this.video1080pPlaying = false;
          this.video720pPlaying = false;
          this.video480pPlaying = true;
          this.video360pPlaying = false;
          this.video240pPlaying = false;
          if (this.currentVideo !== video) {
            this.currentVideo.nativeElement.pause();
            this.currentVideo.nativeElement.currentTime = 0;
            this.currentVideo.nativeElement.preload = "none";
            this.currentVideo.nativeElement.load();
            this.currentVideo.nativeElement.webkitExitFullscreen();
            this.currentVideo = video;
          }
          this.reducingResolution = false;
        }
        video.nativeElement.play();
        break;
      case Resolution._360p:
        video.nativeElement.currentTime = this.currentTime;
        video.nativeElement.onplaying = () => {
          this.video1080pPlaying = false;
          this.video720pPlaying = false;
          this.video480pPlaying = false;
          this.video360pPlaying = true;
          this.video240pPlaying = false;

          if (this.currentVideo !== video) {
            this.currentVideo.nativeElement.pause();
            this.currentVideo.nativeElement.currentTime = 0;
            this.currentVideo.nativeElement.preload = "none";
            this.currentVideo.nativeElement.load();
            this.currentVideo.nativeElement.webkitExitFullscreen();
            this.currentVideo = video;
          }
          this.reducingResolution = false;
        }
        video.nativeElement.play();
        break;
      case Resolution._240p:
        video.nativeElement.currentTime = this.currentTime;
        video.nativeElement.onplaying = () => {
          this.video1080pPlaying = false;
          this.video720pPlaying = false;
          this.video480pPlaying = false;
          this.video360pPlaying = false;
          this.video240pPlaying = true;
          this.currentVideo.nativeElement.pause();
          this.currentVideo.nativeElement.currentTime = 0;
          this.currentVideo.nativeElement.preload = "none";
          this.currentVideo.nativeElement.load();
          this.currentVideo.nativeElement.webkitExitFullscreen();
          this.currentVideo = video;
          this.reducingResolution = false;
        }
        video.nativeElement.play();
        break;
    }
  }

  getBufferedTime() {
    if (this.currentVideo) {
      var mediaElement = this.currentVideo.nativeElement as HTMLMediaElement;
      this.previousTimestamp = mediaElement.currentTime;
      var currentBufferedRangeEnd = 0;
      for (var i = 0; i < mediaElement.buffered.length; i += 1) {
        if (mediaElement.buffered.end(i) > currentBufferedRangeEnd && mediaElement.currentTime < mediaElement.buffered.end(i)) {
          currentBufferedRangeEnd = mediaElement.buffered.end(i);
          break;
        }
      }
      if (mediaElement.currentTime - this.previousTimestamp > currentBufferedRangeEnd - this.previousBufferedTime
        && Math.abs(mediaElement.currentTime - this.previousTimestamp) < 1.25
        && currentBufferedRangeEnd - this.previousBufferedTime > 0) {
        this.reduceResolution();
      }
      if (currentBufferedRangeEnd - mediaElement.currentTime > 2) {
        this.tryIncreaseResolution();
      }
      this.previousTimestamp = mediaElement.currentTime;
      this.previousBufferedTime = currentBufferedRangeEnd;
    }
  }

  onWaitingEvent() {
    if (!this.wasTimeChanged) {
      this.reduceResolution();
    }
  }

  setupVideo() {
    switch (this.preferredResolutionByInternetSpeed) {
      case Resolution._1080p:
        this.video1080pPlaying = true;
        this.currentVideo = this.video1080p;
        break;
      case Resolution._720p:
        this.video720pPlaying = true;
        this.currentVideo = this.video720p;
        break;
      case Resolution._480p:
        this.video480pPlaying = true;
        this.currentVideo = this.video480p;
        break;
      case Resolution._360p:
        this.video360pPlaying = true;
        this.currentVideo = this.video360p;
        break;
      case Resolution._240p:
        this.video240pPlaying = true;
        this.currentVideo = this.video240p;
        break;
    }
  }

  reduceResolution() {
    if (!this.reducingResolution) {
      this.reducingResolution = true;
      switch (this.currentVideo) {
        case this.video1080p:
          this.setCurrentVideo(Resolution._720p);
          break;
        case this.video720p:
          this.setCurrentVideo(Resolution._480p);
          break;
        case this.video480p:
          this.setCurrentVideo(Resolution._360p);
          break;
        case this.video360p:
          this.setCurrentVideo(Resolution._240p);
          break;
      }
    }
  }

  tryIncreaseResolution() {
    if (this.preferredResolutionByInternetSpeed === Resolution._1080p && !this.video1080pPlaying) {
      this.setCurrentVideo(Resolution._1080p)
    } else if (this.preferredResolutionByInternetSpeed === Resolution._720p && !this.video720pPlaying) {
      this.setCurrentVideo(Resolution._720p)
    } else if (this.preferredResolutionByInternetSpeed === Resolution._480p && !this.video480pPlaying) {
      this.setCurrentVideo(Resolution._480p)
    } else if (this.preferredResolutionByInternetSpeed === Resolution._360p && !this.video360pPlaying) {
      this.setCurrentVideo(Resolution._360p)
    } else if (this.preferredResolutionByInternetSpeed === Resolution._240p && !this.video240pPlaying) {
      this.setCurrentVideo(Resolution._240p)
    }
  }

  startTimer() {
    this.timeoutID = window.setTimeout(() => {
      this.wasTimeChanged = false;
    }, 1000);
  }

  resetTimer() {
    window.clearTimeout(this.timeoutID);
    this.startTimer();
  }

  onTimeUpdateEvent() {
    this.wasTimeChanged = true;
    this.resetTimer();
  }
}
