/**
 * ! Patrón Bridge
 * Este patrón nos permite desacoplar una abstracción de su implementación,
 * de tal forma que ambas puedan variar independientemente.
 *
 * * Es útil cuando se tienen múltiples implementaciones de una abstracción
 * * Se puede utilizar para separar la lógica de negocio de la lógica de presentación
 * * Se puede utilizar para separar la lógica de la interfaz de usuario también.
 *
 */

import { COLORS } from "../../helpers/colors";

// 1. Interfaz NotificationChannel
// Define el método `send`, que cada canal de comunicación implementará.
interface NotificationChannel {
  send(message: string): void;
}

// 2. Implementaciones de Canales de Comunicación

class EmailChannel implements NotificationChannel {
  send(message: string): void {
    console.log(`Enviando correo electrónico: ${message}`);
  }
}

class SMSChannel implements NotificationChannel {
  send(message: string): void {
    console.log(`Enviando SMS: ${message}`);
  }
}

class PushNotificationChannel implements NotificationChannel {
  send(message: string): void {
    console.log(`Enviando Push: ${message}`);
  }
}

// 3. Clase Abstracta Notification
// Define la propiedad `channel` y el método `notify`

abstract class Notification {
  protected channels: NotificationChannel[];

  constructor(channels: NotificationChannel[]) {
    this.channels = channels;
  }

  abstract addChannel(channel: NotificationChannel): void;
  abstract notify(message: string): void;
}

// 4. Clases Concretas de Notificaciones

class AlertNotification extends Notification {
  override notify(message: string): void {
    console.log("\n%cNotificación de Alerta:", COLORS.red);
    this.channels.forEach((channel) => channel.send(message));
  }

  override addChannel(channel: NotificationChannel): void {
    this.channels.push(channel);
  }
}

// 5. Código Cliente para Probar el Bridge

function main() {
  const channels = [new EmailChannel(), new SMSChannel(), new PushNotificationChannel()];

  const alertNotification = new AlertNotification(channels);

  alertNotification.notify("¡Alerta! Se ha detectado un intruso en la red.");
}

main();
