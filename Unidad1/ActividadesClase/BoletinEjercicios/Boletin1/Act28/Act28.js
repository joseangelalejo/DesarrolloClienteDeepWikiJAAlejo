let alturas = []
console.log(alturas);
let sumaAlturas = 0;
for (let i = 0; i<5; i++) {
    let nuevaltura = parseInt(prompt("Introduzca su altura en cm: "));
    console.log("Nueva altura: " + nuevaltura + " - Tipodato" + typeof(nuevaltura));
    alturas.push(nuevaltura);
    console.log("Array de alturas actual: " + console.log(alturas));
    sumaAlturas+=nuevaltura
}
console.log(sumaAlturas)
let promedio = sumaAlturas/alturas.length
console.log(promedio)
alert("Promedio de alturas: " + promedio)