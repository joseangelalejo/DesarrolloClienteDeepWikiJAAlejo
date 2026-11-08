/*
En JavaScript no existe el método input(), si existe el prompt()
*/
let nombre1 = prompt("Introduce tu nombre:");
let edad1 = prompt("Introduce tu edad:");

document.getElementById("salida1").innerHTML = "Nombre: " + nombre1 + "<br>Edad: " + edad1;

let nombre2 = document.getElementById("nombre");
let edad2 = document.getElementById("edad");

// Apartado B

function mostrarCampos() {
    let nombreValue = nombre2.value;
    let edadValue = edad2.value;
    document.getElementById("salida2").innerHTML = "Nombre: " + nombreValue + "<br>Edad: " + edadValue;
}