let numeroEntero = parseInt(prompt("Introduce un número entero:"));
console.log("Número introducido: " + numeroEntero + " - Tipo de dato: " + typeof(numeroEntero));

if (numeroEntero > 0) {
    console.log("El número es positivo.");
} else if (numeroEntero < 0) {
    console.log("El número es negativo.");
} else if (numeroEntero === 0) {
    console.log("El número es cero.");
}