import { Routes } from '@angular/router';
import { DetalhesUserComponent } from './user/detalhes-user/detalhes-user.component';
import { GameDetailsComponent } from './game-details/game-details.component';
export const routes: Routes = [

{ path: 'detalhes-user/:id',component: DetalhesUserComponent },
{ path: 'game/:id', component: GameDetailsComponent }

];
