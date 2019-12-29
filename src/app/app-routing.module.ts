import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GameComponent} from './game/game.component';
import {PlayerComponent} from './player/player.component';
import {SettingComponent} from './setting/setting.component';
import {HelpComponent} from './help/help.component';


const routes: Routes = [
  {path: '', component: GameComponent},
  {path: 'setting', component: SettingComponent},
  {path: 'player', component: PlayerComponent},
  {path: 'help', component: HelpComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
