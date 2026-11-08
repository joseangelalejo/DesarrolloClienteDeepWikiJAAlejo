let nombreCandidato = "Peter Griffin";
let preguntasRealizadas = 10;
let preguntasAcertadas = 7;
let porcentajeAciertos = (preguntasAcertadas / preguntasRealizadas) * 100;

if (porcentajeAciertos >= 90) {
    console.log(nombreCandidato + " tiene un nivel superior.");
} else if (porcentajeAciertos >= 75 && porcentajeAciertos < 90) {
    console.log(nombreCandidato + " tiene un nivel medio.");
} else if (porcentajeAciertos >= 50&& porcentajeAciertos < 75) {
    console.log(nombreCandidato + " tiene un nivel bajo.");
} else if (porcentajeAciertos < 50) {
    console.log(nombreCandidato + " fuera de nivel.");
} else {
    console.log("Error en el cálculo del porcentaje de aciertos.");
}