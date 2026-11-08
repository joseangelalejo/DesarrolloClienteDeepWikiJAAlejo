class Figura {
  _color;
  constructor(color) {
    this._color = color;
  }
  get color() {
    return this._color;
  }
  set color(value) {
    this._color = value;
  }
  imprimir() {
    return "Soy una figura de color " + this.color;
  }
}

class Rectangulo extends Figura {
  _base;
  _altura;
  constructor(color, base, altura) {
    super(color);
    this._altura = altura;
    this._base = base;
  }

  get altura() {
    return this._altura;
  }
  set altura(value) {
    this._altura = value;
  }
  get base() {
    return this._base;
  }
  set base(value) {
    this._base = value;
  }
  calcularArea() {
    return this._base * this._altura;
  }
  imprimir() {
    return (
      "Soy un rectángulo " + this._color + " de " + this.calcularArea() + " cm2"
    );
  }
}

class Circulo extends Figura {
  _radio;
  constructor(color, radio) {
    super(color);
    this._radio = radio;
  }
  get radio() {
    return this._radio;
  }
  set radio(value) {
    this._radio = value;
  }
  calcularArea() {
    return Math.pow(this._radio, 2) * Math.PI;
  }

  imprimir() {
    return (
      "Soy un círculo " + this._color + " de " + this.calcularArea() + " cm2"
    );
  }
}

const fig1 = new Figura("verde");
const rec1 = new Rectangulo("rojo", 5, 2);
const rec2 = new Rectangulo("amarillo", 7, 3);
const cir1 = new Circulo("azul", 4);
const cir2 = new Circulo("marrón", 9);
let textoSalida1 = "";
textoSalida1 +=
  fig1.imprimir() +
  "<br>" +
  rec1.imprimir() +
  "<br>" +
  rec2.imprimir() +
  "<br>" +
  cir1.imprimir() +
  "<br>" +
  cir2.imprimir();

document.getElementById("salida1").innerHTML = textoSalida1;

// Aprovechamos para recorrer los objetos

let textoSalida2 = "";
/*for (let atrib in rec1) {
  textoSalida2 += rec1[atrib] + "<br>";
}*/

for (let entry of Object.values(rec1)) {
  textoSalida2 += entry + "<br>";
}

document.getElementById("salida2").innerHTML = textoSalida2;
