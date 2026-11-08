# Cheatsheet de examen - JavaScript, objetos y POO

Material contrastado: ejemplos de clase, boletines, examen Vivero de 2018, examen de almacén de 2025 y la práctica obligatoria de agencias de viajes.

## 1. Orden recomendado en el examen

1. Lee el HTML y apunta los `id`, `name`, valores de los `radio` y botones.
2. Lee el diagrama/enunciado y escribe primero las clases y firmas exactas.
3. Implementa atributos, constructor, getters/setters y métodos de cada clase.
4. Implementa la clase gestora (`Vivero`, `Almacen`, etc.) con su array privado.
5. Prueba los casos límite: duplicado, inexistente, campo vacío, número inválido y filtro sin resultados.
6. Completa `codigo.js`: recoger formulario, convertir tipos, llamar al modelo, mostrar resultado y ocultar/resetear formulario.
7. Revisa nombres, mayúsculas, mensajes y condiciones literalmente.

No cambies el HTML salvo que el enunciado lo permita. El código de negocio va en `objetos.js`; la interacción con formularios, alertas y ventanas va en `codigo.js`.

## 2. Plantilla de clases ES6

```js
class Producto {
  #nombre;
  #precio;

  constructor(nombre, precio) {
    this.#nombre = nombre;
    this.#precio = precio;
  }

  get nombre() {
    return this.#nombre;
  }

  set nombre(valor) {
    this.#nombre = valor;
  }

  get precio() {
    return this.#precio;
  }

  set precio(valor) {
    this.#precio = Math.abs(Number(valor));
  }

  toHTMLRow() {
    return `<tr><td>${this.nombre}</td><td>${this.precio}</td></tr>`;
  }
}
```

Si el material o el diagrama usa atributos con guion bajo (`_nombre`), respeta ese patrón. Lo importante es que se acceda desde fuera mediante getters/setters y que los nombres públicos coincidan con el enunciado.

### Herencia

```js
class Televisor extends Electrodomestico {
  #pulgadas;
  #fullHD;

  constructor(nombre, precio, pulgadas, fullHD) {
    super(nombre, precio);
    this.#pulgadas = pulgadas;
    this.#fullHD = fullHD;
  }

  get pulgadas() {
    return this.#pulgadas;
  }

  set pulgadas(valor) {
    this.#pulgadas = Number(valor);
  }
}
```

- `extends` crea la subclase.
- `super(...)` inicializa la parte heredada.
- `objeto instanceof Televisor` comprueba el tipo concreto.
- Un método redefinido en la subclase sobrescribe al heredado.

## 3. Clase gestora con array

```js
class Almacen {
  #productos;

  constructor() {
    this.#productos = [];
  }

  get productos() {
    return this.#productos;
  }

  altaProducto(producto) {
    const existe = this.productos.some(
      (elemento) => elemento.nombre.toLowerCase() === producto.nombre.toLowerCase(),
    );
    if (existe) return false;
    this.productos.push(producto);
    return true;
  }

  buscarPorNombre(nombre) {
    return this.productos.find(
      (producto) => producto.nombre.toLowerCase() === nombre.trim().toLowerCase(),
    );
  }
}
```

### Métodos de array que más se necesitan

| Método | Uso | Resultado |
|---|---|---|
| `some(fn)` | ¿Existe alguno? | `true`/`false` |
| `find(fn)` | Buscar un objeto | objeto o `undefined` |
| `filter(fn)` | Seleccionar varios | array nuevo |
| `sort(fn)` | Ordenar | modifica el array |
| `map(fn)` | Transformar elementos | array nuevo |
| `reduce(fn, inicial)` | Acumular total | valor |

```js
const encontrados = this.productos.filter((p) => p.stock > 0);
encontrados.sort((a, b) => b.stock - a.stock); // descendente
const total = this.productos.reduce((suma, p) => suma + p.valorStock(), 0);
```

`sort` compara números con una función; sin función ordena como texto. Para ordenar ascendente usa `a.campo - b.campo`; descendente, `b.campo - a.campo`.

## 4. Patrones tipo Vivero

```js
altaArbol(arbol) {
  const existe = this.arboles.some((a) => a.codigo === arbol.codigo);
  if (existe) return false;
  this.arboles.push(arbol);
  return true;
}

tallajeArbol(codigo, nuevoTallaje) {
  const arbol = this.arboles.find((a) => a.codigo === codigo);
  if (arbol === undefined) return "Árbol no registrado";
  if (arbol.tallaje > nuevoTallaje) return "Tallaje inferior al registrado";

  arbol.tallaje = nuevoTallaje;
  const tipo = arbol instanceof Caduco ? "Caduco" : "Perenne";
  return `Correcto, tallaje actualizado ${tipo}`;
}

listadoPerennes(minimo) {
  const lista = this.arboles
    .filter((a) => a instanceof Perenne && a.tallaje >= minimo)
    .sort((a, b) => b.tallaje - a.tallaje);
  return this.crearTabla(lista, ["Código", "Tallaje", "Especie", "Frutal"]);
}

totalArbolesVenta() {
  return this.arboles.filter(
    (a) =>
      (a instanceof Caduco && a.tallaje > 100) ||
      (a instanceof Perenne && a.frutal && a.tallaje > 80) ||
      (a instanceof Perenne && !a.frutal && a.tallaje > 120),
  ).length;
}
```

Puntos delicados:

- `>=` no es lo mismo que `>`.
- Normaliza texto del usuario con `trim().toLowerCase()`.
- La propiedad booleana debe ser realmente `true`/`false`, no `"S"`/`"N"` si luego se evalúa con `if`.
- `instanceof` debe comprobar la clase antes de leer propiedades específicas de la subclase.

## 5. Tablas HTML desde los objetos

```js
toHTMLRow() {
  return `<tr>
    <td>${this.codigo}</td>
    <td>${this.tallaje}</td>
    <td>${this.especie}</td>
  </tr>`;
}

crearTabla(lista) {
  let html = "<table border='1'><thead><tr>";
  html += "<th>Código</th><th>Tallaje</th><th>Especie</th>";
  html += "</tr></thead><tbody>";
  for (const objeto of lista) html += objeto.toHTMLRow();
  return html + "</tbody></table>";
}
```

Para una tabla por subtipo, filtra antes y añade solo las columnas solicitadas. Si el enunciado pide dos tablas, construye dos listados separados.

## 6. Formularios y conversión de datos

```js
function aceptarAlta() {
  const codigoTexto = frmAlta.txtCodigo.value.trim();
  const tallajeTexto = frmAlta.txtTallaje.value.trim();

  if (codigoTexto === "" || tallajeTexto === "") {
    alert("Debe rellenar todos los campos");
    return;
  }

  const codigo = Number(codigoTexto);
  const tallaje = Number(tallajeTexto);
  if (Number.isNaN(codigo) || Number.isNaN(tallaje)) {
    alert("Los valores deben ser numéricos");
    return;
  }

  const tipo = frmAlta.rbtTipo.value;
  const objeto =
    tipo === "perenne"
      ? new Perenne(codigo, tallaje, especie, frutal)
      : new Caduco(codigo, tallaje, especie, mes);

  alert(gestor.altaArbol(objeto) ? "Árbol registrado OK" : "Árbol registrado previamente");
  frmAlta.reset();
  frmAlta.style.display = "none";
}
```

- `value` siempre llega como texto.
- Usa `Number(...)` antes de comparar o sumar.
- `Number("")` vale `0`: valida el texto vacío antes de convertir.
- `Number.isNaN(valor)` evita aceptar conversiones inválidas.
- En radios, comprueba el valor seleccionado (`"S"`, `"N"`, `"TV"`, etc.).
- Si hay formularios con `name`, suele funcionar `frmAlta.txtCampo.value`; si no, usa `document.getElementById(...)`.

## 7. Entrada/salida de stock

```js
entradaStock(nombre, unidades) {
  const producto = this.buscarPorNombre(nombre);
  if (producto === undefined) return "Producto no registrado";
  producto.stock += unidades;
  return `Stock total: ${producto.stock}`;
}

salidaStock(nombre, unidades) {
  const producto = this.buscarPorNombre(nombre);
  if (producto === undefined) return "Producto no registrado";
  producto.stock -= unidades;
  return `Stock total: ${producto.stock}`;
}
```

Para el examen de almacén:

- catálogo: no repetir por nombre;
- entrada/salida: buscar primero y actualizar stock;
- listado catálogo: todos los productos;
- listado stock: separar televisores y lavadoras, solo `stock > 0`, mostrar stock y valor;
- totales: sumar unidades de televisores, unidades de lavadoras e importe total.

## 8. Fechas y solapamiento de reservas

La condición correcta para que dos intervalos `[inicioA, finA]` y `[inicioB, finB]` se solapen es:

```js
const haySolapamiento = inicioA <= finB && finA >= inicioB;
```

Por tanto, hay disponibilidad si **no** existe una reserva con solapamiento:

```js
const ocupado = reservas.some(
  (r) => inicio <= r.fin && fin >= r.inicio,
);
if (ocupado) {
  // No formalizar la reserva
}
```

Normaliza fechas antes de comparar:

```js
const fecha = new Date(valorInput);
const hoy = new Date();
hoy.setHours(0, 0, 0, 0);
if (fecha < hoy) {
  alert("La fecha no puede ser anterior a hoy");
}
```

Valida también que `inicio <= fin`. Si el input es `type="date"`, el valor suele ser `YYYY-MM-DD`; no lo mezcles con fechas en formato local sin normalizar.

## 9. Objetos literales y utilidades

```js
const persona = {
  nombre: "Ana",
  edad: 20,
  saludar() {
    return `Hola, soy ${this.nombre}`;
  },
};

persona.edad = 21;
persona.nacionalidad = "Española";

for (const clave in persona) {
  if (typeof persona[clave] !== "function") console.log(persona[clave]);
}

for (const [clave, valor] of Object.entries(persona)) {
  console.log(clave, valor);
}
```

`this` debe usarse dentro de un método normal. Una función flecha no crea su propio `this`.

## 10. Checklist final

- [ ] Clases y métodos con los nombres exactos del enunciado.
- [ ] Constructor de cada clase llama a `super` cuando corresponde.
- [ ] Todos los atributos tienen getter y setter solicitados.
- [ ] No se accede a una propiedad de subclase antes de comprobar el tipo.
- [ ] Duplicados controlados con `some`.
- [ ] Búsquedas inexistentes controladas (`undefined`).
- [ ] Filtros, umbrales y orden coinciden exactamente con el texto.
- [ ] Números convertidos y entradas vacías rechazadas.
- [ ] Formularios se resetean y ocultan tras una operación válida.
- [ ] Tablas tienen encabezado, `tbody` y las columnas pedidas.
- [ ] Ventanas/listados se abren y escriben en el orden correcto.
- [ ] No se ha modificado HTML fuera de lo permitido.
