# Esquema de repaso intensivo - Examen de JavaScript

Documento de repaso para la víspera del examen de **Desarrollo Web en Entorno Cliente**.

Está basado en los apuntes, boletines, ejercicios de clase, examen Vivero, examen de octubre de 2025 y práctica obligatoria de agencias de viajes del repositorio.

> **Prioridad:** primero domina las clases y la clase gestora; después practica la conexión con formularios y DOM. El patrón que más se repite es `formulario -> modelo -> validación -> salida`.

---

## 1. Qué debes saber hacer

En un examen práctico normalmente recibirás el HTML y parte del JavaScript. Tu trabajo será completar:

1. Las clases del modelo.
2. Los constructores, getters, setters y métodos.
3. La herencia entre clases.
4. Una clase gestora con un array de objetos.
5. Altas sin duplicados.
6. Búsquedas, modificaciones y filtros.
7. Ordenaciones y totales.
8. La lectura y conversión de datos del formulario.
9. La validación de errores.
10. La generación de tablas, alertas o ventanas.

### Regla de separación

| Archivo | Responsabilidad |
|---|---|
| `objetos.js` | Clases, atributos, herencia y lógica de negocio |
| `codigo.js` o `principal.js` | Eventos, formularios, mensajes y DOM |
| HTML entregado | Estructura que debes respetar |

No mezcles `document`, `alert` o inputs dentro de las clases salvo que el enunciado lo pida expresamente.

---

## 2. Orden para resolver el examen

### Fase 1: leer antes de programar

- Localiza todos los formularios, botones, `id`, `name` y valores de `radio`.
- Lee el diagrama o la descripción de clases.
- Apunta los nombres exactos de clases, propiedades y métodos.
- Identifica qué métodos deben devolver `boolean`, texto, un objeto, un array o HTML.
- Marca las condiciones especiales: duplicados, límites, fechas, tipos y mensajes.

### Fase 2: construir el modelo

1. Clase base.
2. Subclases y `extends`.
3. Constructores y `super(...)`.
4. Getters y setters.
5. Métodos propios de cada objeto.
6. Clase gestora y su array.

### Fase 3: implementar operaciones

Implementa en este orden:

1. Alta.
2. Búsqueda.
3. Modificación.
4. Filtros.
5. Ordenación.
6. Totales.
7. Generación de filas o tablas.

### Fase 4: conectar la interfaz

1. Recoge los valores.
2. Comprueba vacíos.
3. Convierte números, booleanos y fechas.
4. Crea el objeto adecuado.
5. Llama al método de negocio.
6. Muestra el resultado.
7. Resetea u oculta el formulario si corresponde.

---

## 3. Plantilla de clases ES6

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
    this.#valor = Number(valor);
  }
}
```

### Herencia

```js
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

### Lista de comprobación de cada clase

- [ ] El nombre coincide exactamente con el enunciado.
- [ ] Los atributos tienen el nombre y visibilidad solicitados.
- [ ] El constructor recibe los parámetros en el orden correcto.
- [ ] La subclase llama a `super(...)`.
- [ ] Existen todos los getters y setters pedidos.
- [ ] Los métodos devuelven el tipo esperado.
- [ ] No se accede directamente a atributos privados desde fuera.

---

## 4. Clase gestora y arrays de objetos

```js
class Gestor {
  #elementos;

  constructor() {
    this.#elementos = [];
  }

  get elementos() {
    return this.#elementos;
  }

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

  buscar(codigo) {
    return this.elementos.find(
      (elemento) => elemento.codigo === codigo,
    );
  }
}
```

### Métodos que debes dominar

| Método | Pregunta que responde | Resultado |
|---|---|---|
| `some` | ¿Existe alguno que cumpla? | `true` o `false` |
| `find` | ¿Cuál es el primer objeto que cumple? | Objeto o `undefined` |
| `filter` | ¿Qué objetos cumplen? | Array nuevo |
| `sort` | ¿En qué orden los muestro? | Array ordenado |
| `map` | ¿Cómo transformo cada elemento? | Array nuevo |
| `reduce` | ¿Qué total acumulo? | Un valor |

```js
const existe = lista.some((elemento) => elemento.codigo === codigo);

const encontrado = lista.find((elemento) => elemento.codigo === codigo);

const disponibles = lista.filter((elemento) => elemento.stock > 0);

const ordenados = [...lista].sort((a, b) => b.valor - a.valor);

const total = lista.reduce(
  (acumulado, elemento) => acumulado + elemento.valor,
  0,
);
```

> `sort` modifica el array sobre el que se ejecuta. Usa `[...lista]` si quieres conservar el orden original.

---

## 5. Patrones de lógica que suelen puntuar

### Alta sin duplicados

```js
altaElemento(elemento) {
  const existe = this.elementos.some(
    (actual) =>
      actual.nombre.trim().toLowerCase() ===
      elemento.nombre.trim().toLowerCase(),
  );

  if (existe) {
    return false;
  }

  this.elementos.push(elemento);
  return true;
}
```

### Búsqueda y actualización

```js
actualizar(codigo, nuevoValor) {
  const elemento = this.buscar(codigo);

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

### Filtrar por subtipo

```js
listadoEspecializado(minimo) {
  return this.elementos
    .filter(
      (elemento) =>
        elemento instanceof Especializado &&
        elemento.valor >= minimo,
    )
    .sort((a, b) => b.valor - a.valor);
}
```

Antes de leer una propiedad específica, comprueba el tipo:

```js
if (elemento instanceof Apartamento) {
  console.log(elemento.dormitorios);
}
```

### Condiciones combinadas

Lee las condiciones literalmente. No sustituyas `>=` por `>` ni mezcles `&&` y `||` sin paréntesis:

```js
return this.elementos.filter(
  (elemento) =>
    (elemento instanceof TipoA && elemento.valor > 100) ||
    (elemento instanceof TipoB && elemento.valor >= 80),
).length;
```

---

## 6. Formularios, conversiones y eventos

Los valores de los `input` llegan como texto.

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

  const elemento = new Elemento(codigo, valor);
  const insertado = gestor.alta(elemento);

  alert(insertado ? "Alta realizada" : "El elemento ya existe");
  frmAlta.reset();
  frmAlta.style.display = "none";
}
```

### Errores de conversión

- `Number("")` devuelve `0`: comprueba el vacío antes.
- `Number.isNaN(valor)` detecta una conversión inválida.
- Convierte radios y checkboxes a los valores que espera el modelo.
- No compares números como texto.
- Normaliza nombres con `trim()` y `toLowerCase()` cuando el enunciado lo permita.

### Eventos habituales

```js
document.getElementById("btnAlta").addEventListener("click", aceptarAlta);
```

Si el HTML ya define formularios y botones globales, respeta sus nombres y no inventes otros selectores.

---

## 7. Tablas y salida HTML

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
crearTabla(lista) {
  let html = `
    <table border="1">
      <thead>
        <tr><th>Código</th><th>Valor</th></tr>
      </thead>
      <tbody>`;

  for (const elemento of lista) {
    html += elemento.toHTMLRow();
  }

  return `${html}</tbody></table>`;
}
```

Antes de generar la tabla comprueba:

- [ ] La lista puede estar vacía.
- [ ] Las columnas coinciden con el enunciado.
- [ ] Las subclases muestran sus datos específicos.
- [ ] El resultado se inserta en el elemento correcto.

---

## 8. Caso tipo Vivero o almacén

El patrón habitual es:

```text
Alta:
  leer formulario
  convertir datos
  crear subclase según el tipo
  comprobar duplicado
  insertar

Actualización:
  buscar por código
  comprobar que existe
  validar la nueva cantidad
  modificar mediante setter

Listado:
  filtrar por clase o condición
  ordenar con comparador numérico
  generar tabla

Total:
  filtrar los objetos que cumplen
  contar con length o acumular con reduce
```

Puntos delicados:

- `instanceof` debe comprobar la clase correcta.
- Las propiedades de una subclase no existen en todos los objetos.
- El criterio de igualdad puede ser por código, nombre o DNI.
- Un alta duplicada no debe insertar el objeto.
- Un `find` puede devolver `undefined`.

---

## 9. Caso tipo agencias de viajes

### Modelo

- `Cliente`: DNI, nombre, apellidos y usuario calculado.
- `Alojamiento`: identificador y capacidad.
- `HabitacionHotel`: desayuno.
- `Apartamento`: aparcamiento y dormitorios.
- `Reserva`: identificador, cliente, fechas y alojamientos.
- Clase gestora: clientes, alojamientos y reservas.

### Usuario de cliente

La práctica propone construir el usuario con partes del nombre, apellidos y DNI. Respeta exactamente la regla del enunciado y normaliza:

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

### Solapamiento de reservas

Dos periodos se solapan cuando:

```js
inicioNueva <= finExistente &&
finNueva >= inicioExistente
```

Para comprobar disponibilidad:

1. Valida que las fechas sean correctas.
2. Comprueba que inicio no sea posterior a fin.
3. Busca reservas existentes.
4. Comprueba si usan el mismo alojamiento.
5. Comprueba si sus fechas se solapan.
6. No formalices una reserva parcial si la política exige operación atómica.

---

## 10. Simulacro de examen

### Enunciado

Implementa una clase base `Producto` con `codigo` y `precio`, y dos subclases:

- `Electronico`, con `marca` y `garantia`.
- `Mueble`, con `material`.

Implementa una clase `Almacen` que permita:

1. Dar de alta productos sin códigos repetidos.
2. Buscar por código.
3. Actualizar el precio sin permitir que disminuya.
4. Listar electrónicos con una garantía mínima, ordenados por precio descendente.
5. Calcular el valor total del almacén.
6. Generar una tabla HTML.
7. Recibir los datos desde un formulario.

### Orden de resolución

- [ ] Escribe `Producto`.
- [ ] Escribe las dos subclases y `super(...)`.
- [ ] Crea `Almacen` con `#productos`.
- [ ] Implementa alta y búsqueda.
- [ ] Implementa actualización.
- [ ] Implementa filtro y ordenación.
- [ ] Implementa `reduce` para el total.
- [ ] Implementa `toHTMLRow`.
- [ ] Conecta los botones y valida los inputs.
- [ ] Prueba duplicados, código inexistente, precio inválido y lista vacía.

### Pruebas mínimas

```js
const almacen = new Almacen();

const producto = new Electronico(
  1,
  799,
  "Marca",
  3,
);

console.assert(almacen.alta(producto) === true);
console.assert(almacen.alta(producto) === false);
console.assert(almacen.buscar(1) === producto);
console.assert(almacen.buscar(99) === undefined);
```

---

## 11. Plan de estudio para hoy

Adapta los tiempos a la hora disponible, pero mantén este orden:

### Bloque 1 - 45 minutos

- Lee este esquema.
- Repasa clases, atributos privados, getters/setters y `extends`.
- Escribe de memoria una clase base y una subclase.

### Bloque 2 - 60 minutos

- Practica la clase gestora.
- Haz altas sin duplicados, búsquedas, filtros, ordenación y `reduce`.
- Repite el patrón sin copiar el código.

### Bloque 3 - 45 minutos

- Repasa formularios, conversiones y eventos.
- Practica `trim`, `Number`, `Number.isNaN`, radios y checkboxes.
- Conecta un formulario pequeño con la clase gestora.

### Bloque 4 - 60 minutos

- Resuelve el simulacro completo.
- No mires la solución hasta terminar.
- Prueba también los casos de error.

### Bloque 5 - 45 minutos

- Revisa el examen Vivero y el examen de octubre de 2025.
- Compara nombres de métodos, condiciones y salidas.
- Repasa la práctica de agencias de viajes para reforzar relaciones entre objetos y fechas.

### Últimos 20 minutos

- Lee la checklist final.
- Memoriza las plantillas pequeñas.
- No intentes aprender una API nueva.

---

## 12. Errores que hacen perder puntos

1. Cambiar nombres de clases, métodos o propiedades pedidos.
2. Olvidar `super(...)` en una subclase.
3. Leer un atributo específico antes de comprobar `instanceof`.
4. No controlar `undefined` después de `find`.
5. Insertar duplicados.
6. Comparar números que siguen siendo texto.
7. Convertir `""` a `0` sin validar antes.
8. Ordenar números sin función comparadora.
9. Usar `>` cuando se pide `>=`.
10. Confundir `&&` con `||`.
11. Modificar el array al ordenar sin querer.
12. Mezclar la lógica de negocio con el DOM.
13. No devolver el valor esperado por el código de interfaz.
14. Generar una tabla con columnas diferentes a las del enunciado.
15. No probar casos vacíos, duplicados o inexistentes.

---

## 13. Checklist final

### Modelos

- [ ] Nombres exactos.
- [ ] Constructores correctos.
- [ ] Atributos privados o patrón solicitado.
- [ ] Getters/setters.
- [ ] `extends` y `super`.
- [ ] Métodos con el retorno esperado.

### Clase gestora

- [ ] Array inicializado.
- [ ] Altas sin duplicados.
- [ ] Búsqueda con control de `undefined`.
- [ ] Filtros correctos.
- [ ] Orden numérico correcto.
- [ ] Totales con valor inicial en `reduce`.

### Formularios

- [ ] Campos vacíos controlados.
- [ ] Números convertidos.
- [ ] `Number.isNaN`.
- [ ] Radios y booleanos interpretados correctamente.
- [ ] Botones conectados.
- [ ] Mensajes y destino HTML correctos.

### Última revisión

- [ ] No has cambiado el HTML entregado sin necesidad.
- [ ] Has probado un caso correcto y todos los casos de error.
- [ ] Has revisado las condiciones literalmente.
- [ ] Has comprobado la consola del navegador.
- [ ] Has guardado los archivos antes de entregar.

---

## Documentos relacionados

- [Repaso práctico de la Unidad 1](REPASO_EXAMEN_U1.md)
- [Cheatsheet de JavaScript y objetos](CheatSheets/cheatsheet-examen-javascript-objetos.md)
- [Guía de la práctica de agencias de viajes](CheatSheets/guia-practica-obligatoria-agencias-viajes.md)
- [Apuntes completos de JavaScript](APUNTES_JAVASCRIPT_U1.md)
