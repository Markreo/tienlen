import {Result} from './result';
import {Player} from './player';

export class ResultManager {
  histories: { id: number, result: Result }[] = [];
  result: Result = {};
  order: number[] = [];
  config = {};

  constructor() {
    const histories = localStorage.getItem('histories');
    if (histories) {
      this.histories = JSON.parse(histories);
    }
  }

  reset(players: Player[]) {
    this.order = [];
    players.map(player => {
      this.result[player.id.toString()] = {
        order: -1,
        plus: [],
        minus: []
      };
    });
    console.log('reset');
    console.log(this.result);
  }

  finishRound(player: Player) {
    if (!this.order.includes(player.id)) {
      this.order.push(player.id);
      this.result[player.id.toString()].order = this.order.length;
    } else {
      const oldOrder = this.order.findIndex(o => o === player.id);
      this.result[player.id.toString()].order = -1;
      this.order = this.order.filter(o => o !== player.id);
      this.order.forEach((value, index) => {
        if (index >= oldOrder) {
          this.result[value].order = index + 1;
        }
      });
    }
  }

  getOrder(player: Player): number {
    return this.order.findIndex(playerId => player.id === playerId) + 1;
  }

  clear(playerId) {
    this.order = this.order.filter(order => order !== playerId);
    this.result[playerId.toString()].order = -1;
  }

  tinhDiem(player: Player) {
    let diem = 0;
    const order = this.order.findIndex(o => o === player.id);

    if (order !== -1) {
      diem += this.diemVe(order);
    }

    const result = this.result[player.id.toString()];

    if (result.plus) {
      result.plus.forEach(plus => {
        let temp = 1;
        plus.forEach(name => {
          temp *= this.config[name];
        });
        diem += temp;
      });
    }

    if (result.minus) {
      result.minus.forEach(minus => {
        let temp = 1;
        minus.forEach(name => {
          temp *= this.config[name];
        });
        diem -= temp;
      });
    }

    return diem;
  }

  private diemVe(order: number) {
    return this.config['ve' + (order + 1)];
  }

  save(players) {
    this.histories.push({id: new Date().getTime(), result: Object.assign({}, this.result)});
    this.reset(players);
    localStorage.setItem('histories', JSON.stringify(this.histories));
  }

  setPlus(player: Player, plus: string[]) {
    this.result[player.id.toString()].plus.push(plus);
  }

  setMinus(player: Player, minus: string[]) {
    this.result[player.id.toString()].minus.push(minus);
  }

  antrang(players: Player[]) {
    players.forEach(player => {
      if (this.order.includes(player.id)) {
        this.result[player.id.toString()].plus.push(['antrang']);
      } else {
        this.result[player.id.toString()].minus.push(['antrang']);
      }
    });
  }

  xu(players: Player[]) {
    players.forEach(player => {
      if (this.order.includes(player.id)) {
        this.result[player.id.toString()].plus.push(['xu']);
      } else {
        this.result[player.id.toString()].minus.push(['xu']);
      }
    });
  }


  backToHis(id) {
    this.result = this.histories.find(his => his.id === id).result;
    this.histories.filter(his => his.id !== id);
    localStorage.setItem('histories', JSON.stringify(this.histories));
    Object.keys(this.result).forEach(key => {
      if (this.result[key].order > 0) {
        this.order.push(Number(key));
        this.order.sort((idA, idB) => {
          if (this.result[idA.toString()].order > this.result[idB.toString()].order) {
            return 1;
          } else {
            return -1;
          }
        });
      }
    });
  }
}
