// Función que se activa con el onclick="sumarNumeros()" en el HTML
function sumarNumeros() {
    // Obtenemos los valores de los inputs por su ID
    // Usamos .value para obtener el texto y parseFloat para convertirlo a número
    const num1_str = document.getElementById('num1').value;
    const num2_str = document.getElementById('num2').value;
    
    // Obtenemos el elemento donde mostraremos el resultado
    const outputResultado = document.getElementById('resultado');

    // Intentamos realizar la operación de forma segura
    try {
        const n1 = parseFloat(num1_str);
        const n2 = parseFloat(num2_str);

        // Verificamos si los valores son números válidos (no NaN)
        if (isNaN(n1) || isNaN(n2)) {
            throw new Error("Entrada inválida. Asegúrate de introducir números.");
        }

        const resultadoSuma = n1 + n2;

        // Escribimos el resultado en el elemento HTML
        //outputResultado.textContent = resultadoSuma;
        outputResultado.textContent = "hola mundo";
    } catch (error) {
        // En caso de error (ej. campos vacíos), mostramos un mensaje
        outputResultado.textContent = "Error";
        console.error(error);
    }
}
