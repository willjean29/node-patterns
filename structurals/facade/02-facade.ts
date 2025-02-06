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

// !Tarea: Tarea: Sistema de Encendido de una Computadora con el Patrón Facade

import { COLORS } from "../../helpers/colors";

// 1. Clases del Subsistema

class CPU {
  stopOperations(): void {
    console.log("CPU: Deteniendo operaciones.");
  }

  jump(position: number): void {
    console.log(`CPU: Saltando a la posición de memoria ${position}.`);
  }

  execute(): void {
    console.log("CPU: Ejecutando instrucciones.");
  }
}

class HardDrive {
  read(position: number, size: number): string {
    console.log(`HardDrive: Leyendo ${size} bytes desde la posición ${position}.`);
    return "001010001010100";
  }

  close() {
    console.log("HardDrive: Deteniendo disco duro.");
  }
}

class Memory {
  load(position: number, data: string): void {
    console.log(`Memory: Cargando datos en la posición ${position} ${data}.`);
  }

  free(): void {
    console.log("Memory: Liberando memoria.");
  }
}

// 2. Clase Facade - ComputerFacade

class ComputerFacade {
  private cpu: CPU;
  private hardDrive: HardDrive;
  private memory: Memory;
  constructor() {
    this.cpu = new CPU();
    this.hardDrive = new HardDrive();
    this.memory = new Memory();
  }

  startComputer(): void {
    console.log("\n%cIniciando la computadora...", COLORS.cyan);
    this.memory.load(0, this.hardDrive.read(0, 1024));
    this.cpu.jump(0);
    this.cpu.execute();
    console.log("Computadora lista para usar.\n");
  }

  shutDownComputer(): void {
    console.log("\n%cApagando la computadora...", COLORS.red);
    console.log("Cerrando procesos y guardando datos...");
    this.cpu.stopOperations();
    this.memory.free();
    this.hardDrive.close();
    console.log("Computadora apagada.\n");
  }
}

// 3. Código Cliente para Usar la Facade
function main() {
  const computer = new ComputerFacade();

  // Encender la computadora usando la fachada
  computer.startComputer();

  // Apagar la computadora usando la fachada
  computer.shutDownComputer();
}

main();
