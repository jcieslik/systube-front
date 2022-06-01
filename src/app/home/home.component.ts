import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/services/search-service';
import { SpinnerService } from 'src/services/spinner-service';
import { VideoService } from 'src/services/video-service';
import { PaginationProperties } from '../models/pagination-properties';
import { VideoDtoPaginatedList } from '../models/video-dto-paginated-list';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  videosPaginated!: VideoDtoPaginatedList;

  model: PaginationProperties = {
    pageIndex: 1,
    pageSize: 8,
    orderBy: "title"
  };

  constructor(private videoService: VideoService,
    private searchService: SearchService,
    private spinner: SpinnerService,) {
      this.searchService.listenForPhraseChange().subscribe(value => {
        this.model.pageIndex = 1;
        this.getPaginatedVideos(value);

      })
    }

  ngOnInit(): void {
  }

  
  getPaginatedVideos(phrase?: string) {
    this.spinner.show()

    this.videoService.getVideosPaginated(this.model, phrase)
    .subscribe((result) => {
        this.videosPaginated = result;
        this.spinner.hide()
    })
  }
}
