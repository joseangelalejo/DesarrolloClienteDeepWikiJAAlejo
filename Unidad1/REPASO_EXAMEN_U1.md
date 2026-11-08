# Repaso práctico Examen Unidad 1 - JavaScript

Este documento resume el patrón que se repite en los ejercicios de Vivero, en el examen de almacén de 2025 y en la práctica obligatoria.

---

## Qué suele pedir el examen

Normalmente se entrega una interfaz con formularios y hay que completar:

1. Las clases del modelo.
2. La clase que gestiona un array de objetos.
3. Los métodos de alta, búsqueda, actualización y listados.
4. La recepción de datos de formularios.
5. La salida mediante tablas, alertas o ventanas.

La puntuación suele estar repartida entre la estructura de clases, los métodos de negocio y la conexión con la interfaz. No conviene hacer solo la parte visual: la mayor parte de la lógica está en las clases.

---

## Plantilla mental

```text
Formulario
   ↓ recoger y convertir datos
Objeto especializado
   ↓
Clase gestora
   ↓ buscar / validar / modificar / filtrar
Salida HTML, alert o nueva ventana
```

Separación recomendada:

- `objetos.js`: no depende de inputs ni de botones.
- `codigo.js`/`principal.js`: traduce formularios a llamadas de negocio.

---

## 1. Estructura de clases

```js
class Elemento {
  #codigo;
  #valor;

  constructor(codigo, valor) {
    this.#codigo = codigo;
    this.#valor = valor;
  }

  get codigo() {
    return this.#codigo;
  }

  set codigo(valor) {
    this.#codigo = valor;
  }

  get valor() {
    return this.#valor;
  }

  set valor(valor) {
    this.#valor = valor;
  }
}

class Especializado extends Elemento {
  #detalle;

  constructor(codigo, valor, detalle) {
    super(codigo, valor);
    this.#detalle = detalle;
  }

  get detalle() {
    return this.#detalle;
  }

  set detalle(valor) {
    this.#detalle = valor;
  }
}
```

### Checklist de clases

- [ ] Nombre exacto de cada clase.
- [ ] Atributos privados o patrón solicitado.
- [ ] Constructor con los parámetros correctos.
- [ ] `super(...)` en cada subclase.
- [ ] Getter y setter de todos los atributos pedidos.
- [ ] Métodos con la firma exacta del diagrama.
- [ ] No mezclar lógica del DOM dentro del modelo.

---

## 2. Altas sin duplicados

```js
alta(elemento) {
  const existe = this.elementos.some(
    (actual) => actual.codigo === elemento.codigo,
  );

  if (existe) {
    return false;
  }

  this.elementos.push(elemento);
  return true;
}
```

Para nombres:

```js
const existe = this.productos.some(
  (producto) =>
    producto.nombre.trim().toLowerCase() ===
    nuevoProducto.nombre.trim().toLowerCase(),
);
```

**Importante:** el método debe devolver un booleano claro para que `codigo.js` muestre el mensaje correspondiente.

---

## 3. Búsqueda y actualización

```js
actualizar(codigo, nuevoValor) {
  const elemento = this.elementos.find((actual) => actual.codigo === codigo);

  if (elemento === undefined) {
    return "Elemento no registrado";
  }

  if (nuevoValor < elemento.valor) {
    return "El nuevo valor es inferior al registrado";
  }

  elemento.valor = nuevoValor;
  return "Actualizado correctamente";
}
```

Siempre hay que tratar el caso `undefined` antes de acceder a una propiedad.

---

## 4. Filtros, ordenación y totales

```js
const lista = this.elementos
  .filter(
    (elemento) =>
      elemento instanceof Especializado &&
      elemento.valor >= minimo,
  )
  .sort((a, b) => b.valor - a.valor);
```

Para un total:

```js
const total = this.elementos.reduce(
  (acumulado, elemento) => acumulado + elemento.valor,
  0,
);
```

Para contar por subtipo:

```js
const cantidad = this.elementos.filter(
  (elemento) => elemento instanceof Televisor && elemento.stock > 0,
).length;
```

### Errores típicos

- Usar `>` cuando el enunciado pide `>=`.
- Ordenar de menor a mayor por equivocación.
- Leer propiedades de `Televisor` en una `Lavadora`.
- Hacer `reduce` sin valor inicial.
- Modificar el array principal al ordenar cuando no era necesario.

---

## 5. Generar tablas

```js
toHTMLRow() {
  return `
    <tr>
      <td>${this.codigo}</td>
      <td>${this.valor}</td>
    </tr>`;
}
```

```js
listado() {
  let salida = `
    <table border="1">
      <thead>
        <tr><th>Código</th><th>Valor</th></tr>
      </thead>
      <tbody>`;

  for (const elemento of this.elementos) {
    salida += elemento.toHTMLRow();
  }

  return salida + "</tbody></table>";
}
```

Si hay varios tipos, filtrar antes de generar cada tabla. El encabezado debe coincidir con las columnas pedidas por el enunciado.

---

## 6. Formularios del examen

```js
function aceptarAlta() {
  const codigoTexto = frmAlta.txtCodigo.value.trim();
  const valorTexto = frmAlta.txtValor.value.trim();

  if (codigoTexto === "" || valorTexto === "") {
    alert("Debe rellenar todos los campos");
    return;
  }

  const codigo = Number(codigoTexto);
  const valor = Number(valorTexto);

  if (Number.isNaN(codigo) || Number.isNaN(valor)) {
    alert("Los valores deben ser numéricos");
    return;
  }

  const objeto = new Elemento(codigo, valor);
  const insertado = gestor.alta(objeto);

  alert(insertado ? "Alta realizada" : "El elemento ya existe");

  if (insertado) {
    frmAlta.reset();
    frmAlta.style.display = "none";
  }
}
```

En radios:

```js
const tipo = frmAlta.rbtTipo.value;
const frutal = frmAlta.rbtFrutal.value === "S";
```

En formularios con nombres repetidos, acceder desde el formulario concreto evita confusiones:

```js
frmEntradaStock.txtNombre.value;
frmSalidaStock.txtNombre.value;
```

---

## 7. Vivero: patrón de referencia

El examen Vivero reúne casi todos los patrones importantes:

- `Arbol` como clase base.
- `Perenne` y `Caduco` como subclases.
- Array de árboles en `Vivero`.
- Alta sin códigos repetidos.
- Actualización con control de tallaje.
- `filter` por tipo y condición.
- `sort` descendente.
- Tablas HTML.
- `instanceof`.
- Formularios y nueva ventana.

Archivo de referencia:

- [objetos.js del examen Vivero](../Ejemplos/Unidad1/EjemplosClase/ExamenVivero/E01/js/objetos.js)
- [código de formularios del examen Vivero](../Ejemplos/Unidad1/EjemplosClase/ExamenVivero/E01/js/codigo.js)

---

## 8. Almacén: patrón de referencia

El examen de octubre de 2025 cambia los nombres, pero mantiene la misma estructura:

- Catálogo de electrodomésticos.
- `Electrodomestico` como clase base.
- `Televisor` y `Lavadora`.
- Alta por nombre único.
- Entrada y salida de stock.
- Valor del stock.
- Listado de catálogo.
- Listado separado por subtipo.
- Totales.

Archivos:

- [Enunciado del examen](../Ejemplos/Unidad1/EjemplosClase/DWEC%20-%20ExamenUD01%20-%2030-10-2025/DWEC%20-%20ExamenUD01%20-%2030-10-2025.pdf)
- [HTML entregado](../Ejemplos/Unidad1/EjemplosClase/DWEC%20-%20ExamenUD01%20-%2030-10-2025/DWEC%20-%20Examen%20Bloque%20I/examen.html)
- [JavaScript de formularios](../Ejemplos/Unidad1/EjemplosClase/DWEC%20-%20ExamenUD01%20-%2030-10-2025/DWEC%20-%20Examen%20Bloque%20I/js/codigo.js)

---

## 9. Reservas: fechas y solapamientos

Dos intervalos se solapan si:

```js
inicioNueva <= finExistente && finNueva >= inicioExistente
```

Por tanto, para reservar:

```js
const ocupado = reservas.some(
  (reserva) =>
    reserva.alojamiento.idAlojamiento === alojamiento.idAlojamiento &&
    inicio <= reserva.fin &&
    fin >= reserva.inicio,
);
```

Validaciones mínimas:

- Fecha válida.
- Inicio y fin no anteriores a hoy.
- Inicio no posterior a fin.
- Alojamiento existente.
- Alojamiento disponible.
- No guardar una reserva parcial si una operación debe ser atómica.

---

## 10. Checklist para entregar

- [ ] He trabajado solo en los ficheros permitidos.
- [ ] El proyecto abre sin errores en la consola del navegador.
- [ ] Las clases se pueden instanciar con `new`.
- [ ] Las altas duplicadas se rechazan.
- [ ] Las búsquedas inexistentes no rompen el programa.
- [ ] Los formularios convierten correctamente números y fechas.
- [ ] Se muestran los mensajes solicitados.
- [ ] Las tablas tienen las columnas correctas.
- [ ] La ordenación coincide con el enunciado.
- [ ] Los formularios se limpian y ocultan tras una operación correcta.
- [ ] He probado casos válidos y casos límite.
