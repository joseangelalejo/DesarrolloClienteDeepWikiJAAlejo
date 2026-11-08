let numero = parseInt(prompt("Introduce un número entero positivo de hasta tres cifras:"));
console.log(numero)
if (numero >= 0 && numero <= 9) {
    console.log("El número tiene 1 cifra.");
} else if (numero >= 10 && numero <= 99) {
    console.log("El número tiene 2 cifras.");
} else if (numero >=100 && numero <=999) {
    console.log("El número tiene 3 cifras")
} else {
    console.log("ERROR - El numero no tiene 1, 2 ni 3 cifras")
}