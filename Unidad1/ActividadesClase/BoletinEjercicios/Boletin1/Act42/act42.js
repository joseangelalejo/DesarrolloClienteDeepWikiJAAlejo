function mostrarNumeros() {
    let numero1 = document.getElementById("numero1").value;
    let numero2 = document.getElementById("numero2").value;
    let numero3 = document.getElementById("numero3").value;
    numero1 = parseInt(numero1);
    numero2 = parseInt(numero2);
    numero3 = parseInt(numero3);
    let numeros = [numero1, numero2, numero3];
    document.getElementById("desordenados").innerHTML = "<b>Numeros desordenados</b>: " + numeros.join(", ");
    numeros.sort(function(a, b) {
        return a - b;
    });
    document.getElementById("resultado").innerHTML = "<b>Numeros ordenados</b>: " + numeros.join(", ");
}