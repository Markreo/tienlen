import {Injectable} from '@angular/core';

@Injectable()
export class SettingService {
  config: any = {};

  constructor() {
    const config = localStorage.getItem('config');
    if (config) {
      this.config = JSON.parse(config);
    } else {
      this.config = {
        ve1: 4,
        ve2: 3,
        ve3: 2,
        ve4: 1,
        heoCo: 4,
        heoRo: 4,
        heoChuon: 2,
        heoBich: 2,
        doithong3: 4,
        doithong4: 4,
        tuquy: 4,
        antrang: 4,
        xu: 4
      };
      localStorage.setItem('config', JSON.stringify(this.config));
    }

  }

  save(config) {
    this.config = config;
    localStorage.setItem('config', JSON.stringify(this.config));
  }

}
