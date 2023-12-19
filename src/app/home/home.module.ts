// Importamos los módulos necesarios desde Angular e Ionic
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Importamos el componente HomePage y el servicio CulqiService
import { HomePage } from './home.page';
import { CulqiService } from '../services/culqi.service';

// Definimos el módulo específico para la página HomePage
@NgModule({
  // Declaramos el componente que pertenece a este módulo
  declarations: [HomePage],

  // Importamos los módulos necesarios para la página
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],

  // Definimos los proveedores de servicios específicos para esta página
  providers: [
    CulqiService, // Agregamos CulqiService como proveedor para esta página
  ],
})
export class HomePageModule {}
