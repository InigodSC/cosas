document.addEventListener('DOMContentLoaded', () => {
    const metalCards = document.querySelectorAll('.metal-card');
    const metalModal = document.getElementById('metalModal');
    const modalContent = document.getElementById('modalContent');
    const modalCloseBtn = document.querySelector('.modal-close');

    // Mapeo de colores de grupo (Necesario para mantener la coherencia visual)
    const getCssColor = (className) => {
        const tempElement = document.createElement('div');
        tempElement.className = `metal-card ${className}`;
        document.body.appendChild(tempElement);
        const color = window.getComputedStyle(tempElement, '::before').backgroundColor;
        document.body.removeChild(tempElement);
        return color;
    };

    const colorMap = {
        'group-fisico': getCssColor('group-fisico'),
        'group-mental': getCssColor('group-mental'),
        'group-temporal': getCssColor('group-temporal'),
        'group-mejora': getCssColor('group-mejora'),
    };
    const defaultColor = 'var(--gold-accent)';

    // --- Funciones del Modal ---

    function showModal(event, metal, clasificacion, uso, groupColor) {
        // 1. Llenar el contenido
        modalContent.innerHTML = `
            <h3 style="color: ${groupColor};">${metal}</h3>
            <p><strong>Clasificación:</strong> ${clasificacion}</p>
            <p class="uso-modal">${uso}</p>
        `;
        
        // 2. Establecer el color del borde y sombra del modal
        metalModal.style.borderColor = groupColor;
        metalModal.style.boxShadow = `0 5px 15px rgba(0, 0, 0, 0.7), 0 0 10px ${groupColor}`;

        // 3. Posicionar el modal cerca del clic (o el centro de la tarjeta)
        const rect = event.currentTarget.getBoundingClientRect();
        
        // Calcular la posición central de la tarjeta
        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;
        
        // Offset para mover el modal hacia arriba y a la izquierda de la tarjeta
        const modalWidth = 300; // Ancho definido en CSS
        
        // Establecer la posición (ajustada para que no se salga de la pantalla)
        let finalX = cardCenterX - (modalWidth / 2);
        let finalY = cardCenterY - 100; // Ligeramente arriba del centro de la tarjeta

        // Corrección si se sale por la derecha
        if (finalX + modalWidth > window.innerWidth) {
             finalX = window.innerWidth - modalWidth - 20;
        }
        // Corrección si se sale por la izquierda
        if (finalX < 20) {
            finalX = 20;
        }
        // Corrección si se sale por arriba
        if (finalY < 60) {
            finalY = 60; // Debajo del header
        }
        
        metalModal.style.left = `${finalX}px`;
        metalModal.style.top = `${finalY}px`;
        
        // 4. Mostrar
        metalModal.classList.add('open');
    }
    
    function hideModal() {
        metalModal.classList.remove('open');
    }

    // --- Event Listeners ---

    metalCards.forEach(card => {
        card.addEventListener('click', (event) => {
            // Primero ocultamos cualquier modal abierto para que no haya superposición
            hideModal(); 
            
            const metal = card.getAttribute('data-metal');
            const clasificacion = card.getAttribute('data-clasificacion');
            const uso = card.getAttribute('data-uso');

            let groupColor = defaultColor;
            for (const group in colorMap) {
                if (card.classList.contains(group)) {
                    groupColor = colorMap[group];
                    break;
                }
            }
            
            showModal(event, metal, clasificacion, uso, groupColor);
        });
    });

    // Cerrar modal al hacer clic en la 'x'
    modalCloseBtn.addEventListener('click', hideModal);

    // Cerrar modal al hacer clic fuera del modal (en cualquier parte del documento)
    document.addEventListener('click', (event) => {
        const isClickInsideModal = metalModal.contains(event.target);
        const isClickOnCard = event.target.closest('.metal-card');
        
        // Si no se hizo clic dentro del modal Y no se hizo clic en una tarjeta de metal
        if (!isClickInsideModal && !isClickOnCard && metalModal.classList.contains('open')) {
            hideModal();
        }
    });
});