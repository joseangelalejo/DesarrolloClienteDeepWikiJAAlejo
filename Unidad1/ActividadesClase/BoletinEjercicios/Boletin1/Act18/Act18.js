let numero1 = parseFloat(prompt("Introduce el primer número:"));
let numero2 = parseFloat(prompt("Introduce el segundo número:"));
let numero3 = parseFloat(prompt("Introduce el tercer número:"));
console.log("Número 1: " + numero1 + " - Tipo de dato: " + typeof(numero1));
console.log("Número 2: " + numero2 + " - Tipo de dato: " + typeof(numero2));
console.log("Número 3: " + numero3 + " - Tipo de dato: " + typeof(numero3));

if (numero1 > numero2 && numero1 > numero3) {
    console.log("El mayor de los tres números es: " + numero1);
} else if (numero2 > numero1 && numero2 > numero3) {
    console.log("El mayor de los tres números es: " + numero2);
} else if (numero3 > numero1 && numero3 > numero2) {
    console.log("El mayor de los tres números es: " + numero3);
} else if (numero1 === numero2 && numero1 === numero3) {
    console.log("Los tres números son iguales.");
} else if (numero1 === numero2 && numero1 > numero3) {
    console.log("El primer y segundo número son iguales y mayores que el tercero.");
} else if (numero1 === numero3 && numero1 > numero2) {
    console.log("El primer y tercer número son iguales y mayores que el segundo.");
} else if (numero2 === numero3 && numero2 > numero1) {
    console.log("El segundo y tercer número son iguales y mayores que el primero.");
} else {
    console.log("Error en la comparación de los números.");
}