let numero1 = parseInt(prompt("Introduce un número:"));
let numero2 = parseInt(prompt("Introduce otro número:"));

console.log("Número 1: " + numero1);
console.log("Número 2: " + numero2);
console.log(typeof(numero1));
console.log(typeof(numero2));

suma = numero1 + numero2;
producto = numero1 * numero2;
console.log("\nTipos\nTipo de 'suma': " + typeof(suma) + "\nTipo de 'producto': " + typeof(producto));
console.log("\nSuma: " + suma);
console.log("Producto: " + producto);