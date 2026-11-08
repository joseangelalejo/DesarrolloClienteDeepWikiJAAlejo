// Variables globales
let num1 = 0;
let num2 = 0;
let operacion = '';
let operacionActiva = false;

function agregarValor(valor) {

    let pantallaCalculadora = formularioCalculadora.pantallaCalculadora;
    let pantallaAuxiliar = formularioCalculadora.pantallaAuxiliar;

    if (valor === '+' || valor === '-' || valor === '*' || valor === '/') {
        if (pantallaCalculadora.value !== '') {
            num1 = parseFloat(pantallaCalculadora.value);
            operacion = valor;
            operacionActiva = true;
            pantallaCalculadora.value = '0';
            console.log(num1, operacion, num2);
            pantallaAuxiliar.value = num1 + ' ' + operacion;
        }
    } else {
        // Si es un número
        if (pantallaCalculadora.value === '0') {
            pantallaCalculadora.value = valor;
        } else {
            pantallaCalculadora.value += valor;
        } 
    }
    // console.log('Num1: ' + num1 + ' Ope:' + operacion + ' Num2:' + num2);
    // console.log('Valor pantalla auxiliar: ' + pantallaAuxiliar.value);
    // console.log('Valor pantalla calculadora: ' + pantallaCalculadora.value);
}

function calcular() {
    let pantallaCalculadora = formularioCalculadora.pantallaCalculadora;
    let pantallaAuxiliar = formularioCalculadora.pantallaAuxiliar;
    var resultado = 0;
    
    if (pantallaCalculadora.value !== '' && operacionActiva) {
        num2 = parseFloat(pantallaCalculadora.value);
        
        // Switch para realizar la operación según el operador
        switch (operacion) {
            case '+':
                resultado = num1 + num2;
                // console.log('Num1: ' + num1 + ' Ope:' + operacion + ' Num2:' + num2);
                // console.log('Valor pantalla auxiliar: ' + pantallaAuxiliar.value);
                // console.log('Valor pantalla calculadora: ' + pantallaCalculadora.value);
                break;
            case '-':
                resultado = num1 - num2;
                // console.log('Num1: ' + num1 + ' Ope: ' + operacion + ' Num2: ' + num2);
                // console.log('Valor pantalla auxiliar: ' + pantallaAuxiliar.value);
                // console.log('Valor pantalla calculadora: ' + pantallaCalculadora.value);
                break;
            case '*':
                resultado = num1 * num2;
                // console.log('Num1: ' + num1 + ' Ope:' + operacion + ' Num2:' + num2);
                // console.log('Valor pantalla auxiliar: ' + pantallaAuxiliar.value);
                // console.log('Valor pantalla calculadora: ' + pantallaCalculadora.value);
                break;
            case '/':
                if (num2 !== 0) {
                    resultado = num1 / num2;
                    // console.log('Num1: ' + num1 + ' Ope:' + operacion + ' Num2:' + num2);
                    // console.log('Valor pantalla auxiliar: ' + pantallaAuxiliar.value);
                    // console.log('Valor pantalla calculadora: ' + pantallaCalculadora.value);
                } else {
                    pantallaCalculadora.value = 'Error';
                    operacionActiva = false;
                    // console.log('Num1: ' + num1 + ' Ope:' + operacion + ' Num2:' + num2);
                    // console.log('Valor pantalla auxiliar: ' + pantallaAuxiliar.value);
                    // console.log('Valor pantalla calculadora: ' + pantallaCalculadora.value);
                    return;
                }
                break;
            default:
                resultado = num1;
        }
        // console.log('Num1: ' + num1 + ' Ope:' + operacion + ' Num2:' + num2);
        // console.log('Valor pantalla auxiliar: ' + pantallaAuxiliar.value);
        // console.log('Valor pantalla calculadora: ' + pantallaCalculadora.value);
        pantallaAuxiliar.value = num1 + ' ' + operacion + ' ' + num2 + ' = ' + resultado;
        num1 = resultado;
        pantallaCalculadora.value = resultado;
        num2 = 0;
        operacion = '';
        operacionActiva = false;
    }
}