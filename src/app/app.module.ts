import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './componentes/login/login.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { TurnosComponent } from './componentes/turnos/turnos.component';
import { VerificacionMailComponent } from './componentes/verificacion-mail/verificacion-mail.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { HomeComponent } from './componentes/home/home.component';
import { HorariosProfesionalComponent } from './componentes/horarios-profesional/horarios-profesional.component';
import { AtenderTurnosComponent } from './componentes/atender-turnos/atender-turnos.component';
import { SacarTurnoComponent } from './componentes/sacar-turno/sacar-turno.component';
import { ProximosTurnosComponent } from './componentes/proximos-turnos/proximos-turnos.component';
import { HistorialTurnosComponent } from './componentes/historial-turnos/historial-turnos.component';
import { HabilitarProfesionalComponent } from './componentes/habilitar-profesional/habilitar-profesional.component';
import { AltaAdminComponent } from './componentes/alta-admin/alta-admin.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PrincipalComponent,
    RegistroComponent,
    TurnosComponent,
    VerificacionMailComponent,
    NavbarComponent,
    HomeComponent,
    HorariosProfesionalComponent,
    AtenderTurnosComponent,
    SacarTurnoComponent,
    ProximosTurnosComponent,
    HistorialTurnosComponent,
    HabilitarProfesionalComponent,
    AltaAdminComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-center',
      preventDuplicates: true,
    }),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
