function procesarDatos() {
        let nombre = String(frmDatos.nombre.value).trim();
        let apellidos = String(frmDatos.apellidos.value).trim();
        let temp, salida;

        temp = nombre.replace(" ", "");
        temp += apellidos.replace(" ", "");
        salida = temp.length + " caracteres sin contar los espacios<br>";
        salida += nombre.toUpperCase() + " " + apellidos.toUpperCase() + "<br>";
        salida += nombre.toLowerCase() + " " + apellidos.toLowerCase() + "<br>";
        salida +=
          nombre +
          "<br>" +
          apellidos.slice(0, apellidos.indexOf(" ")) +
          "<br>" +
          apellidos.slice(apellidos.indexOf(" ")) +
          "<br>";
        temp = nombre.charAt(0);
        temp += apellidos.slice(0, 3) + apellidos.slice(apellidos.indexOf(" ") + 1).slice(0, 3);
        salida += "Nombre de Usuario: " + temp.toLowerCase();

        document.getElementById("salida").innerHTML = salida;
      }