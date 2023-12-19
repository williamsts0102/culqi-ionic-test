// Importamos los módulos necesarios desde Angular e Ionic
import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';

// Importamos el servicio CulqiService
import { CulqiService } from '../services/culqi.service';

// Definimos el componente HomePage
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
})
export class HomePage implements OnInit {
  loading: any;
  monto: number = 0; // Inicializado con un valor predeterminado

  // Constructor del componente, inyectamos los servicios necesarios
  constructor(
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private culqiService: CulqiService
  ) {}

  // Método que se ejecuta al iniciar el componente
  ngOnInit() {
    // Inicializamos el loading y configuramos Culqi
    this.initLoading();
    this.initCulqi();

    // Nos suscribimos a eventos de pago a través del servicio CulqiService
    this.culqiService.getPaymentObservable().subscribe((data: any) => {
      this.handlePaymentEvent(data);
    });
  }

  // Método para abrir el formulario de pago Culqi
  openCheckout() {
    this.initLoading();

    // Verificamos si el servicio CulqiService está disponible
    if (this.culqiService) {
      // Configuramos el formulario con la descripción y monto, y luego lo abrimos
      this.culqiService.cfgFormulario('Pago por servicio', this.monto * 100);
      this.culqiService.open();
    }
  }

  // Método privado para inicializar el loading
  private async initLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Procesando información...',
      spinner: 'crescent',
      duration: 2000,
    });

    // Verificamos si el loading se ha creado y lo mostramos
    if (this.loading) {
      await this.loading.present();
    }
  }

  // Método privado para inicializar Culqi con la clave pública
  private initCulqi() {
    this.culqiService.initCulqi('pk_test_D8qvuHVR5j4fucze'); // Ingresa tu "Public Key" aquí
  }

  // Método privado para manejar eventos de pago
  private handlePaymentEvent(data: any) {
    switch (data.event) {
      case 'on_event_loading_pago':
        this.initLoading();
        break;
      case 'on_event_pago':
        this.handleSuccessfulPayment(data.data);
        break;
      case 'on_event_pago_error':
        this.handlePaymentError(data.data);
        break;
      default:
        break;
    }
  }

  // Método privado para manejar un pago exitoso
  private async handleSuccessfulPayment(response: any) {
    if (this.loading) {
      await this.loading.dismiss();
      // Mostramos un mensaje de éxito con un cuadro de alerta
      const alert = await this.alertCtrl.create({
        header: 'Pago exitoso',
        subHeader: 'Tu pago se realizó con éxito',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }

  // Método privado para manejar errores en el pago
  private async handlePaymentError(error: any) {
    if (this.loading) {
      await this.loading.dismiss();
      // Mostramos un mensaje de error con un cuadro de alerta
      const alert = await this.alertCtrl.create({
        header: 'Error en el pago',
        subHeader: error.error.user_message,
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
}
