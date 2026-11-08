function esPrimo() {
    let numero = document.getElementById("numero").value;
    numero = parseInt(numero);
    let esPrimo = true;

    for (let i = 2; i <= (numero**0.5); i++) {
        if (numero % i == 0) {
            esPrimo = false;
        }
    }

    if (numero < 2) {
        document.getElementById("mensaje").innerHTML = "No hay números primos menores que 2"; // caso especial
    } else if (esPrimo) {
        document.getElementById("mensaje").innerHTML = "El número " + numero + " es primo"; // es primo
    } else {
        document.getElementById("mensaje").innerHTML = "El número " + numero + " no es primo"; // no es primo
    }
}
