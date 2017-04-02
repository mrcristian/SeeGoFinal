import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
//import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import {RegisterUsuarioPage} from '../pages/register-usuario/register-usuario';
import {RegisterPage} from '../pages/register/register';
import {HomeEstudiantePage} from '../pages/home-estudiante/home-estudiante';

//Servicios
import {EstudianteService} from '../providers/estudiante-service';
import {ApartamentoService} from '../providers/apartamento-service';
import {PropietarioService} from '../providers/propietario-service'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    RegisterUsuarioPage,
    RegisterPage,
    HomeEstudiantePage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    RegisterUsuarioPage,
    RegisterPage,
    HomeEstudiantePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EstudianteService,
    ApartamentoService,
    PropietarioService
  ]
})
export class AppModule {}
