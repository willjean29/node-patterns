/**
 * ! Patrón Bridge
 * Este patrón nos permite desacoplar una abstracción de su implementación,
 * de tal forma que ambas puedan variar independientemente.
 *
 * * Es útil cuando se tienen múltiples implementaciones de una abstracción
 * * Se puede utilizar para separar la lógica de negocio de la lógica de presentación
 * * Se puede utilizar para separar la lógica de la interfaz de usuario también.
 *
 * https://refactoring.guru/es/design-patterns/bridge
 */
import { COLORS } from "../../helpers/colors";

interface Ability {
  use(): void;
}

class SwordAttack implements Ability {
  use(): void {
    console.log("Ataque con %cespada poderosa", COLORS.blue);
  }
}

class AxeAttack implements Ability {
  use(): void {
    console.log("Ataque con %chacha avanzada", COLORS.green);
  }
}

class MagicSpell implements Ability {
  use(): void {
    console.log("Lanzando %chechizo mágico", COLORS.purple);
  }
}

class FireballSpell implements Ability {
  use(): void {
    console.log("Lanzando %cbola de fuego", COLORS.red);
  }
}

abstract class Character {
  protected ability: Ability;

  constructor(ability: Ability) {
    this.ability = ability;
  }

  setAbility(ability: Ability): void {
    this.ability = ability;
  }

  abstract attack(): void;
}

class Warrior extends Character {
  attack(): void {
    console.log("Guerrero:");
    this.ability.use();
  }
}

class Mage extends Character {
  attack(): void {
    console.log("Mago:");
    this.ability.use();
  }
}

function bridgeMain() {
  const swordAttack = new SwordAttack();
  const axeAttack = new AxeAttack();
  const magicSpell = new MagicSpell();
  const fireballSpell = new FireballSpell();

  const warrior = new Warrior(swordAttack);
  const mage = new Mage(magicSpell);

  warrior.attack();
  mage.attack();

  warrior.setAbility(axeAttack);
  mage.setAbility(fireballSpell);

  warrior.attack();
  mage.attack();
}

bridgeMain();
