let notas = [8, 10, 7, 5, 7]
let mayores = 0
let menores = 0
for (nota of notas) {
    if (nota >= 7) {
        mayores+=1
    } else if(nota <7) {
        menores+=1
    }
}
console.log("Cantidad de notas: " + notas.length)
console.log("Notas mayores o iguales a 7: " + mayores + "\nNotas menores a 7: " + menores)