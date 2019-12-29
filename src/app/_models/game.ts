import {ResultManager} from './result-manager';
import {Player} from './player';
import {PlayerManager} from './player-manager';

export class Game {
  playerManager: PlayerManager;
  resultManager: ResultManager;
  endGame = false;

  constructor(players: Player[] = [], config: any) {
    this.playerManager = new PlayerManager(players);
    this.resultManager = new ResultManager();

    console.log('new game,reset', players);
    this.resultManager.reset(players);
    this.resultManager.config = config;
  }

  parseToGame() {

  }

  getPlayer(id) {
    return this.playerManager.getPlayer(id);
  }

  reset() {
    this.resultManager.reset(this.playerManager.players);
  }

  finishRound(player: Player) {
    this.resultManager.finishRound(player);
  }

  playersNotFinishThisMatch() {
    return this.playerManager.players.filter(p => !this.resultManager.order.includes(p.id));
  }

  checkPlayerFinishMatch(player) {
    const result = this.resultManager.result[player.id.toString()];
    return result && result.order !== -1;
  }

  nextGame() {
    this.resultManager.save(this.playerManager.players);
  }

  antrang() {
    this.resultManager.antrang(this.playerManager.players);
    this.nextGame();
  }

  xu() {
    this.resultManager.xu(this.playerManager.players);
  }
}
