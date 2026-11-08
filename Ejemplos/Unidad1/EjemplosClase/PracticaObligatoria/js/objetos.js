"use strict";

// ================= CLIENTE =================  
class Cliente {
    _dniCliente;
    _nombre;
    _apellidos;
    _usuario;

    constructor(dniCliente, nombre, apellidos) {
        this._dniCliente = dniCliente;
        this._nombre = nombre;
        this._apellidos = apellidos;
        this._usuario = this._calcularUsuario();
    }

    // DONE: inicial nombre + 3 letras apellido1 + 3 letras apellido2  
    //       + 3 últimos dígitos del DNI, DONE en minúsculas  
    _calcularUsuario() {
        const partesNombre = this.apellidos.trim().split(/\s+/);
        const apellido1 = partesNombre[0] ?? "";
        const apellido2 = partesNombre[1] ?? "";
        const quitarAcentos = texto => texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        return (
            quitarAcentos(this.nombre.trim().charAt(0)) +
            quitarAcentos(apellido1.substring(0, 3)) +
            quitarAcentos(apellido2.substring(0, 3)) +
            this.dniCliente.slice(-3)
        ).toLowerCase();
    }

    get dniCliente() { return this._dniCliente; }
    set dniCliente(valor) { this._dniCliente = valor; }

    get nombre() { return this._nombre; }
    set nombre(valor) { this._nombre = valor; }

    get apellidos() { return this._apellidos; }
    set apellidos(valor) { this._apellidos = valor; }

    get usuario() { return this._usuario; }
    set usuario(valor) { this._usuario = valor; }

    // DONE: <tr> con DNI, nombre, apellidos, usuario  
    toHTMLRow() {
        let salida = "<tr>";
        for (let atrib of Object.values(this)) {
            salida += "<td>" + atrib + "</td>";
        }
        salida += "</tr>";
        return salida;
    }
}

// ================= ALOJAMIENTO =================  
class Alojamiento {
    _idAlojamiento;
    _numPersonas;

    constructor(idAlojamiento, numPersonas) {
        this._idAlojamiento = idAlojamiento;
        this._numPersonas = numPersonas;
    }

    get idAlojamiento() { return this._idAlojamiento; }
    set idAlojamiento(valor) { this._idAlojamiento = valor; }

    get numPersonas() { return this._numPersonas; }
    set numPersonas(valor) { this._numPersonas = Number(valor); }

    // DONE: <tr> con datos comunes  
    toHTMLRow() {
        let salida = "<tr>";
        for (let atrib of Object.values(this)) {
            salida += "<td>" + atrib + "</td>";
        }
        salida += "</tr>";
        return salida;
    }
}

class HabitacionHotel extends Alojamiento {
    _desayuno; // boolean  

    constructor(idAlojamiento, numPersonas, desayuno) {
        super(idAlojamiento, numPersonas);
        this._desayuno = desayuno;
    }

    get desayuno() { return this._desayuno; }
    set desayuno(valor) { this._desayuno = valor; }

    // DONE: <tr> con id, personas y desayuno  
    toHTMLRow() {
        return `<tr><td>${this.idAlojamiento}</td><td>${this.numPersonas}</td><td>${this.desayuno ? "Sí" : "No"}</td></tr>`;
    }
}

class Apartamento extends Alojamiento {
    _parking;      // boolean  
    _dormitorios;  // number  

    constructor(idAlojamiento, numPersonas, parking, dormitorios) {
        super(idAlojamiento, numPersonas);
        this._parking = parking;
        this._dormitorios = dormitorios;
    }

    get parking() { return this._parking; }
    set parking(valor) { this._parking = valor; }

    get dormitorios() { return this._dormitorios; }
    set dormitorios(valor) { this._dormitorios = Number(valor); }

    // DONE: <tr> con id, personas, parking y dormitorios  
    toHTMLRow() {
        return `<tr><td>${this.idAlojamiento}</td><td>${this.numPersonas}</td><td>${this.parking ? "Sí" : "No"}</td><td>${this.dormitorios}</td></tr>`;
    }
}

// ================= RESERVA =================  
class Reserva {
    _idReserva;
    _cliente;
    _alojamientos;
    _fechaInicio;
    _fechaFin;

    constructor(idReserva, cliente, fechaInicio, fechaFin) {
        this._idReserva = idReserva;
        this._cliente = cliente;
        this._fechaInicio = fechaInicio;
        this._fechaFin = fechaFin;
        this._alojamientos = [];
    }

    get idReserva() { return this._idReserva; }
    set idReserva(valor) { this._idReserva = valor; }

    get cliente() { return this._cliente; }
    set cliente(valor) { this._cliente = valor; }

    get alojamientos() { return this._alojamientos; }
    set alojamientos(valor) { this._alojamientos = valor; }

    get fechaInicio() { return this._fechaInicio; }
    set fechaInicio(valor) { this._fechaInicio = valor; }

    get fechaFin() { return this._fechaFin; }
    set fechaFin(valor) { this._fechaFin = valor; }

    agregarAlojamiento(alojamiento) {
        this._alojamientos.push(alojamiento);
    }

    // DONE: <tr> con id, DNI cliente, fechas y alojamientos  
    toHTMLRow() {
        const alojamientos = this.alojamientos
            .map(alojamiento => alojamiento.idAlojamiento)
            .join(", ");
        const inicio = this.fechaInicio.toLocaleDateString("es-ES");
        const fin = this.fechaFin.toLocaleDateString("es-ES");
        return `<tr><td>${this.idReserva}</td><td>${this.cliente.dniCliente}</td><td>${inicio}</td><td>${fin}</td><td>${alojamientos}</td></tr>`;
    }
}

// ================= AGENCIA (gestor) =================  
class Agencia {
    _clientes;
    _alojamientos;
    _reservas;

    constructor() {
        this._clientes = [];
        this._alojamientos = [];
        this._reservas = [];
    }

    get clientes() { return this._clientes; }
    set clientes(valor) { this._clientes = valor; }

    get alojamientos() { return this._alojamientos; }
    set alojamientos(valor) { this._alojamientos = valor; }

    get reservas() { return this._reservas; }
    set reservas(valor) { this._reservas = valor; }

    // ---------- Búsquedas ----------  
    buscarCliente(dni) {
        return this.clientes.find(cliente => cliente.dniCliente === dni);
    }

    buscarAlojamiento(idAlojamiento) {
        return this.alojamientos.find(alojamiento => alojamiento.idAlojamiento === idAlojamiento);
    }

    buscarReserva(idReserva) {
        return this.reservas.find(reserva => reserva.idReserva === idReserva);
    }

    // ---------- Altas ----------  
    altaCliente(cliente) {
        const existe = this.clientes.some(actual => actual.dniCliente === cliente.dniCliente);
        if (existe) {
            return false;
        }
        this.clientes.push(cliente);
        return true;
    }

    altaAlojamiento(alojamiento) {
        const existe = this.alojamientos.some(actual => actual.idAlojamiento === alojamiento.idAlojamiento);
        if (existe) {
            return false;
        }
        this.alojamientos.push(alojamiento);
        return true;
    }

    altaReserva(idReserva, dni, idAlojamiento, fechaInicio, fechaFin) {
        if (this.buscarReserva(idReserva)) {
            return "Ya existe una reserva con ese identificador";
        }

        const cliente = this.buscarCliente(dni);
        if (!cliente) {
            return "El cliente no existe";
        }

        const alojamiento = this.buscarAlojamiento(idAlojamiento);
        if (!alojamiento) {
            return "El alojamiento no existe";
        }

        if (!(fechaInicio instanceof Date) || !(fechaFin instanceof Date) ||
            Number.isNaN(fechaInicio.getTime()) || Number.isNaN(fechaFin.getTime())) {
            return "Fecha no válida";
        }

        const inicio = new Date(fechaInicio);
        const fin = new Date(fechaFin);
        inicio.setHours(0, 0, 0, 0);
        fin.setHours(0, 0, 0, 0);

        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        if (inicio < hoy || fin < hoy) {
            return "Las fechas no pueden ser anteriores a hoy";
        }
        if (inicio > fin) {
            return "La fecha de inicio no puede ser posterior a la fecha de fin";
        }

        const ocupado = this.reservas.some(reserva => {
            const usaAlojamiento = reserva.alojamientos.some(actual =>
                actual.idAlojamiento === alojamiento.idAlojamiento
            );
            return usaAlojamiento && inicio <= reserva.fechaFin && fin >= reserva.fechaInicio;
        });
        if (ocupado) {
            return "El alojamiento no está disponible en esas fechas";
        }

        const reserva = new Reserva(idReserva, cliente, inicio, fin);
        reserva.agregarAlojamiento(alojamiento);
        this.reservas.push(reserva);
        return null;
    }

    // ---------- Listados (string HTML) ----------  
    listadoClientes() {
        let salida = "<table border='1'><thead><tr><th>DNI</th><th>Nombre</th><th>Apellidos</th><th>Usuario</th></tr></thead><tbody>";
        salida += this.clientes.map(cliente => cliente.toHTMLRow()).join("");
        return salida + "</tbody></table>";
    }

    listadoAlojamientos() {
        let salida = "<table border='1'><thead><tr><th>ID</th><th>Personas</th><th>Tipo</th><th>Desayuno</th><th>Parking</th><th>Dormitorios</th></tr></thead><tbody>";
        for (const alojamiento of this.alojamientos) {
            let tipo = "Alojamiento";
            let desayuno = "";
            let parking = "";
            let dormitorios = "";

            if (alojamiento instanceof HabitacionHotel) {
                tipo = "Habitación de hotel";
                desayuno = alojamiento.desayuno ? "Sí" : "No";
            } else if (alojamiento instanceof Apartamento) {
                tipo = "Apartamento";
                parking = alojamiento.parking ? "Sí" : "No";
                dormitorios = alojamiento.dormitorios;
            }
            salida += `<tr><td>${alojamiento.idAlojamiento}</td><td>${alojamiento.numPersonas}</td><td>${tipo}</td><td>${desayuno}</td><td>${parking}</td><td>${dormitorios}</td></tr>`;
        }
        return salida + "</tbody></table>";
    }

    listadoReservasCliente(dni) {
        const reservas = this.reservas.filter(reserva => reserva.cliente.dniCliente === dni);
        let salida = "<table border='1'><thead><tr><th>ID</th><th>DNI cliente</th><th>Inicio</th><th>Fin</th><th>Alojamientos</th></tr></thead><tbody>";
        salida += reservas.map(reserva => reserva.toHTMLRow()).join("");
        return salida + "</tbody></table>";
    }

    listadoReservasEntreFechas(inicio, fin) {
        const reservas = this.reservas.filter(reserva =>
            reserva.fechaInicio <= fin && reserva.fechaFin >= inicio
        );
        let salida = "<table border='1'><thead><tr><th>ID</th><th>DNI cliente</th><th>Inicio</th><th>Fin</th><th>Alojamientos</th></tr></thead><tbody>";
        salida += reservas.map(reserva => reserva.toHTMLRow()).join("");
        return salida + "</tbody></table>";
    }

    listadoHotelesConDesayuno() {
        const hoteles = this.alojamientos
            .filter(alojamiento => alojamiento instanceof HabitacionHotel && alojamiento.desayuno)
            .sort((a, b) => b.numPersonas - a.numPersonas);
        let salida = "<table border='1'><thead><tr><th>ID</th><th>Personas</th><th>Desayuno</th></tr></thead><tbody>";
        salida += hoteles.map(hotel => hotel.toHTMLRow()).join("");
        return salida + "</tbody></table>";
    }
}
// PRUEBAS
const c1 = new Cliente("12345678Z", "Ana", "García López");
console.log(c1);                 // objeto completo  
console.log(c1.usuario);         // esperado: "agarclo78z"  
console.log(c1.dniCliente, c1.nombre, c1.apellidos);

// Casos límite  
console.log(new Cliente("99999999X", "Luis", "Solo").usuario);      // un apellido  
console.log(new Cliente("11111111A", "  Eva  ", "  Paz   Rio ").usuario); // espacios
// Prueba de toHTMLRow de usuarios
console.log(c1.toHTMLRow());  // <tr><td>12345678Z</td><td>Ana</td><td>Garcías López</td><td>agarclo78z</td></tr>

// Prueba de alojamiento

const alojamiento1 = new Alojamiento("a1", 4)
console.log(alojamiento1);
console.log(alojamiento1.toHTMLRow());