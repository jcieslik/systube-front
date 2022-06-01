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
      console.log("searchstring:" + searchPhrase, "body:" + body)
      let request = `${environment.apiUrl}/api/Video/GetVideosPaginated?PageIndex=${body?.pageIndex}&PageSize=${body?.pageSize}&OrderBy=${body?.orderBy}`
      if( searchPhrase.length === 0) { console.log("fuckup"); request += `&SearchString=${"x"}` }
      else { console.log("fuckup"); request += `&SearchString=${searchPhrase}` }

      return this.http.post(request, null, {withCredentials: true });
    }

    getVideosForSidebar(id: number): Observable<any> {
      return this.http.get(`${environment.apiUrl}/api/Video/GetVideosForSidebar?currentVideoId=${id}`,  { withCredentials: true });
    }
}