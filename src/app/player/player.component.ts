import {Component, OnInit} from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import {PlayerFormComponent} from './player-form/player-form.component';
import {PlayerService} from '../_services/player.service';
import {Player} from '../_models/player';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  players: Player[] = [];


  constructor(public dialog: MatDialog,
              private playerService: PlayerService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.getPlayer();
  }

  getPlayer() {
    this.players = this.playerService.getPlayers();
  }

  openDialog(player?: Player): void {
    const dialogRef = this.dialog.open(PlayerFormComponent, {
      width: '300px',
      data: player
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result) {
        this.updatePlayer(result);
      }
    });
  }

  updatePlayer(data) {
    this.playerService.updatePlayer(data);
    this.snackBar.open('Save!');
    this.getPlayer();
  }

}
