function cuentaPalabras() {
  let frase = frmDatos.frase.value.trim();
  let i,
    contador,
    enPalabra = true;
  if (frase.length == 0) {
    contador = 0;
  } else {
    contador = 1;
  }
  for (i = 0; i < frase.length; i++) {
    if (frase.charAt(i) == " ") {
      if (enPalabra) {
        contador++;
        enPalabra = false;
      }
    } else if (!enPalabra) {
      enPalabra = true;
    }
  }
  document.getElementById("salida").innerHTML = "La frase tiene " + contador + " palabras";
}
/* Con trim quitamos los espacios en blanco en los dos extremos de la cadena
y con el boolenano enPalabra ignoramos los espacios en blanco repetidos
entre palabras */
