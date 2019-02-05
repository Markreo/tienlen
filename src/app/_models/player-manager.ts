import {Player} from './player';

export class PlayerManager {
  players: Player[] = [];

  constructor(players: Player[]) {
    this.players = players;
  }

  getPlayer(id) {
    return this.players.find(p => p.id === id);
  }
}
