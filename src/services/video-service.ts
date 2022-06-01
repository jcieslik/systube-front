import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PaginationProperties } from "src/app/models/pagination-properties";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
  })
  
  export class VideoService {
  
    constructor(private http: HttpClient) { }
  
    getVideosPaginated(body?: PaginationProperties, searchPhrase?: string) {
      return this.http.post(`${environment.apiUrl}/api/Video/GetVideosPaginated?PageIndex=${body?.pageIndex}&PageSize=${body?.pageSize}&OrderBy=${body?.orderBy}&SearchString=${searchPhrase}`, null,  { withCredentials: true });
    }
}