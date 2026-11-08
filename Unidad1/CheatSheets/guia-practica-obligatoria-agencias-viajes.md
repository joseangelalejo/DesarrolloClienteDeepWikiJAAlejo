# Guía orientativa - Práctica obligatoria de agencias de viajes

La práctica pide una aplicación ES6 para gestionar clientes, alojamientos y reservas. Se supone que el HTML, CSS, Bootstrap y el JavaScript base ya están preparados; el trabajo principal es completar `objetos.js` y conectar las acciones en `principal.js` siguiendo los `id` y `name` que ya existan.

## 1. Modelo que pide el enunciado

### Cliente

Datos:

- `dniCliente`
- `nombre`
- `apellidos`
- `usuario`, calculado en minúsculas:
  - inicial del nombre;
  - tres primeras letras del primer apellido;
  - tres primeras letras del segundo apellido;
  - tres últimos dígitos del DNI.

Ejemplo orientativo:

```js
const cliente = new Cliente("12345678Z", "Ana", "García López");
// usuario: agarclo78z
```

No des por bueno el ejemplo sin comprobar la regla exacta: separa nombre y apellidos de forma robusta, elimina espacios sobrantes y pasa todo a minúsculas.

```js
calcularUsuario() {
  const partes = this.apellidos.trim().split(/\s+/);
  const apellido1 = partes[0] ?? "";
  const apellido2 = partes[1] ?? "";
  return (
    this.nombre.trim().charAt(0) +
    apellido1.substring(0, 3) +
    apellido2.substring(0, 3) +
    this.dniCliente.slice(-3)
  ).toLowerCase();
}
```

Si el profesor exige validar que haya dos apellidos, hazlo antes de generar el usuario y muestra el mensaje de error establecido por la interfaz.

### Alojamiento y especializaciones

Todos los alojamientos tienen:

- `idAlojamiento`
- número máximo de personas.

Tipos:

- `HabitacionHotel`: si incluye desayuno.
- `Apartamento`: si tiene aparcamiento y número de dormitorios.

Plantilla:

```js
class Alojamiento {
  #idAlojamiento;
  #personas;

  constructor(idAlojamiento, personas) {
    this.#idAlojamiento = idAlojamiento;
    this.#personas = personas;
  }

  get idAlojamiento() {
    return this.#idAlojamiento;
  }

  get personas() {
    return this.#personas;
  }

  set personas(valor) {
    this.#personas = Number(valor);
  }
}

class HabitacionHotel extends Alojamiento {
  #desayuno;

  constructor(id, personas, desayuno) {
    super(id, personas);
    this.#desayuno = desayuno;
  }

  get desayuno() {
    return this.#desayuno;
  }
}

class Apartamento extends Alojamiento {
  #aparcamiento;
  #dormitorios;

  constructor(id, personas, aparcamiento, dormitorios) {
    super(id, personas);
    this.#aparcamiento = aparcamiento;
    this.#dormitorios = dormitorios;
  }

  get aparcamiento() {
    return this.#aparcamiento;
  }

  get dormitorios() {
    return this.#dormitorios;
  }
}
```

Todos los `idAlojamiento` deben ser únicos, independientemente de que el objeto sea una habitación o un apartamento.

### Reserva

Una reserva debe guardar, como mínimo:

- `idReserva`;
- cliente;
- fechas de inicio y fin;
- alojamientos incluidos.

Es preferible guardar referencias a los objetos `Cliente` y `Alojamiento`, no copias parciales. Así los listados pueden acceder a sus propiedades.

```js
class Reserva {
  #idReserva;
  #cliente;
  #inicio;
  #fin;
  #alojamientos;

  constructor(id, cliente, inicio, fin) {
    this.#idReserva = id;
    this.#cliente = cliente;
    this.#inicio = inicio;
    this.#fin = fin;
    this.#alojamientos = [];
  }

  get alojamientos() {
    return this.#alojamientos;
  }

  añadirAlojamiento(alojamiento) {
    this.#alojamientos.push(alojamiento);
  }
}
```

## 2. Clase gestora recomendada

Puedes centralizar la lógica en una clase `Agencia`, `Gestor` o el nombre que indique el HTML/enunciado. Debe mantener:

```js
class Agencia {
  #clientes = [];
  #alojamientos = [];
  #reservas = [];
}
```

Métodos aconsejables:

- `altaCliente(cliente)`;
- `altaAlojamiento(alojamiento)`;
- `buscarCliente(dni)`;
- `buscarAlojamiento(id)`;
- `crearReserva(...)`;
- `añadirAlojamientoReserva(...)`;
- `listadoClientes()`;
- `listadoAlojamientos()`;
- `listadoReservasCliente(dni)`;
- `listadoReservasEntreFechas(inicio, fin)`;
- `listadoHotelesConDesayuno()`.

Cada alta debe devolver `true` si inserta y `false` si existe la clave. Así `principal.js` decide qué mensaje mostrar.

## 3. Reservas: validaciones en orden

### A. Validar fechas

```js
function convertirFecha(valor) {
  const fecha = new Date(valor);
  fecha.setHours(0, 0, 0, 0);
  return fecha;
}

const hoy = new Date();
hoy.setHours(0, 0, 0, 0);
const inicio = convertirFecha(valorInicio);
const fin = convertirFecha(valorFin);

if (Number.isNaN(inicio.getTime()) || Number.isNaN(fin.getTime())) {
  return "Fecha no válida";
}
if (inicio < hoy || fin < hoy) {
  return "Las fechas no pueden ser anteriores a hoy";
}
if (inicio > fin) {
  return "La fecha de inicio no puede ser posterior a la fecha de fin";
}
```

Guarda fechas como `Date` o como valores ISO coherentes, pero no mezcles ambos formatos al comparar.

### B. Comprobar disponibilidad

Dos periodos se solapan si:

```js
inicioNueva <= finExistente && finNueva >= inicioExistente
```

Para cada alojamiento solicitado:

```js
const ocupado = this.reservas.some((reserva) => {
  const usaAlojamiento = reserva.alojamientos.some(
    (alojamiento) => alojamiento.idAlojamiento === alojamientoSolicitado.idAlojamiento,
  );
  const solapa =
    inicioNueva <= reserva.fin && finNueva >= reserva.inicio;
  return usaAlojamiento && solapa;
});
```

Si `ocupado` es `true`, no añadas el alojamiento y devuelve un mensaje claro. La práctica dice que no se debe formalizar la reserva cuando algún alojamiento ya está reservado en alguno de los días solicitados.

### C. Añadir varios alojamientos

Una misma reserva puede incluir tantos alojamientos como se desee, siempre que cada uno esté disponible para esas fechas. No crees una reserva nueva por cada alojamiento:

1. Crear la reserva una sola vez.
2. Comprobar disponibilidad de cada alojamiento.
3. Añadir los disponibles a `reserva.alojamientos`.
4. Formalizar solo si la operación cumple la política indicada por el profesor.

Si el requisito se interpreta como operación atómica, comprueba todos primero y añade después; así no queda una reserva parcialmente guardada.

## 4. Listados solicitados

### Clientes

Columnas típicas: DNI, nombre, apellidos y usuario. Recorre `clientes` y llama a `toHTMLRow()` si lo implementas.

### Alojamientos

Muestra los datos comunes y, según el tipo, los específicos:

```js
if (alojamiento instanceof HabitacionHotel) {
  // desayuno
} else if (alojamiento instanceof Apartamento) {
  // aparcamiento y dormitorios
}
```

No intentes leer `desayuno` de un apartamento ni `dormitorios` de una habitación.

### Reservas de un cliente

Busca por DNI, filtra `reservas` por `reserva.cliente.dniCliente` y muestra id, fechas y los alojamientos incluidos.

### Reservas entre dos fechas

Decide según el enunciado si el listado debe incluir reservas que:

- estén completamente dentro del intervalo, o
- se solapen con el intervalo solicitado.

Para la interpretación habitual de “reservas entre dos fechas”, el solapamiento se comprueba así:

```js
reserva.inicio <= fechaFin && reserva.fin >= fechaInicio
```

### Hoteles con desayuno

```js
const hoteles = alojamientos
  .filter((a) => a instanceof HabitacionHotel && a.desayuno)
  .sort((a, b) => {
    const porPersonas = b.personas - a.personas;
    return porPersonas !== 0
      ? porPersonas
      : a.idAlojamiento.localeCompare(b.idAlojamiento);
  });
```

El requisito es orden descendente por capacidad y, en empate, ascendente por identificador.

## 5. Conexión con los formularios

En `principal.js`, para cada botón:

1. Leer los campos del formulario correcto.
2. Hacer `trim()` a textos.
3. Convertir números y fechas.
4. Validar antes de construir objetos.
5. Construir la subclase adecuada según el radio/select.
6. Llamar a la clase gestora.
7. Mostrar el resultado en la capa de mensajes, `alert` o ventana que ya use la plantilla.
8. Solo después de una operación correcta, hacer `reset()` y ocultar el formulario.

Ejemplo:

```js
function aceptarAltaAlojamiento() {
  const id = frmAltaAlojamiento.txtId.value.trim();
  const personasTexto = frmAltaAlojamiento.txtPersonas.value.trim();

  if (id === "" || personasTexto === "") {
    mostrarMensaje("Completa los campos obligatorios");
    return;
  }

  const personas = Number(personasTexto);
  if (Number.isNaN(personas) || personas <= 0) {
    mostrarMensaje("La capacidad debe ser positiva");
    return;
  }

  let alojamiento;
  if (frmAltaAlojamiento.rbtTipo.value === "hotel") {
    alojamiento = new HabitacionHotel(id, personas, desayunoSeleccionado);
  } else {
    alojamiento = new Apartamento(id, personas, aparcamientoSeleccionado, dormitorios);
  }

  if (!agencia.altaAlojamiento(alojamiento)) {
    mostrarMensaje("El alojamiento ya existe");
    return;
  }

  mostrarMensaje("Alojamiento registrado");
  frmAltaAlojamiento.reset();
  frmAltaAlojamiento.style.display = "none";
}
```

Adapta los nombres a los que realmente aparezcan en el HTML entregado. No inventes `id` ni dependas de variables globales que no existan.

## 6. Plan de implementación por fases

### Fase 1: clases simples

- `Cliente` y cálculo de usuario.
- `Alojamiento` y sus dos subclases.
- getters/setters y constructores.
- `toHTMLRow()` o métodos auxiliares de presentación si el diseño los necesita.

### Fase 2: reservas

- `Reserva` con array de alojamientos.
- conversión y validación de fechas.
- comprobación de solapamiento.
- alta atómica de reservas.

### Fase 3: gestor y listados

- arrays internos;
- búsquedas;
- altas sin duplicados;
- filtros, `instanceof`, `sort`;
- generación de tablas.

### Fase 4: interfaz

- conectar botones;
- validar campos;
- mostrar mensajes;
- abrir ventana nueva solo si lo pide la plantilla;
- resetear y ocultar formularios.

## 7. Pruebas manuales mínimas

- Crear dos clientes y comprobar usuarios distintos.
- Intentar repetir un DNI.
- Crear una habitación y un apartamento.
- Intentar repetir un `idAlojamiento` entre tipos distintos.
- Crear una reserva con un alojamiento disponible.
- Intentar reservar el mismo alojamiento con fechas solapadas.
- Reservar el mismo alojamiento justo cuando termina la reserva anterior: decide si los extremos se consideran incluidos y aplica la misma regla en todo el programa.
- Rechazar inicio o fin anterior a hoy.
- Rechazar inicio posterior a fin.
- Añadir varios alojamientos a una reserva.
- Consultar todos los listados con cero, uno y varios resultados.
- Comprobar empate de capacidad en el listado de hoteles con desayuno.

## 8. Errores que suelen quitar puntos

- Comparar fechas como textos con formatos distintos.
- Olvidar que `value` de un formulario es texto.
- Guardar `"S"` y luego comprobarlo como si fuera booleano.
- Permitir duplicados porque se busca solo dentro del tipo concreto.
- Formalizar una reserva antes de comprobar todos sus alojamientos.
- Confundir `>` con `>=` en filtros.
- Ordenar números sin comparador.
- Leer propiedades específicas sin `instanceof`.
- Dejar visible el formulario después de una operación válida.
- Cambiar el HTML cuando el ejercicio pide resolverlo en los ficheros JavaScript.
