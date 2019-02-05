import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PlayerService} from '../_services/player.service';
import {Player} from '../_models/player';
import {Game} from '../_models/game';
import {SettingService} from '../_services/setting.service';
import {Result} from '../_models/result';
import {MatBottomSheet} from '@angular/material';
import {HangComponent} from './hang/hang.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  players: Player[] = [];
  game: Game;

  constructor(private router: Router,
              private playerService: PlayerService,
              private settingService: SettingService,
              private bottomSheet: MatBottomSheet) {
  }

  ngOnInit() {
    this.checkLastGame();
  }

  checkLastGame() {
    const game = localStorage.getItem('game');
    if (game) {
      console.log('da co game, loading...');
    } else {
      if (this.checkPlayer()) {
        this.initGame();
      } else {
        this.router.navigate(['/player']);
      }
    }
  }

  initGame() {
    this.getPlayers();
    if (this.players.length) {
      this.game = new Game(this.players, this.settingService.config);
    }
  }

  getPlayers() {
    this.players = this.playerService.getPlayers();
  }

  checkPlayer(): boolean {
    return this.playerService.getPlayers().length !== 0;
  }

  playersNotFinishThisMatch() {
    return this.game.playersNotFinishThisMatch();
  }

  checkPlayerFinishMatch(player: Player) {
    return this.game.checkPlayerFinishMatch(player);
  }

  finishRound(player) {
    this.game.finishRound(player);
  }

  reset() {
    this.game.reset();
  }

  tinhdiem(player: Player) {
    return this.game.resultManager.tinhDiem(player);
  }

  newGame() {
    this.game.nextGame();
  }

  tinhdiemHis(result: { order: number, plus: Array<string>[], minus: Array<string>[] }) {
    let diem = 0;

    // const result = this.result[player.id.toString()];

    if (result.order !== -1) {
      diem += this.settingService.config['ve' + (result.order)];
    }

    if (result.plus) {
      result.plus.forEach(plus => {
        let temp = 1;
        plus.forEach(name => {
          temp *= this.settingService.config[name];
        });
        diem += temp;
      });
    }

    if (result.minus) {
      result.minus.forEach(minus => {
        let temp = 1;
        minus.forEach(name => {
          temp *= this.settingService.config[name];
        });
        diem -= temp;
      });
    }

    return diem;
  }


  clearAll() {
    localStorage.removeItem('players');
  }


  add(player: Player) {
    const bottomSheetRef = this.bottomSheet.open(HangComponent);

    bottomSheetRef.afterDismissed().subscribe(plus => {
      if (plus) {
        this.game.resultManager.setPlus(player, plus);
      }
    });
  }

  remove(player: Player) {
    const bottomSheetRef = this.bottomSheet.open(HangComponent);

    bottomSheetRef.afterDismissed().subscribe(minus => {
      if (minus) {
        this.game.resultManager.setMinus(player, minus);
      }
    });
  }

  tongDiem(player: Player) {
    return this.game.resultManager.histories.reduce((oldValue, history) => {
      return oldValue + this.tinhdiemHis(history.result[player.id.toString()]);
    }, 0);
  }

  antrang() {
    this.game.antrang();
  }

  xu() {
    this.game.xu();
  }

  backToHis(resultId) {
    this.game.resultManager.backToHis(resultId);
  }

}
