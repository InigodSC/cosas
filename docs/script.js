// Esperamos a que todo el HTML esté cargado antes de ejecutar JS
document.addEventListener('DOMContentLoaded', () => {
    // Seleccionamos la caja y el botón por su ID
    const box = document.getElementById('box');
    const animateButton = document.getElementById('animateButton');

    // Función para realizar la animación con JavaScript
    function runAnimation() {
        // Definimos los Keyframes (estados inicial y final/medio)
        const keyframes = [
            // Inicio
            { transform: 'translateX(0px) scale(1)', opacity: 1, backgroundColor: '#28a745' },
            // Mitad del camino
            { transform: 'translateX(600px) scale(1.5) rotate(180deg)', opacity: 0.5, backgroundColor: '#007bff' },
            // Fin (vuelve al inicio)
            { transform: 'translateX(0px) scale(1)', opacity: 1, backgroundColor: '#28a745' }
        ];

        // Definimos las opciones de la animación
        const options = {
            duration: 2000, // Duración total de 2 segundos (en milisegundos)
            iterations: 1, // Se ejecuta solo una vez por clic
            easing: 'ease-in-out', // Curva de aceleración suave
            fill: 'forwards' // Mantiene el estado final de la animación
        };

        // Ejecutamos la animación en la caja
        box.animate(keyframes, options);
    }

    // Añadimos un "listener" al botón para que ejecute la función al hacer clic
    animateButton.addEventListener('click', runAnimation);
    
    // Opcional: También puedes hacer que la caja se anime al hacer clic en ella
    box.addEventListener('click', runAnimation);

    // Ejecutar la animación por primera vez al cargar la página
    runAnimation();
});
