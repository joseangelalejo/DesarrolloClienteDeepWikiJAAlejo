/*function sumar(a, b) {
  return a + b;
}*/

/*const sumar = function (a, b) {
  return a + b;
};*/

const sumar = (a, b) => a + b;

function realizaSuma(a, b) {
  let resultado;
  resultado = sumar(a, b);
  document.getElementById("salida").innerHTML = resultado;
}

function operaArray() {
  let resultado = "";
  const miArray = [[], "Hola mundo", sumar, 7.6];

  miArray[0][0] = "Hola";
  miArray[0][1] = true;
  miArray[0][23] = 67;

  resultado = miArray.length;

  resultado = miArray[2](4, 5);

  document.getElementById("salida").innerHTML = resultado;
  document.getElementById("salida2").innerHTML = miArray.join(" * ");
}
