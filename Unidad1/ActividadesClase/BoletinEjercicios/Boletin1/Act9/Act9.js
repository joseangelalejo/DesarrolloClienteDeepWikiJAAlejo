let nota1 = parseFloat(prompt("Introduce la primera nota:"));
let nota2 = parseFloat(prompt("Introduce la segunda nota:"));
let nota3 = parseFloat(prompt("Introduce la tercera nota:"));

console.log("Nota 1: " + nota1 + " - Tipo de dato: " + typeof(nota1));
console.log("Nota 2: " + nota2 + " - Tipo de dato: " + typeof(nota2));
console.log("Nota 3: " + nota3 + " - Tipo de dato: " + typeof(nota3));

let promedio = (nota1 + nota2 + nota3) / 3;
let mensaje = (promedio >= 7) ? "Promocionado" : "No promocionado";

console.log("Promedio: " + promedio + " - ¿Promociona?: " + mensaje);