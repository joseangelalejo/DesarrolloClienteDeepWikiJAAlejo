const persona = {
  nombre: "Juan",
  apellidos: "Pérez Rodríguez",
  edad: 50,
  colorOjos: "blue",
};

console.log(persona);

document.getElementById("demo").innerHTML =
  persona.nombre + " tiene " + persona.edad + " años.";

persona.edad = 51;
persona.nacionalidad = "Española";
persona.presentate = function () {
  return (
    "Hola, soy " +
    this.nombre +
    " " +
    this.apellidos +
    " y tengo " +
    this.edad +
    " años"
  );
};

console.log(persona);

let salida = "";

console.log(typeof persona.presentate);

for (let atrib in persona) {
  if (typeof persona[atrib] != "function") {
    salida += persona[atrib] + " ";
  }
}

document.getElementById("demo").innerHTML += "<br>" + salida;
