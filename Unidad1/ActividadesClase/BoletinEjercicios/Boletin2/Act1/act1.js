function mostrarResultados() {
    let nombre = String(document.getElementById("nombre")).value.trim();
    let apellido1 = String(document.getElementById("apellido1")).value.trim();
    let apellido2 = String(document.getElementById("apellido2")).value.trim();

    console.log(nombre + apellido1 + apellido2);

    let nombreCompleto = nombre + " " + apellido1 + " " + apellido2;
    let sinEspacios = nombreCompleto.replaceAll(" ", "");

    console.log(nombreCompleto);
    console.log(sinEspacios);

    let usuario =
        nombre.charAt(0) +
        apellido1.substring(0, 3) +
        apellido2.substring(0, 3);

    console.log(usuario);
    document.getElementById("resultados").innerHTML = `
        <p>Longitud sin espacios: ${sinEspacios.length}</p>
        <p>En minúsculas: ${nombreCompleto.toLowerCase()}</p>
        <p>En mayúsculas: ${nombreCompleto.toUpperCase()}</p>
        <p>${nombre}</p>
        <p>${apellido1}</p>
        <p>${apellido2}</p>
        <p>Nombre de usuario: ${usuario.toLowerCase()}</p>
    `;
}