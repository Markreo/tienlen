import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MAT_SNACK_BAR_DEFAULT_OPTIONS, MatBottomSheetModule,
  MatButtonModule, MatCardModule,
  MatDialogModule, MatGridListModule,
  MatIconModule,
  MatListModule, MatMenuModule,
  MatSidenavModule,
  MatSnackBar, MatSnackBarContainer, MatSnackBarModule,
  MatToolbarModule
} from '@angular/material';
import {GameComponent} from './game/game.component';
import {SettingComponent} from './setting/setting.component';
import {AppRoutingModule} from './app-routing.module';
import {PlayerComponent} from './player/player.component';
import {PlayerFormComponent} from './player/player-form/player-form.component';
import {PlayerService} from './_services/player.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {SettingService} from './_services/setting.service';
import { HangComponent } from './game/hang/hang.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    SettingComponent,
    PlayerComponent,
    PlayerFormComponent,
    HangComponent
  ],
  entryComponents: [PlayerFormComponent, MatSnackBarContainer, HangComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    MatInputModule,
    MatSnackBarModule,
    MatMenuModule,
    MatCardModule,
    MatGridListModule,
    MatBottomSheetModule
  ],
  providers: [
    PlayerService,
    SettingService,
    MatSnackBar,
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 1500, verticalPosition: 'top'}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
