import { Routes } from '@angular/router';
import { DetalhesUserComponent } from './user/detalhes-user/detalhes-user.component';
import { MainPageComponent } from './main-page/main-page.component';
import { GameDetailsComponent } from './game-details/game-details.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { EditProfileComponent } from './user/edit-profile/edit-profile.component';
import { GamelistComponent } from './user/gamelist/gamelist.component';


export const routes: Routes = [

    { path: '', title: 'Game Trove', component: MainPageComponent },
    { path: 'game/:id', title: 'Game Trove', component: GameDetailsComponent },
    { path: 'detalhes-user/:id', component: DetalhesUserComponent },
    { path: 'edit-profile/:id', component: EditProfileComponent },
    { path: 'gamelist/:id', component:GamelistComponent },
    { path: '**', component: NotFoundComponent }

];
