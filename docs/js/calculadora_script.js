document.addEventListener('DOMContentLoaded', () => {
    // 1. Elementos
    const display = document.getElementById('display');
    const buttons = document.querySelector('.calculator-grid');

    // 2. Variables de estado simplificadas para manejo de expresiones
    let currentInput = '0'; // Almacena toda la expresión (ej: 5*(2+3))
    let resultCalculated = false; // Bandera para saber si el último botón fue '='

    // 3. Funciones de manipulación

    // Actualiza la pantalla, reemplazando símbolos internos (*, /) por los de visualización (×, ÷)
    function updateDisplay() {
        let displayValue = currentInput.replace(/\*/g, '×').replace(/\//g, '÷');
        display.value = displayValue;
    }

    // Maneja la entrada de números
    function inputDigit(digit) {
        if (currentInput === '0' || resultCalculated) {
            currentInput = digit;
        } else {
            // Si el último carácter es un ')' lo interpretamos como multiplicación implícita
            if (currentInput.slice(-1) === ')') {
                currentInput += '*' + digit;
            } else {
                currentInput += digit;
            }
        }
        resultCalculated = false;
    }

    // Maneja el punto decimal
    function inputDecimal(dot) {
        // Previene añadir un punto si el último carácter ya es un operador, paréntesis o punto
        const lastChar = currentInput.slice(-1);
        if (['+', '-', '*', '/', '.', '(', ')'].includes(lastChar)) {
            return;
        }
        
        // Si el punto se presiona inmediatamente después de un resultado, comienza '0.'
        if (resultCalculated) {
            currentInput = '0.';
            resultCalculated = false;
            return;
        }
        
        // Busca el último número o paréntesis cerrado para ver si ya tiene punto
        const parts = currentInput.split(/[\+\-\*\/()]/).filter(p => p !== ''); // Divide por separadores
        const lastPart = parts[parts.length - 1] || ''; // Último segmento numérico

        // Solo añade el punto si el último segmento numérico no lo contiene
        if (!lastPart.includes(dot)) {
            currentInput += dot;
        }
        resultCalculated = false;
    }

    // Maneja operadores (+, -, *, /)
    function handleOperator(nextOperator) {
        const lastChar = currentInput.slice(-1);
        
        // Si el último carácter es un operador, lo reemplazamos (ej. 5 + * -> 5 *)
        if (['+', '-', '*', '/'].includes(lastChar)) {
            currentInput = currentInput.slice(0, -1) + nextOperator;
        } 
        // Previene operadores inmediatamente después de paréntesis abiertos o al inicio (excepto para signos unarios)
        else if (lastChar === '(' && ['*', '/'].includes(nextOperator)) {
            return; // No se permiten * o / después de (
        }
        // Permite añadir un operador después de un número, ')' o si es el inicio (para signo unario negativo)
        else if (currentInput !== '0' || nextOperator === '-') {
            // Si el resultado fue calculado, empezamos la nueva expresión con ese resultado y el operador
            if (resultCalculated) {
                currentInput += nextOperator;
            } else {
                currentInput += nextOperator;
            }
        }
        resultCalculated = false;
    }

    // Maneja paréntesis
    function handleParenthesis(paren) {
        const lastChar = currentInput.slice(-1);
        
        if (paren === '(') {
            // Si el resultado fue calculado, empezamos una nueva expresión con '('.
            if (resultCalculated) {
                currentInput = '(';
                resultCalculated = false;
                return;
            }
            // Añadir '(' si: está al inicio ('0' o vacío), o después de un operador o otro '('
            if (currentInput === '0' || ['+', '-', '*', '/', '('].includes(lastChar)) {
                currentInput = currentInput === '0' ? '(' : currentInput + '(';
            } 
            // Si viene después de un número o ')' insertamos un '*' implícito: 5( -> 5*(
            else if (['.', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ')'].includes(lastChar)) {
                currentInput += '*(';
            }
        } else if (paren === ')') {
            // Añadir ')' si: el último char NO es un operador/punto/paréntesis abierto, Y hay un '(' abierto pendiente de cerrar
            const openCount = (currentInput.match(/\(/g) || []).length;
            const closeCount = (currentInput.match(/\)/g) || []).length;
            
            if (!['+', '-', '*', '/', '.', '('].includes(lastChar) && openCount > closeCount) {
                currentInput += ')';
            }
        }
        resultCalculated = false;
    }

    // Restablece el cálculo (C)
    function resetCalculator() {
        currentInput = '0';
        resultCalculated = false;
    }

    // Retroceso (⌫)
    function backspace() {
        if (currentInput.length === 1 || resultCalculated) {
            currentInput = '0';
        } else {
            currentInput = currentInput.slice(0, -1);
        }
        resultCalculated = false;
    }
    
    // Realiza el cálculo (al presionar '=')
    function calculateResult() {
        try {
            // Reemplazar × y ÷ por * y / para que eval() funcione
            let finalExpression = currentInput.replace(/×/g, '*').replace(/÷/g, '/');
            
            // Cerrar cualquier paréntesis abierto pendiente (común en calculadoras)
            const openCount = (finalExpression.match(/\(/g) || []).length;
            const closeCount = (finalExpression.match(/\)/g) || []).length;
            for (let i = 0; i < openCount - closeCount; i++) {
                finalExpression += ')';
            }

            // Precaución: eval() es peligroso. En producción, se usaría un parser seguro.
            // Usamos eval() para simplificar el ejemplo.
            // eslint-disable-next-line no-eval
            let result = eval(finalExpression);
            
            // Manejo de NaN o Infinity
            if (!isFinite(result)) {
                currentInput = 'Error';
            } else {
                // Redondeamos para evitar problemas de precisión de coma flotante de JS
                currentInput = String(parseFloat(result.toFixed(10)));
            }
            
        } catch (error) {
            currentInput = 'Error de sintaxis';
        }
        resultCalculated = true;
    }


    // 4. Listener de eventos (Delegación de eventos)
    buttons.addEventListener('click', (event) => {
        const target = event.target;
        if (!target.matches('button')) {
            return;
        }
        
        // Números
        if (target.dataset.number) {
            inputDigit(target.dataset.number);
        }
        // Decimal
        else if (target.dataset.action === 'decimal') {
            inputDecimal('.');
        }
        // Paréntesis
        else if (target.dataset.action === 'open-paren') {
            handleParenthesis('(');
        }
        else if (target.dataset.action === 'close-paren') {
            handleParenthesis(')');
        }
        // Operadores
        else if (target.dataset.operator) {
            // Usamos * y / para la lógica interna de JS
            let op = target.dataset.operator;
            if (op === '×') op = '*';
            if (op === '÷') op = '/';
            handleOperator(op);
        }
        // Igual (=)
        else if (target.dataset.action === 'calculate') {
            calculateResult();
        }
        // Borrar Todo (C)
        else if (target.dataset.action === 'clear') {
            resetCalculator();
        }
        // Retroceso (⌫)
        else if (target.dataset.action === 'backspace') {
            backspace();
        }

        updateDisplay();
    });

    // Asegura que la pantalla se inicialice en 0 al cargar
    updateDisplay();
});