/**
 * ! Abstract Factory:
 * Es un patrón de diseño que permite crear familias de objetos relacionados
 * sin especificar sus clases concretas.
 *
 * En lugar de crear objetos individuales directamente,
 * creamos fábricas que producen un conjunto de objetos relacionados.
 *
 * * Es útil cuando necesitas crear objetos que son parte de una familia
 * * y quieres asegurarte de que estos objetos se complementen entre sí.
 *
 * https://refactoring.guru/es/design-patterns/abstract-factory
 */

/**
 *  El propósito del Abstract Factory es crear familias de objetos relacionados
 *  (en este caso, hamburguesas y bebidas) sin especificar las clases concretas
 *  de cada uno de esos objetos en el código principal.
 */

// Productos de la familia
interface Button {
  render(): void;
}

interface TextBox {
  render(): void;
}

// Productos concretos para Light Theme
class LightButton implements Button {
  render(): void {
    console.log("Rendering light theme button");
  }
}

class LightTextBox implements TextBox {
  render(): void {
    console.log("Rendering light theme text box");
  }
}

// Productos concretos para Dark Theme
class DarkButton implements Button {
  render(): void {
    console.log("Rendering dark theme button");
  }
}

class DarkTextBox implements TextBox {
  render(): void {
    console.log("Rendering dark theme text box");
  }
}

// Interfaz de la fábrica abstracta
interface ThemeFactory {
  createButton(): Button;
  createTextBox(): TextBox;
}

// Fábrica para Light Theme
class LightThemeFactory implements ThemeFactory {
  createButton(): Button {
    return new LightButton();
  }

  createTextBox(): TextBox {
    return new LightTextBox();
  }
}

// Fábrica para Dark Theme
class DarkThemeFactory implements ThemeFactory {
  createButton(): Button {
    return new DarkButton();
  }

  createTextBox(): TextBox {
    return new DarkTextBox();
  }
}

// Cliente
class Application {
  private button: Button;
  private textBox: TextBox;

  constructor(factory: ThemeFactory) {
    this.button = factory.createButton();
    this.textBox = factory.createTextBox();
  }

  renderUI(): void {
    this.button.render();
    this.textBox.render();
  }
}

// Selección de la fábrica en tiempo de ejecución
const isDarkMode = true; // Cambiar dinámicamente
const factory: ThemeFactory = isDarkMode ? new DarkThemeFactory() : new LightThemeFactory();

// Crear la aplicación con la fábrica seleccionada
const app = new Application(factory);

// Renderizar la UI
app.renderUI();
