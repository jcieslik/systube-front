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
  
    getVideosPaginated(body?: PaginationProperties, searchPhrase?: string) {
      return this.http.post(`${environment.apiUrl}/api/Video/GetVideosPaginated?PageIndex=${body?.pageIndex}&PageSize=${body?.pageSize}&OrderBy=${body?.orderBy}&SearchString=${searchPhrase}`, null,  { withCredentials: true });
    }

    getVideosForSidebar(): Observable<any> {
      return this.http.get(`${environment.apiUrl}/api/Video/GetVideosForSidebar`,  { withCredentials: true });
    }
}