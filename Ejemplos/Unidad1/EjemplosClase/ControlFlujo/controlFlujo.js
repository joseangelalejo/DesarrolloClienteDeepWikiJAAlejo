let num1,num2,mensaje;
num1=prompt("Introduzca el número 1: ");
num2=prompt("Introduzca el número 2: ");

if(num1>num2){
    mensaje= num1 + " es mayor que " + num2;
} else if (num2>num1){
    mensaje= num2 + " es mayor que " + num1;
} else {
    mensaje= "Los números son iguales";
}

for (let i=1;i<=10;i++){
    mensaje+="<br>"+num1+" x "+i+" = "+(num1*i);
}


document.getElementById("salida").innerHTML=mensaje;