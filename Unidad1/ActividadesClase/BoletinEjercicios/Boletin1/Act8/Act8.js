function mostrarNota() {
    let notaInput = document.getElementById("nota");
    let nota = parseFloat(notaInput.value);
    let mensaje = (nota >= 4) ? "Aprobado" : "Suspenso";
    console.log("Nota: " + nota + " - Tipo de dato: " + typeof(nota));
    document.getElementById("salida").innerHTML = mensaje;
}