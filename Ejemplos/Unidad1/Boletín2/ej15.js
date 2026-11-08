let intervalo = setInterval(pedirNumeroMostrarTabla, 5000);
let tabla = [];

// Calcular letraDNI
function letraDNI(numeroDni) {
  let letras = [
    "T",
    "R",
    "W",
    "A",
    "G",
    "M",
    "Y",
    "F",
    "P",
    "D",
    "X",
    "B",
    "N",
    "J",
    "Z",
    "S",
    "Q",
    "V",
    "H",
    "L",
    "C",
    "K",
    "E",
    "T",
  ];
  return letras[numeroDni % 23];
}

function pedirNumeroMostrarTabla() {
  let letra;
  let cad = prompt("Dime el DNI o -1 para parar", "12345678");
  if (cad === "-1") {
    // Usando la variable global intervalo, paramos el setInterval
    clearInterval(intervalo);
    // Mostramos el array
    alert(tabla.join(" - "));
  } else {
    letra = letraDNI(cad);
    tabla.push(letra);
  }
}
