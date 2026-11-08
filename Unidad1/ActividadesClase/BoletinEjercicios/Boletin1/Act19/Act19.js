let dia = parseInt(prompt("Introduce un número correspondiente al día del mes (1-31): "));
let mes = parseInt(prompt("Introduce un número correspondiente al mes (1-12): "));
console.log("Día introducido: " + dia + " - Mes: " + mes);

if (dia === 25 && mes === 12) {
    console.log("¡Feliz Navidad!");
} else {
    console.log("Hoy no es Navidad. :(");
}