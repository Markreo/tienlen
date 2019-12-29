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

  reset(playersInit?: Player[]) {
    this.order = [];

    if (playersInit && playersInit.length) {
      playersInit.map(player => {
        this.result[player.id.toString()] = {
          order: -1,
          plus: [],
          minus: []
        };
      });
    } else {
      Object.keys(this.result).filter(key => key !== 'id').map(playerId => {
        this.result[playerId] = {
          order: -1,
          plus: [],
          minus: []
        };
      });
    }
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
      let temp = 0;
      result.plus.forEach(plus => {
        temp += this.config[plus];
      });
      diem += temp;
    }

    if (result.minus) {
      let temp = 0;
      result.minus.forEach(minus => {
        temp += this.config[minus];
      });
      diem -= temp;
    }

    return diem;
  }

  private diemVe(order: number) {
    return this.config['ve' + (order + 1)];
  }

  save(players) {
    if (this.result.id) {

      this.histories = this.histories.map(his => {
        if (his.id === this.result.id) {
          return {id: this.result.id, result: {...this.result}};
        } else {
          return his;
        }
      });
      this.result.id = undefined;
      this.reset();
      localStorage.setItem('histories', JSON.stringify(this.histories));
    } else {
      this.histories.push({id: new Date().getTime(), result: {...this.result}});
      this.reset(players);
      localStorage.setItem('histories', JSON.stringify(this.histories));
    }
  }

  setPlus(player: Player, plus: string[]) {
    plus.forEach(p => {
      if (!this.result[player.id.toString()].plus.includes(p)) {
        this.result[player.id.toString()].plus.push(p);
      }
    });
  }

  setMinus(player: Player, minus: string[]) {
    minus.forEach(m => {
      if (!this.result[player.id.toString()].minus.includes(m)) {
        this.result[player.id.toString()].minus.push(m);
      }
    });
  }

  antrang(players: Player[]) {
    players.forEach(player => {
      if (this.order.includes(player.id)) {
        this.result[player.id.toString()].plus.push('antrang');
        this.result[player.id.toString()].plus.push('antrang');
        this.result[player.id.toString()].plus.push('antrang');
      } else {
        this.result[player.id.toString()].minus.push('antrang');
      }
    });
  }

  xu(players: Player[]) {
    let count = 0;
    players.forEach(player => {
      if (!this.order.includes(player.id)) {
        this.result[player.id.toString()].minus.push('xu');
        count++;
      }
    });


    for (let i = 0; i < count; i++) {
      this.result[this.order[0]].plus.push('xu');
      this.result[this.order[0]].plus.push('xu');
    }
  }


  backToHis(id) {
    const history = this.histories.find(his => his.id === id);
    console.log(history.result);
    this.result = {};
    Object.keys(history.result).forEach(playerId => {
      this.result[playerId] = {...history.result[playerId]};
    });
    this.result.id = history.id;
    this.order = [];
    Object.keys(this.result).forEach(key => {
      if (this.result[key].order > 0) {
        this.order.push(Number(key));
      }
    });
    this.order.sort((idA, idB) => {
      if (this.result[idA.toString()].order > this.result[idB.toString()].order) {
        return 1;
      } else {
        return -1;
      }
    });
  }


  deleteHistory() {
    if (this.result.id) {
      this.histories = this.histories.filter(his => his.id !== this.result.id);
      this.reset();
      this.result.id = undefined;
      localStorage.setItem('histories', JSON.stringify(this.histories));
    }
  }
}
