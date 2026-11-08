function mostrarCantidad() {
    let precioInput = document.getElementById("precio");
    let cantidadInput = document.getElementById("cantidad");
    precio = parseFloat(precioInput.value);
    cantidad = parseInt(cantidadInput.value);
    let cantidadAbonar = precio * cantidad;
    console.log("Cantidad a abonar: " + cantidadAbonar + " - Tipo de dato: " + typeof(cantidadAbonar));

    document.getElementById("salida2").innerHTML = "Cantidad a abonar: " + cantidadAbonar + "€";
}