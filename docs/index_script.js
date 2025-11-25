document.addEventListener('DOMContentLoaded', () => {
    const frierenImage = document.getElementById('frierenImage');
    const toggleBtn = document.getElementById('toggleSidebarBtn');
    const sidebar = document.getElementById('sidebar');

    // Función para la animación de la imagen al hacer clic
    function animateImage() {
        // Si ya está animándose, no hacer nada para evitar glitches
        if (frierenImage.classList.contains('animated')) {
            return;
        }
        
        // Añade la clase CSS que activa la animación @keyframes
        frierenImage.classList.add('animated');

        // Escucha cuándo termina la animación para eliminar la clase y permitir repetirla
        frierenImage.addEventListener('animationend', () => {
            frierenImage.classList.remove('animated');
        }, { once: true }); // El { once: true } asegura que el listener se elimine solo
    }

    // Añadir el listener de clic a la imagen
    frierenImage.addEventListener('click', animateImage);


    // Función para alternar la visibilidad de la barra lateral
    function toggleSidebar() {
        sidebar.classList.toggle('closed');
    }
    
    // Añadir el listener de clic al botón de toggle
    toggleBtn.addEventListener('click', toggleSidebar);
});
