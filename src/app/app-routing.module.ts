import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckLoginGuard } from './guards/check-login.guard'

import { PrincipalComponent } from './componentes/principal/principal.component';
import { HomeComponent } from './componentes/home/home.component';
import { VerificacionMailComponent } from './componentes/verificacion-mail/verificacion-mail.component';


const routes: Routes = [
  {path: '', component: PrincipalComponent},
  {path: 'home', component: HomeComponent, canActivate: [CheckLoginGuard]},
  {path: 'verificacion-mail',component: VerificacionMailComponent},
  {path: '**', component: PrincipalComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
