import {Injectable} from '@angular/core';
import {Player} from '../_models/player';
import {ColorList} from '../_models/constant';

@Injectable()
export class PlayerService {
  players: Player[] = [];

  constructor() {
    const players = localStorage.getItem('players');
    if (players) {
      this.players = JSON.parse(players);
    } else {
      setTimeout(() => {
        this.createPlayer({id: new Date().getTime(), name: 'Player 1', color: ColorList[0]});
      }, 10);

      setTimeout(() => {
        this.createPlayer({id: new Date().getTime(), name: 'Player 2', color: ColorList[1]});
      }, 10);

      setTimeout(() => {
        this.createPlayer({id: new Date().getTime(), name: 'Player 3', color: ColorList[2]});
      }, 10);

      setTimeout(() => {
        this.createPlayer({id: new Date().getTime(), name: 'Player 4', color: ColorList[3]});
      }, 10);
    }
  }

  getPlayers(): Player[] {
    return this.players;
  }

  createPlayer(data: Player) {
    this.players.push(data);
    localStorage.setItem('players', JSON.stringify(this.players));
  }

  updatePlayer(data: Player) {
    this.players = this.players.map(player => {
      if (player.id === data.id) {
        return data;
      } else {
        return player;
      }
    });
    localStorage.setItem('players', JSON.stringify(this.players));
  }
}
