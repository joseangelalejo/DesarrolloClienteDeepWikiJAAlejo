# Apuntes de JavaScript - Unidad 1

Apuntes prácticos de JavaScript para **Desarrollo Web en Entorno Cliente**. Están organizados desde la sintaxis básica hasta la programación orientada a objetos y la interacción con formularios.

---

## 1. JavaScript en una página web

JavaScript permite añadir comportamiento a una página HTML: leer datos, validar formularios, modificar el DOM, reaccionar a eventos y gestionar objetos.

```html
<script src="./js/codigo.js"></script>
```

Recomendación: separar responsabilidades.

- `objetos.js`: clases, atributos y lógica de negocio.
- `codigo.js` o `principal.js`: formularios, eventos, alertas, ventanas y DOM.
- `index.html`: estructura de la interfaz.

**Trampa común:** si el HTML ya viene preparado, no se debe modificar para resolver la lógica salvo que el enunciado lo permita.

---

## 2. Variables, tipos y conversiones

```js
let nombre = "Ana";       // Puede cambiar
const edad = 20;          // No se reasigna
let activo = true;        // Boolean
let resultado;            // undefined
let vacio = null;         // Ausencia intencionada de valor
```

Tipos habituales:

| Tipo        | Ejemplo                      |
| ----------- | ---------------------------- |
| `string`    | `"JavaScript"`               |
| `number`    | `25`, `3.14`                 |
| `boolean`   | `true`, `false`              |
| `undefined` | Variable declarada sin valor |
| `null`      | Valor vacío intencionado     |
| `object`    | `{ nombre: "Ana" }`          |
| `function`  | `function saludar() {}`      |

### Conversión desde formularios

Los valores de un `<input>` llegan como texto.

```js
const texto = input.value.trim();
if (texto === "") {
  alert("El campo es obligatorio");
  return;
}

const numero = Number(texto);
if (Number.isNaN(numero)) {
  alert("Debe introducir un número");
  return;
}
```

**Trampa común:** `Number("")` devuelve `0`, por eso primero se comprueba la cadena vacía.

---

## 3. Operadores y control de flujo

Usar igualdad estricta evita conversiones automáticas inesperadas:

```js
if (valor === 10) {
  console.log("Es exactamente el número 10");
}
```

Operadores importantes:

- Comparación: `===`, `!==`, `>`, `<`, `>=`, `<=`.
- Lógicos: `&&`, `||`, `!`.
- Aritméticos: `+`, `-`, `*`, `/`, `%`.
- Ternario: `condicion ? valorSi : valorNo`.

```js
const tipo = arbol instanceof Caduco ? "Caduco" : "Perenne";
```

Estructuras:

```js
if (edad >= 18) {
  console.log("Mayor de edad");
} else {
  console.log("Menor de edad");
}

switch (opcion) {
  case "alta":
    alta();
    break;
  case "listado":
    listado();
    break;
  default:
    console.log("Opción no válida");
}
```

---

## 4. Funciones

```js
function sumar(a, b) {
  return a + b;
}

const multiplicar = (a, b) => a * b;
```

Una función debe recibir datos por parámetros y devolver un resultado cuando sea posible. `return` termina la función.

```js
function validarNombre(nombre) {
  if (nombre.trim() === "") {
    return false;
  }
  return true;
}
```

Las funciones flecha son especialmente útiles en métodos de arrays:

```js
const mayores = edades.filter((edad) => edad >= 18);
```

**Importante:** una función flecha no crea su propio `this`. Para métodos de objetos se usa normalmente una función/método normal.

---

## 5. Arrays y métodos funcionales

```js
const numeros = [4, 1, 8, 2];
numeros.push(10);
const primero = numeros[0];
```

### Métodos esenciales

| Método   | Para qué sirve                        | Devuelve             |
| -------- | ------------------------------------- | -------------------- |
| `some`   | Comprobar si existe alguno            | Boolean              |
| `find`   | Buscar el primer elemento             | Objeto o `undefined` |
| `filter` | Obtener los que cumplen una condición | Array                |
| `sort`   | Ordenar                               | El mismo array       |
| `map`    | Transformar elementos                 | Array nuevo          |
| `reduce` | Acumular un resultado                 | Valor                |

```js
const existe = productos.some((p) => p.nombre === nombre);
const producto = productos.find((p) => p.codigo === codigo);
const disponibles = productos.filter((p) => p.stock > 0);

disponibles.sort((a, b) => b.stock - a.stock);

const importe = productos.reduce(
  (total, producto) => total + producto.precio * producto.stock,
  0,
);
```

**Trampa común:** `sort()` sin comparador ordena como texto. Para números hay que escribir la función de comparación.

---

## 6. Objetos literales

```js
const persona = {
  nombre: "Juan",
  apellidos: "Pérez Rodríguez",
  edad: 50,
  presentate() {
    return `Hola, soy ${this.nombre} ${this.apellidos}`;
  },
};

persona.edad = 51;
persona.nacionalidad = "Española";
```

Acceso a propiedades:

```js
console.log(persona.nombre);
console.log(persona["apellidos"]);
```

Recorrer propiedades:

```js
for (const clave in persona) {
  if (typeof persona[clave] !== "function") {
    console.log(clave, persona[clave]);
  }
}

for (const [clave, valor] of Object.entries(persona)) {
  console.log(clave, valor);
}

for (const valor of Object.values(persona)) {
  console.log(valor);
}
```

Dentro de un método, `this` representa al objeto que lo está ejecutando.

---

## 7. Clases ES6

Una clase define la estructura y el comportamiento de sus objetos.

```js
class Alumno {
  #nombre;
  #edad;

  constructor(nombre, edad) {
    this.#nombre = nombre;
    this.#edad = edad;
  }

  get nombre() {
    return this.#nombre;
  }

  set nombre(valor) {
    this.#nombre = valor;
  }

  get edad() {
    return this.#edad;
  }

  set edad(valor) {
    this.#edad = Math.abs(Number(valor));
  }

  imprimir() {
    return `Alumno: ${this.nombre} - ${this.edad} años`;
  }
}

const alumno = new Alumno("Pedro", 24);
```

### Encapsulación

- `#atributo` es privado.
- El getter permite leerlo.
- El setter permite modificarlo y validar el valor.
- Los atributos con `_` aparecen en ejemplos clásicos, pero no son privados reales.

**Regla de examen:** si el diagrama exige getters y setters, hay que escribirlos todos y respetar sus nombres.

---

## 8. Herencia y polimorfismo

```js
class Figura {
  constructor(color) {
    this._color = color;
  }

  imprimir() {
    return `Figura de color ${this._color}`;
  }
}

class Rectangulo extends Figura {
  constructor(color, base, altura) {
    super(color);
    this._base = base;
    this._altura = altura;
  }

  calcularArea() {
    return this._base * this._altura;
  }

  imprimir() {
    return `Rectángulo de ${this.calcularArea()} cm2`;
  }
}
```

- `extends`: herencia.
- `super(...)`: constructor de la clase padre.
- Sobrescribir un método: polimorfismo.
- `instanceof`: comprobar el tipo concreto.

```js
if (objeto instanceof Rectangulo) {
  console.log(objeto.calcularArea());
}
```

**Trampa común:** no acceder a una propiedad específica de una subclase sin haber comprobado antes el tipo.

---

## 9. DOM, formularios y eventos

Acceso al DOM:

```js
const salida = document.getElementById("salida");
salida.innerHTML = "<strong>Resultado</strong>";
```

Lectura de formularios:

```js
const nombre = frmDatos.iNombre.value.trim();
const apellidos = frmDatos.iApellidos.value.trim();
```

Mostrar y ocultar:

```js
document.getElementById("frmAlta").style.display = "block";
document.getElementById("frmAlta").style.display = "none";
```

Resetear:

```js
frmAlta.reset();
```

Patrón de acción:

1. Leer los campos.
2. Validar vacíos.
3. Convertir números/fechas.
4. Crear el objeto.
5. Llamar a la clase gestora.
6. Informar al usuario.
7. Resetear y ocultar el formulario si procede.

---

## 10. Objetos predefinidos que aparecen en la unidad

### `String`

```js
texto.trim();
texto.toLowerCase();
texto.toUpperCase();
texto.substring(0, 3);
texto.slice(-3);
texto.includes("abc");
```

### `Math`

```js
Math.abs(-5);
Math.pow(2, 3);
Math.round(4.6);
Math.floor(4.9);
Math.ceil(4.1);
Math.max(3, 8, 2);
```

### `Date`

```js
const fecha = new Date("2026-11-08");
fecha.getDate();
fecha.getMonth(); // Empieza en 0
fecha.getFullYear();
fecha.getTime();
```

### `window`

```js
alert("Mensaje");
const ventana = open("", "_blank", "");
ventana.document.write("<h1>Listado</h1>");
ventana.document.close();
```

**Trampa común:** `getMonth()` devuelve enero como `0` y diciembre como `11`.
