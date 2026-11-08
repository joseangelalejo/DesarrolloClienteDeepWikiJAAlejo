// Ejercicio 39
// Array para guardar los 100 numeros primos (desde 0 )

let numero = 0;
function esPrimo(numero) {  // Para comprobar si un numero es primo
    if (numero < 2) {
        return false;
    }
    let primo = true;
    for (let i = 2; i < numero; i++) {
        if (numero % i === 0) {
            primo = false;
            break;
        }
    }
    return primo;
}
function mostrarNumeros() {
    let primos = [];
    let candidato = 2;
    let contador = 0;
    while (contador < 100) {
        if (esPrimo(candidato)) {
            primos.push(candidato);
            contador++;
        }
        candidato++;
    }
    document.getElementById("resultado").innerHTML = ""; // Para limpiar
    // For para mostrar los numeros en pantalla
    for (let i = 0; i < primos.length; i++) {
        document.getElementById("resultado").innerHTML += "<li>" + primos[i] + "</li>";
    }
}