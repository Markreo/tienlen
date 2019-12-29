import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {
  MAT_SNACK_BAR_DEFAULT_OPTIONS, MatBottomSheetModule,
  MatButtonModule, MatCardModule,
  MatDialogModule, MatGridListModule,
  MatIconModule,
  MatListModule, MatMenuModule,
  MatInputModule,
  MatSidenavModule,
  MatSnackBar, MatSnackBarContainer, MatSnackBarModule,
  MatToolbarModule, MatRippleModule
} from '@angular/material';
import {GameComponent} from './game/game.component';
import {PlayerService} from './_services/player.service';
import {SettingService} from './_services/setting.service';
import { PlayerComponent } from './player/player.component';
import { PlayerFormComponent } from './player/player-form/player-form.component';
import {FormsModule} from '@angular/forms';
import { ItemsComponent } from './game/items/items.component';
import { SettingComponent } from './setting/setting.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HelpComponent } from './help/help.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    PlayerComponent,
    PlayerFormComponent,
    ItemsComponent,
    SettingComponent,
    HelpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
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
    MatBottomSheetModule,
    FormsModule,
    MatRippleModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  entryComponents: [MatSnackBarContainer, PlayerFormComponent, ItemsComponent],
  providers: [
    PlayerService,
    SettingService,
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 1500, verticalPosition: 'top'}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
