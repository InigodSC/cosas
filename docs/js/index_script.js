document.addEventListener('DOMContentLoaded', () => {
    // const frierenImage = document.getElementById('frierenImage'); // Ya no es constante aquí
    const toggleBtn = document.getElementById('toggleSidebarBtn');
    const sidebar = document.getElementById('sidebar');

    // Función para la animación de la imagen al hacer clic (ahora dentro del listener si existe)
    function animateImage(imageElement) {
        if (imageElement.classList.contains('animated')) {
            return;
        }
        imageElement.classList.add('animated');
        imageElement.addEventListener('animationend', () => {
            imageElement.classList.remove('animated');
        }, { once: true });
    }

    // --- Lógica de la barra lateral (funciona en todas las páginas) ---
    function toggleSidebar() {
        sidebar.classList.toggle('closed');
    }
    
    // El botón de toggle siempre debe existir y funcionar
    if (toggleBtn && sidebar) {
         toggleBtn.addEventListener('click', toggleSidebar);
    }


    // --- Lógica de la imagen (solo funciona en index.html) ---
    // Comprobamos si la imagen existe en esta página antes de intentar añadir el listener
    const frierenImage = document.getElementById('frierenImage');
    if (frierenImage) {
        frierenImage.addEventListener('click', () => {
            animateImage(frierenImage);
        });
        // También podemos ejecutar la animación por defecto si queremos:
        // animateImage(frierenImage); 
    }

});
