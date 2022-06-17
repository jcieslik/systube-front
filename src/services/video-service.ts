import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PaginationProperties } from "src/app/models/pagination-properties";
import { VideoDto } from "src/app/models/video-dto";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
  })
  
  export class VideoService {
  
    constructor(private http: HttpClient) { }
  
    getVideosPaginated(body?: PaginationProperties, searchPhrase: string = ' ') {
      let request = `${environment.apiUrl}/api/Video/GetVideosPaginated?PageIndex=${body?.pageIndex}&PageSize=${body?.pageSize}&OrderBy=${body?.orderBy}&searchString=${searchPhrase}`

      return this.http.get(request,  { withCredentials: true });
    }

    getVideosForSidebar(id: number): Observable<any> {
      return this.http.get(`${environment.apiUrl}/api/Video/GetVideosForSidebar?currentVideoId=${id}`,  { withCredentials: true });
    }

    incrementWatched(id: number) {
      return this.http.put(`${environment.apiUrl}/api/Video/IncrementWatched?videoId=${id}`,  { withCredentials: true });
    }

    getVideoById(id: number) {
      return this.http.get(`${environment.apiUrl}/api/Video/GetVideoById?videoId=${id}`,  { withCredentials: true });
    }

    testConnection() {
      return this.http.get(`${environment.apiUrl}/api/Video/TestConnection`,  { withCredentials: true });
    }

    getSizeOfVideoSecondById(id: number) {
      return this.http.get(`${environment.apiUrl}/api/Video/GetSizeOfVideoSecondById?videoId=${id}`,  { withCredentials: true });
    }
}