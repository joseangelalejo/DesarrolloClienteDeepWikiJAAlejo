class Producto {
  _nombre;
  _unidades;
  _precio;
  constructor(nombre, precio) {
    this._nombre = nombre;
    this._precio = precio;
    this._unidades = 0;
  }
  get precio() {
    return this._precio;
  }
  set precio(value) {
    this._precio = Math.abs(value);
  }
  get unidades() {
    return this._unidades;
  }
  set unidades(value) {
    this._unidades = value;
  }
  get nombre() {
    return this._nombre;
  }
  set nombre(value) {
    this._nombre = value;
  }
  valorEnStock() {
    return this.unidades * this.precio;
  }
  incrementarStock(unidades) {
    this.unidades += unidades;
  }
  disminuirStock(unidades) {
    this.unidades -= unidades;
  }
}

//Ejercicios 2

let p1 = new Producto("Caja de galletas", 1.5);
console.log(p1);
p1.incrementarStock(50);
document.getElementById("salida").innerHTML =
  "Valor en Stock: " + p1.valorEnStock();
p1.precio = -2.25;
console.log(p1);

//Modificación de un objeto literal

p1._nacionalidad = "española";

console.log(p1);

let p2 = { _nombre: "Cola-cao", _unidades: 35, _precio: 4.35 };

console.log(p2.valorEnStock());
p2.valorEnStock = function () {
  return this._unidades * this._precio;
};
console.log(p2);

document.getElementById("salida").innerHTML =
  "Valor en Stock: " + p2.valorEnStock();
