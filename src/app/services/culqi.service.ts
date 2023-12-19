// Importamos los módulos necesarios desde Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

// Declaramos la variable Culqi que se utilizará más adelante (debe ser proporcionada por la librería Culqi)
declare let Culqi: any;

// Definimos el servicio como Injectable
@Injectable()
export class CulqiService {
  // Configuración por defecto para los pagos
  settings: any = {
    title: '',
    currency: '',
    description: '',
    amount: 0
  };

  // Creamos un Subject de RxJS para emitir eventos relacionados con el pago
  private paymentSubject = new Subject<any>();

  // Constructor del servicio, que recibe el módulo HttpClient para hacer solicitudes HTTP
  constructor(private http: HttpClient) {
    // Agregamos un event listener para el evento 'payment_event'
    document.addEventListener('payment_event', (token: any) => {
      // Obtenemos el token del detalle del evento
      const token_id = token.detail;
      // URL para realizar la carga (charge) utilizando la API de Culqi
      const url = 'https://api.culqi.com/v2/charges';

      // Emitimos un evento indicando que se está cargando el pago
      this.paymentSubject.next('on_event_loading_pago');

      // Configuramos los encabezados de la solicitud HTTP
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer sk_test_a28718d55afad746');

      // Creamos el cuerpo de la solicitud en formato JSON
      const body = JSON.stringify({
        amount: this.settings.amount,
        description: 'ejemplo',
        currency_code: 'PEN',
        email: 'developer.williamstoro@gmail.com',
        source_id: token_id
      });

      // Realizamos la solicitud POST al servidor de Culqi
      this.http.post(url, body, { headers }).subscribe(
        // Manejamos la respuesta exitosa del servidor
        (response: any) => {
          // Emitimos un evento indicando que el pago fue exitoso
          this.paymentSubject.next({ event: 'on_event_pago', data: response });
        },
        // Manejamos los errores de la solicitud
        (error: any) => {
          // Emitimos un evento indicando que hubo un error en el pago
          this.paymentSubject.next({ event: 'on_event_pago_error', data: error });
        }
      );
    }, false);
  }

  // Método para obtener un Observable que permite suscribirse a eventos de pago
  getPaymentObservable() {
    return this.paymentSubject.asObservable();
  }

  // Inicializamos la librería Culqi con la clave pública proporcionada
  initCulqi(publicKey: string): void {
    Culqi.publicKey = 'pk_test_10bb8517f10f1e0a';
  }

  // Configuramos el formulario de pago con la descripción y cantidad proporcionadas
  cfgFormulario(descripcion: string, cantidad: number): void {
    this.settings.title = 'Culqi - Ionic';
    this.settings.currency = 'PEN';
    this.settings.description = descripcion;
    this.settings.amount = cantidad;

    Culqi.settings({
      title: 'Culqi - Ionic',
      currency: 'PEN',
      description: descripcion,
      amount: cantidad,
      order: 'ord_live_0CjjdWhFpEAZlxlz'
    });
  }

  // Método para abrir el formulario de pago proporcionado por Culqi
  open(): void {
    Culqi.open();
  }
}
