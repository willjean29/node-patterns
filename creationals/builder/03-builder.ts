// Producto final: Car
class Car {
  public engine?: string;
  public seats?: number;
  public GPS?: boolean;

  public showDetails(): void {
    console.log(`Car Details: Engine=${this.engine}, Seats=${this.seats}, GPS=${this.GPS}`);
  }
}

// Interfaz del Builder
interface CarBuilder {
  reset(): this;
  setEngine(engine: string): this;
  setSeats(seats: number): this;
  setGPS(hasGPS: boolean): this;
  getResult(): Car;
}

// Implementación concreta del Builder
class ConcreteCarBuilder implements CarBuilder {
  private car: Car;

  constructor() {
    this.car = new Car();
  }

  public reset(): this {
    this.car = new Car();
    return this;
  }

  public setEngine(engine: string): this {
    this.car.engine = engine;
    return this;
  }

  public setSeats(seats: number): this {
    this.car.seats = seats;
    return this;
  }

  public setGPS(hasGPS: boolean): this {
    this.car.GPS = hasGPS;
    return this;
  }

  public getResult(): Car {
    return this.car;
  }
}

// Director (opcional): controla el proceso de construcción
class CarDirector {
  private builder: CarBuilder;

  constructor(builder: CarBuilder) {
    this.builder = builder;
  }

  public constructSportsCar(): Car {
    return this.builder.reset().setEngine("V8").setSeats(2).setGPS(true).getResult();
  }

  public constructFamilyCar(): Car {
    return this.builder.reset().setEngine("V4").setSeats(5).setGPS(false).getResult();
  }
}

// Uso
const builder = new ConcreteCarBuilder();
const director = new CarDirector(builder);

const sportsCar = director.constructSportsCar();
sportsCar.showDetails(); // Car Details: Engine=V8, Seats=2, GPS=true

const familyCar = director.constructFamilyCar();
familyCar.showDetails(); // Car Details: Engine=V4, Seats=5, GPS=false
