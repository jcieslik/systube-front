import { Component } from '@angular/core';
import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons';

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

}
