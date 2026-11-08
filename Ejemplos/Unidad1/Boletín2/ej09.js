function procesarFechas() {
  const fecha1 = Date.parse(frmFechas.fecha1.value);
  const fecha2 = Date.parse(frmFechas.fecha2.value);
  let dias,
    meses,
    anios,
    difDias = 0;
  let salida = "";
  if (fecha1 < fecha2) {
    salida = "Fecha 1 es anterior a Fecha 2. La diferencia es de ";
    difDias = (fecha2.valueOf() - fecha1.valueOf()) / (1000 * 3600 * 24);
  } else if (fecha1 > fecha2) {
    salida = "Fecha 1 es posterior a Fecha 2. La diferencia es de ";
    difDias = (fecha1.valueOf() - fecha2.valueOf()) / (1000 * 3600 * 24);
  }
  if (difDias == 0) {
    salida = "Fecha 1 y Fecha 2 son la misma fecha";
  } else {
    anios = Math.floor(difDias / 365);
    meses = Math.floor((difDias - anios * 365) / 30.417); // 365/12=30.417
    dias = Math.floor((difDias - anios * 365) % 30.417);
    salida += anios + " años " + meses + " meses " + dias + " días";
  }
  document.getElementById("salida").innerHTML = salida;
}
