let numero1 = parseFloat(prompt("Introduce el primer número:"));
let numero2 = parseFloat(prompt("Introduce el segundo número:"));
console.log("Número 1: " + numero1 + " - Numero 2: " + numero2);
if (numero1 > numero2) {
    suma = numero1 + numero2;
    diferencia = numero1 - numero2;
    console.log("Suma: " + suma + "\nDiferencia: " + diferencia)
} else if (numero2 > numero1) {
    producto = numero1*numero2
    division = numero1/numero2
    console.log("Producto: " + producto + "\nDivisión: " + division)
} else if (numero1 == numero2) {
    console.log("Los números son iguales.");
}