/**
 * ! Patrón Builder:
 * Es un patrón de diseño creacional que nos permite construir objetos complejos
 * paso a paso.
 *
 * El patrón nos permite producir distintos tipos y representaciones
 * de un objeto empleando el mismo código de construcción.
 *
 * * Es útil cuando necesitamos construir un objeto complejo con muchas partes
 * * y queremos que el proceso de construcción sea independiente de las partes
 * * que lo componen.
 *
 * https://refactoring.guru/es/design-patterns/builder
 */

import { COLORS } from "../../helpers/colors";

class Computer {
  public cpu: string = "cpu default";
  public ram: string = "ram default";
  public storage: string = "storage default";
  public gpu?: string;

  displayConfigutation() {
    console.log(`Configuration:
      CPU: ${this.cpu}, 
      RAM: ${this.ram}, 
      STORAGE: ${this.storage}, 
      GPU: ${this.gpu}`);
  }
}

class ComputerBuilder {
  private computer: Computer;

  constructor() {
    this.computer = new Computer();
  }

  setCpu(cpu: string) {
    this.computer.cpu = cpu;
    return this;
  }

  setRam(ram: string) {
    this.computer.ram = ram;
    return this;
  }

  setStorage(storage: string) {
    this.computer.storage = storage;
    return this;
  }

  setGpu(gpu: string) {
    this.computer.gpu = gpu;
    return this;
  }

  build() {
    return this.computer;
  }
}

function main() {
  const basicComputer = new ComputerBuilder().setCpu("Intel core i3").setRam("4gb").setStorage("256Gb HDD").build();

  console.log("%cConfiguration of basic computer:", COLORS.blue);
  basicComputer.displayConfigutation();

  const gamingComputer = new ComputerBuilder().setCpu("Intel core i7").setRam("16gb").setStorage("1Tb SSD").setGpu("Nvidia RTX 3080").build();

  console.log("%cConfiguration of gaming computer:", COLORS.green);
  gamingComputer.displayConfigutation();
}

main();
