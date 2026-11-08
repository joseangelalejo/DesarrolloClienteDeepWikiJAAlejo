class Producto {
    constructor(nombre, unidades, precio) {
        this._nombre = nombre;
        this._unidades = unidades;
        this._precio = precio;
    }
    // Getters y Setters
    get nombre() {
        return this._nombre;
    }
    set nombre(value) {
        this._nombre = value;
    }
    get unidades() {
        return this._unidades;
    }
    set unidades(value) {
        this._unidades = value;
    }
    get precio() {
        return this._precio;
    }
    set precio(value) {
        if (value < 0) {
            this._precio = -1*value;
        } else {
            this._precio = value;
        }
    }
    // Métodos solicitados
    valorEnStock() {
        return (
            this.unidades * this.precio
        );
    }
    incrementarStock(unEntero) {
        this.unidades += unEntero;
    }
    disminuirStock(unEntero) {
        this.unidades -= unEntero;
    }
    // Método para mostrar el objeto en pantalla
    imprimirProducto() {
        return (
            "Producto: " +
            this.nombre +
            " - Unidades: " +
            this.unidades +
            " - Precio: " +
            this.precio
        );
    }
}
// Parte de ejercicio 2
let producto1 = new Producto("Pan", 10, 2)
let producto2 = new Producto("Huevo", 20, 3)
let producto3 = new Producto("Leche", 30, 10)

console.log("PRODUCTOS SIN MODIFICAR")
console.log(producto1)
console.log(producto2)
console.log(producto3)

let sinModificar = producto1.imprimirProducto() + "</br>" + producto2.imprimirProducto() + "</br>" + producto3.imprimirProducto();

document.getElementById("salida1").innerHTML = sinModificar;

// Modificación de los objetos
producto1.nombre = "Pan de molde";
producto2.incrementarStock(10);
producto3.disminuirStock(10);

console.log("PRODUCTOS MODIFICADOS:")
console.log(producto1)
console.log(producto2)
console.log(producto3)

let trasModificar = producto1.imprimirProducto() + "</br>" + producto2.imprimirProducto() + "</br>" + producto3.imprimirProducto();

document.getElementById("salida2").innerHTML = trasModificar;