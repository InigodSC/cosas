document.addEventListener('DOMContentLoaded', () => {
    const frierenImage = document.getElementById('frierenImage');
    const toggleBtn = document.getElementById('toggleSidebarBtn');
    const sidebar = document.getElementById('sidebar');

    function animateImage() {
        if (frierenImage.classList.contains('animated')) {
            return;
        }
        frierenImage.classList.add('animated');
        frierenImage.addEventListener('animationend', () => {
            frierenImage.classList.remove('animated');
        }, { once: true });
    }

    // Simplemente alterna la clase 'closed'
    function toggleSidebar() {
        sidebar.classList.toggle('closed');
    }
    
    frierenImage.addEventListener('click', animateImage);
    toggleBtn.addEventListener('click', toggleSidebar);
});
