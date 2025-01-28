/**
 * ! Patrón Prototype:

 * Es un patrón de diseño creacional que nos permite copiar objetos existentes sin hacer
 * que el código dependa de sus clases.
 * 
 * * Es útil cuando queremos duplicar el contenido, 
 * * el título y el autor de un documento, por ejemplo o cualquier objeto complejo.
 * 
 * https://refactoring.guru/es/design-patterns/prototype
 */

interface Prototype {
  clone(): Prototype;
}

// la clase PrototypeRegistry es opcional, pero es útil para almacenar los prototipos y poder clonarlos en cualquier momento.
class PrototypeRegistry {
  private prototypes: { [key: string]: Prototype } = {};

  addPrototype(key: string, prototype: Prototype): void {
    this.prototypes[key] = prototype;
  }

  getPrototype(key: string): Prototype | null {
    return this.prototypes[key]?.clone() || null;
  }
}

class FileDocument implements Prototype {
  constructor(public title: string, public content: string, public metadata: Record<string, string>) {}

  clone(): FileDocument {
    // Aquí usamos clonación superficial. Para estructuras más complejas, se puede implementar clonación profunda.
    return new FileDocument(this.title, this.content, { ...this.metadata });
  }
}

function mainPrototype() {
  const document = new FileDocument("Reporte", "Contenido inicial", { author: "Juan", version: "1.0" });
  const documentClone = document.clone();
  documentClone.title = "Reporte Clonado";
  documentClone.metadata.version = "2.0";
  console.log(document);
  console.log(documentClone);
}

function mainPrototypeRegistry() {
  const registry = new PrototypeRegistry();

  const invoiceTemplate = new FileDocument("Factura", "Contenido estándar de factura", { type: "invoice" });
  const receiptTemplate = new FileDocument("Recibo", "Contenido estándar de recibo", { type: "receipt" });

  registry.addPrototype("invoice", invoiceTemplate);
  registry.addPrototype("receipt", receiptTemplate);

  const clonedInvoice = registry.getPrototype("invoice") as FileDocument;
  clonedInvoice.metadata.type = "personalized-invoice";

  console.log(clonedInvoice);
}

mainPrototypeRegistry();
