function tablaMultiplicar() {
    let num2 = document.getElementById(`numero2`).value;
    document.getElementById(`resultado2`).innerHTML = "Tabla de Multiplicar del " + num2;
    for (let i = 0; i <= 10; i++) {
        document.getElementById(`resultado2`).innerHTML += "<p>" + num2 + " x " + i + " = " + (num2*i) + "</p>";
    }
}

function borrarTabla() {
    document.getElementById(`resultado2`).innerHTML = "";
}