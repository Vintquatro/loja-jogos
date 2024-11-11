import { Routes } from '@angular/router';
import { DetalhesUserComponent } from './user/detalhes-user/detalhes-user.component';
import { MainPageComponent } from './main-page/main-page.component';
import { GameDetailsComponent } from './game-details/game-details.component';
import { NotFoundComponent } from './not-found/not-found.component';
export const routes: Routes = [

    { path: 'detalhes-user/:id', title: 'Meu Perfil', component: DetalhesUserComponent },
    { path: '', title: 'Game Trove', component: MainPageComponent },
    { path: 'game/:id', title: 'Game Trove', component: GameDetailsComponent },
    { path: '**', component: NotFoundComponent }
    
];
