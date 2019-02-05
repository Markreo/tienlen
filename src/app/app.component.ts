import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDrawer} from '@angular/material';
import {NavigationStart, Router} from '@angular/router';
import {Game} from './_models/game';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('drawer') drawer: MatDrawer;

  game: Game;


  constructor(private router: Router) {

  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.drawer.close();
      }
    });
  }

  onCleanCache() {
    localStorage.removeItem('players');
    localStorage.removeItem('histories');
    localStorage.removeItem('config');
    location.reload();
  }
}
