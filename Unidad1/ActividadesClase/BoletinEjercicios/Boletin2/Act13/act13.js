let t = [2, 8, 3, 5, 1, 0, 9, 6, -6, 4];

imprimirArray(t, "entrada");
if (t.length % 2 == 0) {
    t.sort(ordenacionParesDelante);
} else {
    t.sort(ordenacionImparesDelante);
}

imprimirArray(t, "salida");

function ordenacionParesDelante(a, b) {
    //Pares delante
    let rdo;
    if (a % 2 == b % 2) {
        rdo = a - b;
    } else if (a % 2 == 0) {
        rdo = -1;
    } else {
        rdo = 1;
    }
    return rdo;
}

function ordenacionImparesDelante(a, b) {
    //Impares delante
    let rdo;
    if (a % 2 == b % 2) {
        rdo = a - b;
    } else if (a % 2 != 0) {
        rdo = -1;
    } else {
        rdo = 1;
    }
    return rdo;
}

function imprimirArray(tabla, ubicacionSalida) {
    document.getElementById(ubicacionSalida).innerHTML = tabla.join(" | ");
}

/* - Aun sin terminar - Se pretende hacer con sort (arriba corrección de profesor)

const arrayInicial = [1, 15, 4, 6, 10, 2, 3, 5, 7, 8, 15, 11, 23, 13, 14];

document.getElementById("arrayInicial").innerHTML = arrayInicial.join(', ');

const arraySeparado = [[], []] // Pos0 para pares, Pos1 para impares

const decidirOrdenacion() {
    if (arrayInicial.length%2 == 0) {
        return True;
    } else {
        return false;
    }
}
let primeroPar = decidirOrdenacion();
console.log(primeroPar);
const filtrarArray = () => {
    for (let i = 0; i < arrayInicial.length; i++) {
        if (primeroPar == True) {
            if (i%2 == 0) {
                arraySeparado[1].push(i);
            } else {
                arraySeparado[2].push(i);
            }
        } else {
            if (i%2 == 0) {
                arraySeparado[2].push(i);
            } else {
                arraySeparado[1].push(i);
            }
        }
    }
    console.log(arraySeparado);
}

*/