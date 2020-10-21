import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrincipalComponent } from './componentes/principal/principal.component';
import { TurnosComponent } from './componentes/turnos/turnos.component';
import { VerificacionMailComponent } from './componentes/verificacion-mail/verificacion-mail.component';


const routes: Routes = [
  {path: '', component: PrincipalComponent},
  {path: 'test', component: TurnosComponent},
  {path: 'verificacion-mail',component: VerificacionMailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
