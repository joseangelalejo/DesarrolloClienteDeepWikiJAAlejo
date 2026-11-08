let min = 0,
  seg = 0,
  dec = 0;
let estaFuncionando = false;
let miIntervalo;

function actualizaCronometro() {
  if (dec < 9) {
    dec++;
  } else if (dec == 9 && seg < 59) {
    dec = 0;
    seg++;
  } else if (dec == 9 && seg == 59) {
    dec = 0;
    seg = 0;
    min++;
  }
  mostrarCronometro();
}

function mostrarCronometro() {
  min > 9
    ? (document.getElementById("min").innerHTML = min)
    : (document.getElementById("min").innerHTML = "0" + min.toString());
  seg > 9
    ? (document.getElementById("seg").innerHTML = seg)
    : (document.getElementById("seg").innerHTML = "0" + seg.toString());
  document.getElementById("dec").innerHTML = dec;
}

function playPause() {
  if (!estaFuncionando) {
    miIntervalo = setInterval(actualizaCronometro, 100);
    estaFuncionando = true;
  } else {
    clearInterval(miIntervalo);
    estaFuncionando = false;
  }
}

function resetearCrono() {
  clearInterval(miIntervalo);
  estaFuncionando = false;
  dec = 0;
  min = 0;
  seg = 0;
  mostrarCronometro();
}
