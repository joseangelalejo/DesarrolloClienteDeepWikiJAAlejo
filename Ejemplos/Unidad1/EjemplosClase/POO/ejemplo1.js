class Alumno {
  #nombre;
  #apellidos;
  #edad;
  constructor(nombre, apellidos, edad) {
    this.#nombre = nombre;
    this.#edad = edad;
    this.#apellidos = apellidos;
  }

  get nombre() {
    return this.#nombre;
  }

  set nombre(nombre) {
    this.#nombre = nombre;
  }

  get apellidos() {
    return this.#apellidos;
  }

  set apellidos(apellidos) {
    this.#apellidos = apellidos;
  }

  get edad() {
    return this.#edad;
  }

  set edad(edad) {
    if (edad < 0) {
      this.#edad = -1 * edad;
    } else {
      this.#edad = edad;
    }
  }

  imprimeAlumno() {
    return (
      "Alumno: " +
      this.nombre +
      " " +
      this.apellidos +
      " - " +
      this.edad +
      " años"
    );
  }
}

let alum1 = new Alumno("Pedro", "González López", 24);
let alum2 = new Alumno("Marta", "Ruiz González", 31);
let alum3 = new Alumno("Inmaculada", "Sánchez López", 23);
alum3.nacionalidad = "Española";
alum3.imprimeAlumno = function () {
  return (
    "Alumno: " +
    this.nombre +
    " " +
    this.apellidos +
    " - " +
    this.edad +
    " años -- " +
    this.nacionalidad
  );
};

console.log(alum1);
console.log(alum2);
console.log(alum3);

document.getElementById("salida1").innerHTML =
  alum1.imprimeAlumno() +
  "<br>" +
  alum2.imprimeAlumno() +
  "<br>" +
  alum3.imprimeAlumno();

alum1.nombre = "Juan";
alum1.edad = -23;
alum1.edad = -45;

document.getElementById("salida2").innerHTML =
  alum1.imprimeAlumno() +
  "<br>" +
  alum2.imprimeAlumno() +
  "<br>" +
  alum3.imprimeAlumno();
