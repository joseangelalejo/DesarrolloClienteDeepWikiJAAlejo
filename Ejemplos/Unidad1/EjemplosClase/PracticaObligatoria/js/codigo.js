"use strict";

const oAgencia = new Agencia();

// ---------- Gestión de formularios ----------  
function ocultarTodosLosFormularios() {
    document.querySelectorAll("form").forEach(f => f.style.display = "none");
}

function gestionFormularios(sFormularioVisible) {
    ocultarTodosLosFormularios();
    document.getElementById(sFormularioVisible).style.display = "block";
}

// ---------- Altas ----------  
function aceptarAltaCliente() {
    const dni = frmAltaCliente.txtDNI.value.trim();
    const nombre = frmAltaCliente.txtNombre.value.trim();
    const apellidos = frmAltaCliente.txtApellidos.value.trim();

    if (dni === "" || nombre === "" || apellidos === "") {
        alert("Debe rellenar todos los campos");
        return;
    }

    const oCliente = new Cliente(dni, nombre, apellidos);

    if (oAgencia.altaCliente(oCliente)) {
        alert("Cliente registrado OK");
        frmAltaCliente.reset();
        frmAltaCliente.style.display = "none";
    } else {
        alert("Cliente registrado previamente");
    }
}

function aceptarAltaAlojamiento() {
    const id = frmAltaAlojamiento.txtIdAlojamiento.value.trim();
    const numPersonas = Number(frmAltaAlojamiento.txtNumPersonas.value.trim());
    const tipo = frmAltaAlojamiento.rbtTipoAlojamiento.value;

    if (id === "" || isNaN(numPersonas) || numPersonas <= 0) {
        alert("Datos de alojamiento no válidos");
        return;
    }

    let oAlojamiento;
    if (tipo === "hotel") {
        const desayuno = frmAltaAlojamiento.rbtDesayuno.value === "S";
        oAlojamiento = new HabitacionHotel(id, numPersonas, desayuno);
    } else {
        const parking = frmAltaAlojamiento.rbtParking.value === "S";
        const dormitorios = Number(frmAltaAlojamiento.txtDormitorios.value.trim());
        if (isNaN(dormitorios)) {
            alert("Número de dormitorios no válido");
            return;
        }
        oAlojamiento = new Apartamento(id, numPersonas, parking, dormitorios);
    }

    if (oAgencia.altaAlojamiento(oAlojamiento)) {
        alert("Alojamiento registrado OK");
        frmAltaAlojamiento.reset();
        frmAltaAlojamiento.style.display = "none";
    } else {
        alert("Alojamiento registrado previamente");
    }
}

// ---------- Reserva ----------  
function aceptarReserva() {
    const idReserva = frmReserva.txtIdReserva.value.trim();
    const dni = frmReserva.txtDNIReserva.value.trim();
    const idAloj = frmReserva.txtIdAlojReserva.value.trim();
    const inicio = convertirFecha(frmReserva.txtFechaInicio.value);
    const fin = convertirFecha(frmReserva.txtFechaFin.value);

    if (idReserva === "" || dni === "" || idAloj === "" ||
        isNaN(inicio.getTime()) || isNaN(fin.getTime())) {
        alert("Datos de reserva no válidos");
        return;
    }

    const resultado = oAgencia.altaReserva(idReserva, dni, idAloj, inicio, fin);
    // altaReserva devuelve un string con el error o null si OK  
    if (resultado === null) {
        alert("Reserva registrada OK");
        frmReserva.reset();
        frmReserva.style.display = "none";
    } else {
        alert(resultado);
    }
}

function convertirFecha(sFecha) {
    return new Date(`${sFecha}T00:00:00`);
}

// ---------- Listados (ventana auxiliar, patrón Vivero) ----------  
function abrirVentanaListado(titulo, contenido) {
    const oVentana = open("", "_blank", "");
    oVentana.document.open();
    oVentana.document.write(`<html><head><title>${titulo}</title></head><body>`);
    oVentana.document.write(`<h2>${titulo}</h2>`);
    oVentana.document.write(contenido);
    oVentana.document.write("</body></html>");
    oVentana.document.close();
}

function listadoClientes() {
    ocultarTodosLosFormularios();
    abrirVentanaListado("Listado de clientes", oAgencia.listadoClientes());
}

function listadoAlojamientos() {
    ocultarTodosLosFormularios();
    abrirVentanaListado("Listado de alojamientos", oAgencia.listadoAlojamientos());
}

function listadoHotelesDesayuno() {
    ocultarTodosLosFormularios();
    abrirVentanaListado(
        "Hoteles con desayuno",
        oAgencia.listadoHotelesConDesayuno()
    );
}

function aceptarListadoReservasCliente() {
    const dni = frmListadoReservasCliente.txtDNIListado.value.trim();

    if (dni === "") {
        alert("Debe indicar el DNI del cliente");
        return;
    }

    abrirVentanaListado(
        "Reservas del cliente " + dni,
        oAgencia.listadoReservasCliente(dni)
    );
    frmListadoReservasCliente.reset();
    frmListadoReservasCliente.style.display = "none";
}

function aceptarListadoReservasFechas() {
    const inicio = convertirFecha(frmListadoReservasFechas.txtFechaIniListado.value);
    const fin = convertirFecha(frmListadoReservasFechas.txtFechaFinListado.value);

    if (isNaN(inicio.getTime()) || isNaN(fin.getTime())) {
        alert("Debe indicar las dos fechas");
        return;
    }

    if (inicio > fin) {
        alert("La fecha de inicio no puede ser posterior a la fecha de fin");
        return;
    }

    abrirVentanaListado(
        "Reservas entre fechas",
        oAgencia.listadoReservasEntreFechas(inicio, fin)
    );
    frmListadoReservasFechas.reset();
    frmListadoReservasFechas.style.display = "none";
}