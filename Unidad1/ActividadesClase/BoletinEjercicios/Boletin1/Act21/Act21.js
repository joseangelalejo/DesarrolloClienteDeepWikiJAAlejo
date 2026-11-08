let numero1 = parseInt(prompt("Introduce el primer número:"));
let numero2 = parseInt(prompt("Introduce el segundo número:"));
let numero3 = parseInt(prompt("Introduce el tercer número:"));
console.log("Número 1: " + numero1 + " - Tipo de dato: " + typeof(numero1));
console.log("Número 2: " + numero2 + " - Tipo de dato: " + typeof(numero2));
console.log("Número 3: " + numero3 + " - Tipo de dato: " + typeof(numero3));

if (numero1 < 10 && numero2 < 10 && numero3 < 10) {
    console.log("Todos los números son menores que 10.");
}