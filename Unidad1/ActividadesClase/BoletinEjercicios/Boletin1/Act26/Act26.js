let suma = 0;

for (let i = 1; i <=5; i++) {
    let numero = parseInt(prompt("Introduce un número:"));
    suma += numero;
    console.log("Número introducido: " + numero + " - Suma acumulada: " + suma);
}
console.log("La suma total de los 5 números introducidos es: " + suma);