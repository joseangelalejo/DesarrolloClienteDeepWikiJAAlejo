function ponerEnNegrita() {
  const frase = frmDatos.frase.value;
  let i,
    salida = "";

  for (i = 0; i < frase.length; i++) {
    if (
      (frase.charCodeAt(i) >= 65 && frase.charCodeAt(i) <= 90) ||
      frase.charAt(i) == "Ñ"
    ) {
      salida += "<b>" + frase.charAt(i) + "</b>";
    } else {
      salida += frase.charAt(i);
    }
  }
  document.getElementById("salida").innerHTML = salida;
}
