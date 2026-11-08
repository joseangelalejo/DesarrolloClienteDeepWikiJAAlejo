function comprobarPasswd() {
  let passwd = frmDatos.passwd.value;
  let temp, salida;

  if (passwd.length < 8 || passwd.length > 16)
    salida = "ERROR: La contraseña no tiene la longitud adecuado";
  else if (!contieneMayuscula(passwd) || !contieneMinuscula(passwd))
    salida = "ERROR: La contraseña no tiene una mayúscula o minúscula";
  else if (!contieneDigito(passwd))
    salida = "ERROR: La contraseña no tiene ningún dígito";
  else if (!contieneCaracterEspecial(passwd))
    salida = "ERROR: La contraseña no tiene ningún carácter especial";
  else salida = "Contraseña válida";
  document.getElementById("salida").innerHTML = salida;
}

function contieneMayuscula(cadena) {
  let i,
    encontrada = false;
  for (i = 0; i < cadena.length && !encontrada; i++) {
    encontrada = cadena.charCodeAt(i) >= 65 && cadena.charCodeAt(i) <= 90; //Códigos de A - Z
  }
  return encontrada;
}

function contieneMinuscula(cadena) {
  let i,
    encontrada = false;
  for (i = 0; i < cadena.length && !encontrada; i++) {
    encontrada = cadena.charCodeAt(i) >= 97 && cadena.charCodeAt(i) <= 122; // Códigos de a - z
  }
  return encontrada;
}
function contieneDigito(cadena) {
  let i,
    encontrada = false;
  for (i = 0; i < cadena.length && !encontrada; i++) {
    encontrada = cadena.charCodeAt(i) >= 48 && cadena.charCodeAt(i) <= 57; //Código dígito cero: 48 -- código dígito nueve: 57
  }
  return encontrada;
}

function contieneCaracterEspecial(cadena) {
  let i,
    encontrada = false;
  for (i = 0; i < cadena.length && !encontrada; i++) {
    encontrada =
      (cadena.charCodeAt(i) >= 35 && cadena.charCodeAt(i) <= 38) ||
      cadena.charCodeAt(i) == 45 ||
      cadena.charCodeAt(i) == 64 ||
      cadena.charCodeAt(i) == 95; //Códigos de los caracteres especiales
  }
  return encontrada;
}
