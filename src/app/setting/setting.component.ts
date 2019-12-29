import { Component, OnInit } from '@angular/core';
import {SettingService} from '../_services/setting.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  config: any;

  constructor(private settingService: SettingService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.config = this.settingService.config;
  }

  save() {
    this.settingService.save(this.config);
    this.snackBar.open('save!');
  }

}
