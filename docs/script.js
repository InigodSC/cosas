// Esperamos a que todo el HTML esté cargado antes de ejecutar JS
document.addEventListener('DOMContentLoaded', () => {
    // Seleccionamos la caja por su ID
    const box = document.getElementById('box');
    const animateButton = document.getElementById('animateButton');

    // Función para realizar la animación con JavaScript
    function runAnimation() {
        // Usamos la API Web Animations (moderna y eficiente)
        // Definimos los Keyframes (estados inicial y final)
        const keyframes = [
            // Inicio: posición original ( translateX(0px) ), opacidad 1
            { transform: 'translateX(0px)', opacity: 1, backgroundColor: '#28a745' },
            // Mitad: mover a la derecha, girar, cambiar color
            { transform: 'translateX(600px) rotate(180deg)', opacity: 0.5, backgroundColor: '#007bff' },
            // Fin: volver a la posición original, opacidad 1
            { transform: 'translateX(0px)', opacity: 1, backgroundColor: '#28a745' }
        ];

        // Definimos las opciones de la animación
        const options = {
            duration: 2000, // Duración total de 2 segundos (en milisegundos)
            iterations: 1, // Se ejecuta solo una vez
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
