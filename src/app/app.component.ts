import { Component } from '@angular/core';
import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons';
import { SearchService } from 'src/services/search-service';
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

  constructor(private searchService: SearchService){}

  updatePhrase() {
    this.searchService.changeSearchPhrase(this.searchPhrase);
  }
}
