/**
 * ! Patrón Adapter
 *  Permite que objetos con interfaces incompatibles trabajen juntos, también es muy
 *  util para utilizar librerías de terceros en nuestra aplicación sin depender
 *  directamente de ellas.
 *
 * * Es útil cuando se quiere reutilizar una clase que no tiene la interfaz que
 * * necesitamos o cuando queremos crear una capa de abstracción para una librería
 * * de terceros.
 *
 * https://refactoring.guru/es/design-patterns/adapter
 */

// Interfaz común para todos los proveedores de almacenamiento
export interface IStorageAdapter {
  saveFile(file: string): Promise<string>;
  deleteFile(file: string): Promise<void>;
}

// Implementaciones existentes (Ejemplo: AWS S3)
export class S3StorageAdapter implements IStorageAdapter {
  async saveFile(file: string): Promise<string> {
    console.log(`Saving ${file} to S3`);
    return `s3://${file}`;
  }

  async deleteFile(file: string): Promise<void> {
    console.log(`Deleting ${file} from S3`);
  }
}

// 🔴 Nuevo servicio incompatible (No sigue la interfaz IStorageAdapter)
export class OldStorageService {
  upload(filePath: string): string {
    console.log(`Uploading ${filePath} to old storage`);
    return `old-storage://${filePath}`;
  }

  remove(filePath: string): void {
    console.log(`Removing ${filePath} from old storage`);
  }
}

// 🔴 No podemos usar OldStorageService directamente porque sus métodos son incompatibles.

// 🔥 Adapter para hacer que OldStorageService funcione como IStorageAdapter
export class OldStorageAdapter implements IStorageAdapter {
  private oldService: OldStorageService;

  constructor() {
    this.oldService = new OldStorageService();
  }

  async saveFile(file: string): Promise<string> {
    return this.oldService.upload(file); // Mapea el método incompatible
  }

  async deleteFile(file: string): Promise<void> {
    return this.oldService.remove(file); // Mapea el método incompatible
  }
}

// ✅ Ahora podemos usar OldStorageAdapter en nuestro código sin problemas.
const storageProvider: IStorageAdapter = new OldStorageAdapter();
storageProvider.saveFile("example.txt"); // Funciona como cualquier otro proveedor
