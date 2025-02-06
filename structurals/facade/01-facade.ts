/**
 * ! Patrón Facade
 * Este patrón proporciona una interfaz unificada para un conjunto de interfaces
 * en un subsistema.
 *
 * Facade define una interfaz de nivel más alto que hace que el subsistema
 * sea más fácil de usar.
 *
 * * Es útil cuando un subsistema es complejo o difícil de entender para
 * * proporcionar una interfaz simplificada para el cliente.
 *
 * https://refactoring.guru/es/design-patterns/facade
 */

// Subsistema de pagos completo

// Simula una clase para validar tarjetas
class CardValidator {
  validate(cardNumber: string): boolean {
    console.log(`🔍 Validando tarjeta ${cardNumber}`);
    return cardNumber.length === 16; // Ejemplo básico de validación
  }
}

// Simula un sistema de autorización de pagos
class PaymentProcessor {
  authorize(amount: number): boolean {
    console.log(`💳 Autorizando pago de $${amount}`);
    return amount > 0;
  }
}

// Simula un sistema de notificaciones
class NotificationService {
  sendNotification(message: string): void {
    console.log(`📩 Enviando notificación: ${message}`);
  }
}

class PaymentFacade {
  private cardValidator: CardValidator;
  private paymentProcessor: PaymentProcessor;
  private notificationService: NotificationService;

  constructor() {
    this.cardValidator = new CardValidator();
    this.paymentProcessor = new PaymentProcessor();
    this.notificationService = new NotificationService();
  }

  // ✅ Método simple para procesar pagos
  processPayment(cardNumber: string, amount: number): void {
    if (!this.cardValidator.validate(cardNumber)) {
      console.log("❌ Tarjeta inválida. Pago rechazado.");
      return;
    }

    if (!this.paymentProcessor.authorize(amount)) {
      console.log("❌ Error al autorizar el pago.");
      return;
    }

    console.log("✅ Pago exitoso.");
    this.notificationService.sendNotification(`Pago de $${amount} realizado con éxito.`);
  }
}

function facadeMain() {
  const paymentFacade = new PaymentFacade();

  // El cliente solo llama a un método en lugar de interactuar con múltiples clases
  paymentFacade.processPayment("1234567812345678", 100);
}

facadeMain();
