function diferenciaHoras() {
  const h1 = Number(frmHoras.h1.value);
  const m1 = Number(frmHoras.m1.value);
  const h2 = Number(frmHoras.h2.value);
  const m2 = Number(frmHoras.m2.value);
  let totalDiferenciaMinutos = h1 * 60 + m1 - (h2 * 60 + m2);
  let salida = "";
  let difMin, difHor;
  if (totalDiferenciaMinutos < 0) {
    salida = "H1 es anterior a H2. La diferencia de tiempo es ";
    totalDiferenciaMinutos = totalDiferenciaMinutos * -1; //Pasarla a positivo
  } else if (totalDiferenciaMinutos > 0) {
    salida = "H1 es posterior a H2. La diferencia de tiempo es ";
  }
  if (totalDiferenciaMinutos == 0) {
    salida = "Son la misma hora";
  } else {
    difHor = Math.floor(totalDiferenciaMinutos / 60); //Parte entera
    difMin = totalDiferenciaMinutos % 60;
    salida += String(difHor) + " horas y " + String(difMin) + " minutos";
  }
  document.getElementById("salida").innerHTML = salida;
}
