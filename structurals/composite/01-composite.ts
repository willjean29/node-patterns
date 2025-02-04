/**
 * ! Patrón Composite
 * Es un patrón de diseño estructural que permite componer objetos
 * en estructuras de árbol para representar jerarquías.
 *
 * El patrón permite a los clientes tratar de manera uniforme a los objetos
 * individuales y a sus composiciones.
 *
 * * Es útil cuando necesitas tratar a los objetos individuales
 * * y a sus composiciones de manera uniforme, y la estructura
 * * de los objetos forma una jerarquía en árbol.
 *
 * https://refactoring.guru/es/design-patterns/composite
 *
 */

interface FileSystemComponent {
  showDetails(indent?: string): void;
}

class CustomFile implements FileSystemComponent {
  constructor(private name: string) {}

  showDetails(indent?: string): void {
    console.log(`${indent}-Archivo: ${this.name}`);
  }
}

class CustomFolder implements FileSystemComponent {
  private children: FileSystemComponent[] = [];

  constructor(private name: string) {}

  add(component: FileSystemComponent): void {
    this.children.push(component);
  }

  showDetails(indent: string = " "): void {
    console.log(`${indent}+Carpeta: ${this.name}`);
    this.children.forEach((child) => {
      child.showDetails(indent + " ");
    });
  }
}

function compositeMain() {
  const file1 = new CustomFile("archivo1.txt");
  const file2 = new CustomFile("archivo2.txt");
  const file3 = new CustomFile("archivo3.txt");
  const file4 = new CustomFile("archivo4.txt");
  const file5 = new CustomFile("archivo5.txt");
  const folder1 = new CustomFolder("Carpeta 1");
  folder1.add(file1);
  folder1.add(file2);

  const folder2 = new CustomFolder("Carpeta 2");
  folder2.add(file3);
  folder2.add(file4);

  const mainFolder = new CustomFolder("Carpeta Principal");
  mainFolder.add(folder1);
  mainFolder.add(folder2);
  mainFolder.add(file5);

  mainFolder.showDetails();
}

compositeMain();
