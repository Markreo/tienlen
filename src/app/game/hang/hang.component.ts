import {Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material';
import {GameComponent} from '../game.component';
import {SettingService} from '../../_services/setting.service';

@Component({
  selector: 'app-hang',
  templateUrl: './hang.component.html',
  styleUrls: ['./hang.component.css']
})
export class HangComponent implements OnInit {
  selected: any[] = [];
  config: any;

  constructor(private bottomSheetRef: MatBottomSheetRef<GameComponent>,
              private settingService: SettingService) {
  }

  ngOnInit() {
    this.config = this.settingService.config;
  }

  total(options) {
    return options.reduce((olvalue, option) => {
      return olvalue * this.config[option.value];
    }, 1);
  }

  onOK(options) {
    this.bottomSheetRef.dismiss(options.map(o => o.value));
  }
}
