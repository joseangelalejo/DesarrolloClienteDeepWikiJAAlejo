let strSalida = "";
let num = 2;
for (let i = 0; i < 100; i++) {
  while (!comprobar(num)) {
    num++;
  }
  if (i == 99) {
    strSalida += num;
  } else {
    strSalida += num + " - ";
  }
  num++;
}
document.getElementById("salida").innerHTML = strSalida;

function comprobar(iNumero) {
  let bEsPrimo = true;
  let i = 2;
  let iLimiteMaximo = Math.floor(Math.sqrt(iNumero));

  while (bEsPrimo && i <= iLimiteMaximo) {
    if (iNumero % i == 0) {
      bEsPrimo = false;
    }
    i++;
  }
  return bEsPrimo;
}
