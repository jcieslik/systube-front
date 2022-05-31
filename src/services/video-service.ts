import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
  })
  
  export class CartService {
  
    constructor(private http: HttpClient) { }
  
    getVideosPaginated(offerId: number, amount: number) {
      return this.http.post(`${environment.apiUrl}/api/Cart/AddOfferToCart?offerId=${offerId}&amount=${amount}`, null,  { withCredentials: true });
    }
}