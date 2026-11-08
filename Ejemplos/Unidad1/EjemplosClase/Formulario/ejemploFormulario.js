function mostrarDatos() {
    let nombre,apellidos,mensajeSalida;
    nombre=frmDatos.iNombre.value;
    apellidos=frmDatos.iApellidos.value;
    mensajeSalida="Hola, " + nombre + " " + apellidos;
    document.getElementById("salida").innerHTML=mensajeSalida
}





