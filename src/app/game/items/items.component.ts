import {Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material';
import {GameComponent} from '../game.component';
import {SettingService} from '../../_services/setting.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  config: any;

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: string[],
              private bottomSheetRef: MatBottomSheetRef<GameComponent>,
              private settingService: SettingService) {
  }

  ngOnInit() {
    this.config = this.settingService.config;
  }

  total(options) {
    return options.reduce((olvalue, option) => {
      return olvalue + this.config[option.value];
    }, 0);
  }

  onOK(options) {
    this.bottomSheetRef.dismiss(options.map(o => o.value));
  }
}
