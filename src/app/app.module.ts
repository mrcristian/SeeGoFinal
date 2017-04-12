import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
//import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import {RegisterUsuarioPage} from '../pages/register-usuario/register-usuario';
import {RegisterPage} from '../pages/register/register';
import {HomeEstudiantePage} from '../pages/home-estudiante/home-estudiante';
import { HomePropietarioPage } from "../pages/home-propietario/home-propietario";
import {AddApartamentoPage} from '../pages/add-apartamento/add-apartamento';
import {DetallesPage} from '../pages/detalles/detalles';

//Servicios
import {EstudianteService} from '../providers/estudiante-service';
import {ApartamentoService} from '../providers/apartamento-service';
import {PropietarioService} from '../providers/propietario-service'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import {IonicStorageModule} from '@ionic/storage'

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    RegisterUsuarioPage,
    RegisterPage,
    HomeEstudiantePage,
    HomePropietarioPage,
    AddApartamentoPage,
    DetallesPage
    
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    RegisterUsuarioPage,
    RegisterPage,
    HomeEstudiantePage,
    HomePropietarioPage,
    AddApartamentoPage,
    DetallesPage
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
