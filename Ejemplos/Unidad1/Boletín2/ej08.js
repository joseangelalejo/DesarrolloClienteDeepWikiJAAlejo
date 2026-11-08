function mostrarFecha() {
  const opcion = frmOpcion.opcion.value;
  const d = new Date();
  let salida = "";
  const dias = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];

  switch (opcion) {
    case "fecha":
      salida = d.toLocaleDateString();
      break;
    case "hora":
      salida = d.toLocaleTimeString();
      break;
    case "dia":
      salida = dias[d.getDay()];
      break;
    default:
      salida = dias[d.getDay()] + " " + d.toLocaleString();
  }

  document.getElementById("salida").innerHTML = salida;
}
