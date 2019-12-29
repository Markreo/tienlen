import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ghidiem';

  onCleanCache() {
    localStorage.removeItem('players');
    localStorage.removeItem('histories');
    localStorage.removeItem('config');
    location.reload();
  }
}
