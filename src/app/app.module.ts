// Importamos los módulos necesarios desde Angular e Ionic
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

// Importamos el componente principal de la aplicación
import { AppComponent } from './app.component';

// Importamos el módulo de enrutamiento de la aplicación
import { AppRoutingModule } from './app-routing.module';

// Importamos el módulo HttpClientModule para realizar solicitudes HTTP
import { HttpClientModule } from '@angular/common/http';

// Definimos el módulo principal de la aplicación
@NgModule({
  // Declaramos los componentes que pertenecen a este módulo
  declarations: [AppComponent],

  // Importamos los módulos necesarios para la aplicación
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule // Agregamos HttpClientModule aquí para poder hacer solicitudes HTTP
  ],

  // Definimos los proveedores de servicios para la aplicación
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],

  // Especificamos el componente principal que se iniciará al arrancar la aplicación
  bootstrap: [AppComponent],
})
export class AppModule {}
