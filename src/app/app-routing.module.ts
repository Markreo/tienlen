import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GameComponent} from './game/game.component';
import {SettingComponent} from './setting/setting.component';
import {PlayerComponent} from './player/player.component';
import {HelpComponent} from './help/help.component';

const routes: Routes = [
  {path: '', component: GameComponent},
  {path: 'setting', component: SettingComponent},
  {path: 'player', component: PlayerComponent},
  {path: 'help', component: HelpComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {
}
