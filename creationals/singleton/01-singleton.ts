/**
 * ! Singleton:
 * Es un patrón de diseño creacional que garantiza que una clase
 * tenga una única instancia y proporciona un punto de acceso global a ella.
 *
 * * Es útil cuando necesitas controlar el acceso a una única instancia
 * * de una clase, como por ejemplo, en un objeto de base de datos o en un
 * * objeto de configuración.
 *
 * https://refactoring.guru/es/design-patterns/singleton
 */

class DragonBall {
  private static instance: DragonBall;
  private ballsCollected: number;
  private constructor() {
    this.ballsCollected = 0;
  }

  static getInstance(): DragonBall {
    if (!DragonBall.instance) {
      DragonBall.instance = new DragonBall();
    }

    return DragonBall.instance;
  }

  collectDragonBall(): void {
    if (this.ballsCollected < 7) {
      this.ballsCollected++;
      console.log(`Esferas del dragón recolectadas: ${this.ballsCollected}/7`);
    }
    console.log("¡Ya tengo las 7 esferas del dragón!");
  }

  // Métodos de la clase
  summonShenron(): void {
    console.log("Aún faltan esferas por recolectar", 7 - this.ballsCollected);
  }
}

function mainSingleton() {
  const goku = DragonBall.getInstance();
  goku.collectDragonBall();
  goku.collectDragonBall();
  goku.collectDragonBall();

  goku.summonShenron();
}

mainSingleton();
