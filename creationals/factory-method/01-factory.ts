/**
 * ! Factory Method:
 * El patrón Factory Method permite crear objetos sin especificar
 * la clase exacta del objeto que se creará.
 *
 * En lugar de eso, delegamos la creación de objetos a subclases o métodos
 * que encapsulan esta lógica.
 *
 * * Es útil cuando una clase no puede anticipar la clase
 * * de objetos que debe crear.
 *
 * https://refactoring.guru/es/design-patterns/factory-method
 *
 */

// Producto (Interfaz común)
interface INotification {
  send(message: string): void;
}

// Productos concretos
class EmailNotification implements INotification {
  send(message: string): void {
    console.log(`Enviando correo: ${message}`);
  }
}

class SMSNotification implements INotification {
  send(message: string): void {
    console.log(`Enviando SMS: ${message}`);
  }
}

class PushNotification implements INotification {
  send(message: string): void {
    console.log(`Enviando notificación push: ${message}`);
  }
}

// Creador (Clase abstracta con el método fábrica)
abstract class NotificationFactory {
  // Método fábrica
  abstract createNotification(): INotification;

  // Lógica común para usar la notificación
  notify(message: string): void {
    const notification = this.createNotification();
    notification.send(message);
  }
}

// Creadores concretos
class EmailNotificationFactory extends NotificationFactory {
  createNotification(): INotification {
    return new EmailNotification();
  }
}

class SMSNotificationFactory extends NotificationFactory {
  createNotification(): INotification {
    return new SMSNotification();
  }
}

class PushNotificationFactory extends NotificationFactory {
  createNotification(): INotification {
    return new PushNotification();
  }
}

// Uso
function main() {
  const factories: { [key: string]: NotificationFactory } = {
    email: new EmailNotificationFactory(),
    sms: new SMSNotificationFactory(),
    push: new PushNotificationFactory(),
  };

  const factory = factories["email"];
  const notification = factory.createNotification();
  notification.send("Hola desde Factory Method");
}

main();
