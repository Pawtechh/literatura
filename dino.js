const dino = document.getElementById('dino');
const gameContainer = document.querySelector('.game-container');
const scoreDisplay = document.getElementById('score'); // Elemento para mostrar la puntuación
let score = 0; // Inicializar puntuación
let speed = 5; // Velocidad inicial del cactus
let gameOver = false; // Estado del juego

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space' && !gameOver) {
        jump();
    }
});

function jump() {
    if (!dino.classList.contains('jump')) {
        dino.classList.add('jump');

        setTimeout(function() {
            dino.classList.remove('jump');
        }, 300); // Duración del salto
    }
}

function createCactus() {
    const cactus = document.createElement('div');
    cactus.classList.add('cactus');
    cactus.style.right = '25px'; // Posición inicial del primer cactus
    gameContainer.appendChild(cactus);

    let cactusAnimation = setInterval(function() {
        if (gameOver) {
            clearInterval(cactusAnimation);
            return; // Detener la animación si el juego ha terminado
        }

        let cactusRight = parseInt(window.getComputedStyle(cactus).getPropertyValue('right'));

        if (cactusRight > window.innerWidth) {
            clearInterval(cactusAnimation);
            cactus.remove(); // Eliminar cactus cuando sale de la pantalla
            updateScore(); // Actualizar puntuación cuando se evita el cactus
        } else {
            cactus.style.right = cactusRight + speed + 'px'; // Mover cactus a la izquierda
        }

        checkCollision(cactus, cactusAnimation);
    }, 20);
}

function checkCollision(cactus, cactusAnimation) {
    let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue('bottom'));
    let cactusLeft = window.innerWidth - parseInt(window.getComputedStyle(cactus).getPropertyValue('right')); // Calcular la posición izquierda del cactus

    // Ajustar valores de colisión
    if (cactusLeft < 80 && cactusLeft > 50 && dinoTop <= 30) {
        gameOver = true; // Cambiar estado del juego
        alert('¡Game Over! Tu puntuación: ' + score);
        clearInterval(cactusAnimation); // Detener animación del cactus
        cactus.remove(); // Eliminar cactus en caso de colisión
    }
}


// Actualizar función de puntuación
function updateScore() {
    score += 10; // Incrementar puntuación
    scoreDisplay.innerText = 'Score: ' + score; // Actualizar visualización de puntuación
}

// Aumentar velocidad con el tiempo
function increaseSpeed() {
    if (score > 0 && score % 20 === 0) { // Aumentar velocidad cada 20 puntos
        speed += 0.15; // Aumentar velocidad
    }
}

// Crear cactus cada 2 segundos
setInterval(function() {
    if (!gameOver) {
        createCactus();
        increaseSpeed(); // Aumentar velocidad después de crear un cactus
    }
}, 2000);

// Crear el primer cactus después de un retraso
setTimeout(createCactus, 1000); // Esperar 1 segundo antes de crear el primer cactus