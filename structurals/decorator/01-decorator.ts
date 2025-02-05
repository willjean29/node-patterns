/**
 * ! Patrón decorador
 * Es un patrón de diseño estructural que permite añadir
 * funcionalidades a objetos, colocando estos objetos dentro de
 * objetos encapsuladores especiales que contienen estas funcionalidades.
 *
 * No confundirlo con los decoradores de TypeScript que son anotaciones.
 *
 * * Es útil cuando necesitas añadir funcionalidades a objetos
 *  * de manera dinámica y flexible.
 *
 * https://refactoring.guru/es/design-patterns/decorator
 */

import { COLORS } from "../../helpers/colors";

interface Notification {
  send(message: string): void;
}

class BasicNotification implements Notification {
  send(message: string): void {
    console.log(`%cMensaje de notificacion básico ${message}`, COLORS.green);
  }
}

abstract class NotificationDecorator implements Notification {
  protected notification: Notification;

  constructor(notification: Notification) {
    this.notification = notification;
  }

  send(message: string): void {
    this.notification.send(message);
  }
}

class EmailNotification extends NotificationDecorator {
  send(message: string): void {
    super.send(message);
    console.log(`%cNotificación por correo electrónico`, COLORS.blue);
  }
}

class SMSNotification extends NotificationDecorator {
  send(message: string): void {
    super.send(message);
    console.log(`%cNotificación por SMS`, COLORS.purple);
  }
}

class PushNotification extends NotificationDecorator {
  send(message: string): void {
    super.send(message);
    console.log(`%cNotificación por Push`, COLORS.red);
  }
}

// in this example, we have a basic notification that can be decorated with
function decoratorMain() {
  let notification = new BasicNotification();

  notification = new EmailNotification(notification);
  notification = new SMSNotification(notification);
  notification = new PushNotification(notification);

  notification.send("Nuevo mensaje");
}

decoratorMain();
