import { Routes } from '@angular/router';
import { DetalhesUserComponent } from './user/detalhes-user/detalhes-user.component';
import { EditProfileComponent } from './user/edit-profile/edit-profile.component';
export const routes: Routes = [

{path: 'detalhes-user/:id',component: DetalhesUserComponent },
{path: 'edit-profile/:id', component: EditProfileComponent },
];
