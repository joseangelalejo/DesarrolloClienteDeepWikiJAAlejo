/*
    Implemente una clase Figura que represente de forma genérica a cualquier figura geométrica, 
    debe tener un atributo color con sus correspondientes consultores y modificadores. 
    Tendrá un constructor que recibirá el color como único parámetro e inicializará el atributo del mismo nombre. 
    Además tendrá un método llamado imprimir que devolvería una cadena como esta si el atributo color fuera “rojo”: “Soy una figura de color rojo”. 
    Crear una clase Rectangulo que herede de Figura. Los objetos de esta nueva clase tendrán los atributos base y altura, con sus modificadores y consultores. 
    El método constructor recibe los parámetros de color, base y altura. 
    De Figura también hereda la clase Circulo, que tendrá el atributo radio y sus métodos consultores y modificadores correspondientes. 
    Ambas clases hijas tendrán un método calcularArea, que devolverá el área de la figura representada. 
    Las dos redefinirán el método imprimir de manera que exprese qué figura es, cuál es su área y su color, por ejemplo: “Soy un rectángulo rojo de 20 cm2”. 
    
    Instanciar varios objetos Figura, Circulo y Rectangulo y comprobar si tienen un funcionamiento correcto.
*/
class Figura {
    constructor(color) {
        this._color = color;
    }

    getColor() {
        return this._color;
    }

    setColor(color) {
        this._color = color;
    }

    imprimir() {
        return `Soy una figura de color ${this._color}`;
    }
}

class Rectangulo extends Figura {
    constructor(color, base, altura) {
        super(color);
        this._base = base;
        this._altura = altura;
    }

    getBase() {
        return this._base;
    }

    setBase(base) {
        this._base = base;
    }

    getAltura() {
        return this._altura;
    }

    setAltura(altura) {
        this._altura = altura;
    }

    calcularArea() {
        return this._base * this._altura;
    }

    imprimir() {
        return `Soy un rectángulo ${this._color} de ${this.calcularArea()} cm2`;
    }
}

class Circulo extends Figura {
    constructor(color, radio) {
        super(color);
        this._radio = radio;
    }

    getRadio() {
        return this._radio;
    }

    setRadio(radio) {
        this._radio = radio;
    }

    calcularArea() {
        return Math.PI * Math.pow(this._radio, 2);
    }

    imprimir() {
        return `Soy un círculo ${this._color} de ${this.calcularArea()} cm2`;
    }
}
// Instancia de objetos
let figura1 = new Figura("rojo");
let rectangulo1 = new Rectangulo("azul", 5, 10);
let circulo1 = new Circulo("verde", 7);

console.log(figura1.imprimir());
console.log(rectangulo1.imprimir());
console.log(circulo1.imprimir());

document.getElementById("figura1").innerHTML = figura1.imprimir();
document.getElementById("figura2").innerHTML = rectangulo1.imprimir();
document.getElementById("figura3").innerHTML = circulo1.imprimir();

// Modificación de valores
figura1.setColor("amarillo");
rectangulo1.setBase(8);
rectangulo1.setAltura(12);
circulo1.setRadio(10);

document.getElementById("figura1despues").innerHTML = figura1.imprimir();
document.getElementById("figura2despues").innerHTML = rectangulo1.imprimir();
document.getElementById("figura3despues").innerHTML = circulo1.imprimir();