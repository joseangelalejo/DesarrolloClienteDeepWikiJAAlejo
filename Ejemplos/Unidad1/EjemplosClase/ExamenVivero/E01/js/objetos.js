class Arbol {
  _codigo;
  _tallaje;
  _especie;

  constructor(codigo, tallaje, especie) {
    this._especie = especie;
    this._codigo = codigo;
    this._tallaje = tallaje;
  }
  get especie() {
    return this._especie;
  }
  set especie(value) {
    this._especie = value;
  }
  get tallaje() {
    return this._tallaje;
  }
  set tallaje(value) {
    this._tallaje = value;
  }
  get codigo() {
    return this._codigo;
  }
  set codigo(value) {
    this._codigo = value;
  }
  toHTMLRow() {
    let salida = "<tr>";

    /*salida =
      "<tr><td>" +
      this.codigo +
      "</td><td>" +
      this.especie +
      "</td><td>" +
      this.tallaje +
      "</td></tr>";*/

    for (let atrib of Object.values(this)) {
      salida += "<td>" + atrib + "</td>";
    }
    salida += "</tr>";

    return salida;
  }
}

class Perenne extends Arbol {
  _frutal;
  constructor(codigo, tallaje, especie, frutal) {
    super(codigo, tallaje, especie);
    this._frutal = frutal;
  }
  get frutal() {
    return this._frutal;
  }
  set frutal(value) {
    this._frutal = value;
  }

  /*toHTMLRow() {
    let salida;
    salida = super.toHTMLRow();
    salida = salida.replace("</tr>", "");
    salida += "<td>" + this.frutal + "</td></tr>";
    return salida;
  }*/
}

class Caduco extends Arbol {
  _mesFloracion;
  constructor(codigo, tallaje, especie, mesFloracion) {
    super(codigo, tallaje, especie);
    this._mesFloracion = mesFloracion;
  }
  get mesFloracion() {
    return this._mesFloracion;
  }
  set mesFloracion(value) {
    this._mesFloracion = value;
  }
}

class Vivero {
  _arboles;
  constructor() {
    this._arboles = [];
  }
  get arboles() {
    return this._arboles;
  }
  set arboles(value) {
    this._arboles = value;
  }

  altaArbol(oArbol) {
    /* Solución con función flecha */
    let existe = this.arboles.some((elem) => elem.codigo === oArbol.codigo);
    if (!existe) {
      this.arboles.push(oArbol);
    }
    return !existe;

    /* SOLUCIÓN ITERATIVA
    
    let encontrado= false;
    for(let arbol of this.arboles){
      if(arbol.codigo===oArbol.codigo){
        encontrado=true;
      }
    }
    if(encontrado){
      return false;
    } else {
      this.arboles.push(oArbol);
      return true;
    } FIN SOLUCIÓN ITERATIVA*/

    /* Solución usando some pero con función con notación clásica
    function test(arbol) {
      return arbol.codigo === oArbol.codigo;
    }
    let existe = this.arboles.some(test);
    if (!existe) {
      this.arboles.push(oArbol);
    }
    return !existe;
     FIN SOLUCIÓN CON SOME Y FUNCIÓN CLÁSICA*/
  }
  tallajeArbol(iCodigo, iTallaje) {
    let arbol = this.arboles.find((elem) => elem.codigo === iCodigo);
    let respuesta = "";
    if (arbol === undefined) {
      respuesta = "Árbol no registrado";
    } else if (arbol.tallaje > iTallaje) {
      respuesta = "Tallaje inferior al registrado";
    } else {
      arbol.tallaje = iTallaje;
      respuesta = "Correcto, tallaje actualizado ";
      let tipoArbol;
      arbol instanceof Caduco //operador ternario
        ? (tipoArbol = "Caduco")
        : (tipoArbol = "Perenne");
      respuesta += tipoArbol;
    }
    return respuesta;
  }

  listadoCaduco(sMesFloracion) {
    const mesBuscado = sMesFloracion.trim().toLowerCase();
    const arbolesFiltrados = this.arboles.filter(
      (elem) =>
        elem instanceof Caduco &&
        elem.mesFloracion.toLowerCase() === mesBuscado,
    );

    let salida =
      '<table border="1"><thead><tr><th>Código</th><th>Tallaje</th><th>Especie</th><th>Floración</th></tr></thead><tbody>';

    for (const arbol of arbolesFiltrados) {
      salida += arbol.toHTMLRow();
    }

    salida += "</tbody></table>";
    return salida;
  }

  listadoPerennes(iMinAltura) {
    let tablaPerennes = this.arboles.filter(
      (elem) => elem instanceof Perenne && elem.tallaje >= iMinAltura,
    );
    tablaPerennes.sort((a, b) => b.tallaje - a.tallaje);
    let salida =
      '<table border="1"><thead><th>Código</th><th>Tallaje</th><th>Especie</th><th>Frutal</th></thead><tbody>';
    for (let arbol of tablaPerennes) {
      salida += arbol.toHTMLRow();
    }
    salida += "</tbody></table>";
    return salida;
  }

  totalArbolesVenta() {
    let tablaVentas = this.arboles.filter(
      (elem) =>
        (elem instanceof Caduco && elem.tallaje > 100) ||
        (elem instanceof Perenne && elem.frutal && elem.tallaje > 80) ||
        (elem instanceof Perenne && !elem.frutal && elem.tallaje > 120),
    );
    return tablaVentas.length;
  }
}
