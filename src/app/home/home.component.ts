import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
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
export class HomeComponent implements OnInit, AfterViewInit {

  videosPaginated: VideoDtoPaginatedList;
  collectionLength: number = 0;
  pageEvent: PageEvent;
  searchPhrase: string = "";

  @ViewChild(MatPaginator) paginator: MatPaginator;

  //model: PaginationProperties = {
  //  pageIndex: 1,
  //  pageSize: 8,
  //  orderBy: "title"
  //};

  constructor(private videoService: VideoService,
    private searchService: SearchService,
    private spinner: SpinnerService,) {}

  ngAfterViewInit() {
    this.searchService.listenForPhraseChange().subscribe(value => {
      this.searchPhrase = value;
      this.paginator.pageIndex = 0;
      this.getPaginatedVideos(value);

    })
  }

  public handlePage(e: any) {
    this.getPaginatedVideos(this.searchPhrase)
    return e;
  }

  ngOnInit(): void {
  }


  getPaginatedVideos(phrase?: string) {
    this.spinner.show()

    this.videoService.getVideosPaginated({ pageIndex: this.paginator.pageIndex,  pageSize: this.paginator.pageSize,  orderBy: "title"}, phrase)
      .subscribe((result) => {
        this.videosPaginated = result;
        this.collectionLength = this.videosPaginated.totalCount;
        this.videosPaginated.items.forEach(element => {
          element.thumbnail = "data:image/png;base64," + element.thumbnail;
        });
        this.spinner.hide()
      })
  }
}
