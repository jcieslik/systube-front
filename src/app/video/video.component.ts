import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    let vid: HTMLVideoElement = document.getElementById("video") as HTMLVideoElement;
    setTimeout(() => {
      let currentTime = vid.currentTime;
      vid.src = "https://localhost:7297/api/Video/GetFileById2"
      vid.currentTime = currentTime;
      vid.load();
      vid.play();
    }, 10000);
  }
}
