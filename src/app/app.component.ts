import { Component } from '@angular/core';
import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons';
import { SpinnerService } from 'src/services/spinner-service';
import { VideoService } from 'src/services/video-service';
import { PaginationProperties } from './models/pagination-properties';
import { VideoDtoPaginatedList } from './models/video-dto-paginated-list';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  showFiller = false;
  faBars = faBars;
  faSearch = faSearch;
  title = 'SysTube';

  searchPhrase: string = ""; 

  videosPaginated!: VideoDtoPaginatedList;

  model: PaginationProperties = {
    pageIndex: 1,
    pageSize: 8
  };

  constructor(private videoService: VideoService,
    private spinner: SpinnerService,){
    this.getPaginatedVideos()
  }

  getPaginatedVideos() {
    this.spinner.show()

    this.videoService.getVideosPaginated(this.model, this.searchPhrase)
    .subscribe((result) => {
        this.videosPaginated = result;
        this.spinner.hide()
    })
  }

  searchVideosByPhrase() {
    this.model.pageIndex = 0;

  }


}
