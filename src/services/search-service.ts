import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SearchService {

  searchPhrase: string = ""
  phraseSubject: BehaviorSubject<string> = new BehaviorSubject(this.searchPhrase)

  constructor(private spinner: NgxSpinnerService) {
   }
  
  changeSearchPhrase(newPhrase: string) {
    this.searchPhrase = newPhrase
    this.phraseSubject.next(this.searchPhrase)
  }

  getLatestSearchedPhrase() : string { return this.searchPhrase }

  listenForPhraseChange(): Observable<string> { return this.phraseSubject }

}