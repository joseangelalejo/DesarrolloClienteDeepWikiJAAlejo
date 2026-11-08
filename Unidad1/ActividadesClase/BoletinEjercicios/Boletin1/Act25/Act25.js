console.log("Múltiplos de 8 hasta 500: ");
console.log("Implementación 1: ");
for (let i = 1; i <= 500; i++) {
    if (i % 8 === 0) {
        console.log(i);
    }
}
console.log("\nImplementación 2: ");
for (let i = 8; i <= 500; i += 8) {
    console.log(i);
}