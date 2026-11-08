function mostrarReloj() {
  let d = new Date();
  document.getElementById("reloj").innerHTML = d.toLocaleTimeString();
}

setInterval(mostrarReloj, 1000);
