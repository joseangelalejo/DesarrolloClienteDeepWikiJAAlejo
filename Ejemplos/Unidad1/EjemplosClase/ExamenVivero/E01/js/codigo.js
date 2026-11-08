"use strict";
// Variables globales
let oVivero = new Vivero();

datosIniciales();

function datosIniciales() {
  oVivero.altaArbol(new Perenne(1, 100, "Olivo", true));
  oVivero.altaArbol(new Caduco(2, 78, "Melocotonero", "abril"));
  oVivero.altaArbol(new Perenne(3, 50, "Ciprés", false));
  oVivero.altaArbol(new Perenne(4, 75, "Pino piñonero", true));
  oVivero.altaArbol(new Caduco(5, 81, "Melocotonero", "abril"));
  oVivero.altaArbol(new Caduco(6, 110, "Manzano", "mayo"));
  oVivero.altaArbol(new Perenne(7, 80, "Cedro", false));
  oVivero.altaArbol(new Caduco(8, 67, "Naranjo", "marzo"));
  oVivero.altaArbol(new Perenne(9, 90, "Alcornoque", true));
  oVivero.altaArbol(new Caduco(10, 70, "Peral", "marzo"));
}

// Gestión de formularios
function gestionFormularios(sFormularioVisible) {
  ocultarTodosLosFormularios();

  // Hacemos visible el formulario que llega como parámetro
  switch (sFormularioVisible) {
    case "frmAltaArbol":
      frmAltaArbol.style.display = "block";
      break;
    case "frmTallaje":
      frmTallaje.style.display = "block";
      break;
    case "frmListadoPerennes":
      frmListadoPerennes.style.display = "block";
      break;
    case "frmListadoCaducos":
      frmListadoCaducos.style.display = "block";
      break;
    case "TotalArboles":
      alert("Hay " + oVivero.totalArbolesVenta() + " árboles a la venta");
      break;
  }
}

function mostrarAltaArbol() {
  ocultarTodosLosFormularios();

  // Hacemos visible el formulario
  frmAltaArbol.style.display = "block";
}

function ocultarTodosLosFormularios() {
  let oFormularios = document.querySelectorAll("form");

  for (let i = 0; i < oFormularios.length; i++) {
    oFormularios[i].style.display = "none";
  }
}

// aceptarAltaArbol
function aceptarAltaArbol() {
  const sCodigo = frmAltaArbol.txtCodigo.value.trim();
  const sTallaje = frmAltaArbol.txtTallaje.value.trim();
  const sEspecie = frmAltaArbol.txtEspecie.value.trim();
  const sTipoArbol = frmAltaArbol.rbtTipoArbol.value;
  const sFrutal = frmAltaArbol.rbtFrutal.value;
  const sMesFloracion = frmAltaArbol.txtMesFloracion.value.trim();

  // Validación de campos vacíos (si es caduco se exige también el mes de floración)
  if (
    sCodigo === "" ||
    sTallaje === "" ||
    sEspecie === "" ||
    (sTipoArbol === "caduco" && sMesFloracion === "")
  ) {
    alert("Error: Debe rellenar todos los datos correspondientes al árbol.");
    return;
  }

  const iCodigo = Number(sCodigo);
  const iTallaje = Number(sTallaje);

  if (isNaN(iCodigo) || isNaN(iTallaje)) {
    alert("Error: El código y el tallaje deben ser valores numéricos.");
    return;
  }

  let oArbol;
  if (sTipoArbol === "perenne") {
    const bFrutal = sFrutal === "S";
    oArbol = new Perenne(iCodigo, iTallaje, sEspecie, bFrutal);
  } else {
    oArbol = new Caduco(iCodigo, iTallaje, sEspecie, sMesFloracion);
  }

  // Insertar el nuevo árbol
  if (oVivero.altaArbol(oArbol)) {
    alert("Arbol registrado OK");
    frmAltaArbol.reset(); // Vaciamos los campos del formulario
    frmAltaArbol.style.display = "none";
  } else {
    alert("Arbol registrado previamente");
  }
}

function aceptarTallaje() {
  const sCodigo = frmTallaje.txtCodigoArbol.value.trim();
  const sTallaje = frmTallaje.txtTallajeArbol.value.trim();

  // Validar que los campos estén rellenos
  if (sCodigo === "" || sTallaje === "") {
    alert("Error: Debe introducir el código y el nuevo tallaje del árbol.");
    return;
  }

  const iCodigo = Number(sCodigo);
  const iTallaje = Number(sTallaje);

  if (isNaN(iCodigo) || isNaN(iTallaje)) {
    alert("Error: El código y el tallaje deben ser valores numéricos.");
    return;
  }

  let sRespuesta = oVivero.tallajeArbol(iCodigo, iTallaje);

  alert(sRespuesta);

  if (sRespuesta.includes("Correcto") > 0) {
    frmTallaje.reset();
    frmTallaje.style.display = "none";
  }
}

function aceptarListadoPerennes() {
  const sAlturaMinima = frmListadoPerennes.txtAlturaMinima.value.trim();

  if (sAlturaMinima === "" || isNaN(Number(sAlturaMinima))) {
    alert("Error: Debe indicar una altura mínima válida.");
    return;
  }

  const iAlturaMinima = Number(sAlturaMinima);

  let oVentana = open("", "_blank", "");

  oVentana.document.open();
  oVentana.document.write(
    "<h1>Listado de árboles perennes de altura mínima: " +
      iAlturaMinima +
      " cm</h1>",
  );
  oVentana.document.write(oVivero.listadoPerennes(iAlturaMinima));
  oVentana.document.close();
  oVentana.document.title = "Listado perennes";

  // Reseteamos y ocultamos el formulario
  frmListadoPerennes.reset();
  frmListadoPerennes.style.display = "none";
}

function aceptarListadoCaducos() {
  const sMesFloracion = frmListadoCaducos.txtMesListado.value.trim();

  if (sMesFloracion === "") {
    alert("Error: Debe indicar un mes de floración.");
    return;
  }

  let oVentana = open("", "_blank", "");

  oVentana.document.open();
  oVentana.document.write(
    "<h1>Listado de árboles caducos con floración el mes: " +
      sMesFloracion +
      "</h1>",
  );
  oVentana.document.write(oVivero.listadoCaduco(sMesFloracion));
  oVentana.document.close();
  oVentana.document.title = "Listado caducos";

  // Reseteamos y ocultamos el formulario
  frmListadoCaducos.reset();
  frmListadoCaducos.style.display = "none";
}
