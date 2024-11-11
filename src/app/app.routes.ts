import { Routes } from '@angular/router';
import { GameDetailsComponent } from './game-details/game-details.component';

export const routes: Routes = [
    { path: 'game/:id', component: GameDetailsComponent }
];
