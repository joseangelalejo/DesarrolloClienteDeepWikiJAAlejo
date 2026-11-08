let num1, num2;
let operacionAritmetica;
function mostrarDigito(num) {
  let pantallaActual = formularioCalculadora.pantallaCalculadora.value;
  if (pantallaActual === "0") {
    pantallaActual = num;
  } else {
    pantallaActual += num;
  }
  formularioCalculadora.pantallaCalculadora.value = pantallaActual;
}

function operacion(op) {
  operacionAritmetica = op;
  num1 = Number(formularioCalculadora.pantallaCalculadora.value);
  formularioCalculadora.pantallaAuxiliar.value = num1 + op;
  formularioCalculadora.pantallaCalculadora.value = "0";
}

function mostrarResultado() {
  let resultado;
  num2 = Number(formularioCalculadora.pantallaCalculadora.value);
  formularioCalculadora.pantallaAuxiliar.value += num2 + "=";
  if (operacionAritmetica === "+") {
    resultado = num1 + num2;
  } else if (operacionAritmetica === "-") {
    resultado = num1 - num2;
  } else if (operacionAritmetica === "x") {
    resultado = num1 * num2;
  } else if (operacionAritmetica === "/") {
    resultado = num1 / num2;
  }
  formularioCalculadora.pantallaCalculadora.value = resultado;
}
