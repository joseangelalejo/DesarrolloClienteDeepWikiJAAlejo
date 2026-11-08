relojDigital();
setInterval(relojDigital, 1000);

function relojDigital() {
    const fecha = new Date();
    let horas1 = fecha.getHours();
    let minutos1 = fecha.getMinutes();
    let segundos1 = fecha.getSeconds();
    document.getElementById("reloj").innerHTML = `${horas1}:${minutos1}:${segundos1}`;
}
/* La función relojDigital() se puede hacer aún más simple
    usando toLocaleTimeString() para mostrar la hora en formato local:
document.getElementById("reloj").innerHTML = new Date().toLocaleTimeString();
*/
/* Podemos parar intervalos usando clearInterval() */

// CRONOMETRO

const crono = document.getElementById("cronometro");
let minutos = 0;
let segundos = 0;
let decimas = 0;
let intervalo;
let estaFuncionando = false;
mostrarCrono();

function mostrarCrono() {
    crono.innerHTML = `${minutos}:${segundos}:${decimas}`;
}

function iniciarCrono() {
    if (!estaFuncionando) {
        estaFuncionando = true;
        intervalo = setInterval(() => {
            decimas++;
            if (decimas == 10) {
                segundos++;
                decimas = 0;
            }
            if (segundos == 60) {
                minutos++;
                segundos = 0;
            }
            mostrarCrono();      
        }, 100);
    }
}

function pararCrono() {
    estaFuncionando = false;
    clearInterval(intervalo);
}

function resetearCrono() {
    estaFuncionando = false;
    clearInterval(intervalo);
    minutos = 0;
    segundos = 0;
    decimas = 0;
    mostrarCrono();
}