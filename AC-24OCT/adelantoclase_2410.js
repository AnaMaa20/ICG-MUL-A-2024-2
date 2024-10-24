const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let img = new Image();
let filling = false;
let fillInterval;

document.getElementById('imageLoader').addEventListener('change', (event) => {
    const reader = new FileReader();
    reader.onload = (e) => {
        img.src = e.target.result;
        img.onload = () => {
            const desiredWidth = 800; // Ancho deseado
            const desiredHeight = 600; // Alto deseado
            canvas.width = desiredWidth;
            canvas.height = desiredHeight;
            ctx.drawImage(img, 0, 0, desiredWidth, desiredHeight);
        };
    };
    reader.readAsDataURL(event.target.files[0]);
});

document.getElementById('startFill').addEventListener('click', () => {
    if (!filling) {
        filling = true;
        const startX = 10; // Coordenadas iniciales para el relleno
        const startY = 10;
        const targetColor = ctx.getImageData(startX, startY, 1, 1).data;

        if (document.getElementById('fillAlgorithm').value === 'floodFill') {
            floodFill(startX, startY, targetColor);
        } else {
            scanlineFill(startX, startY);
        }
    }
});

document.getElementById('stopFill').addEventListener('click', () => {
    filling = false;
    clearInterval(fillInterval);
});

function floodFill(x, y, targetColor) {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    const [targetR, targetG, targetB, targetA] = targetColor;
    const fillColor = [255, 0, 0, 255]; // Color de relleno (rojo)
    const stack = [[x, y]];

    function isSameColor(x, y) {
        const pixelIndex = (y * imageData.width + x) * 4;
        return (
            x >= 0 && y >= 0 && x < imageData.width && y < imageData.height &&
            data[pixelIndex] === targetR &&
            data[pixelIndex + 1] === targetG &&
            data[pixelIndex + 2] === targetB
        );
    }

    function fillPixel(x, y) {
        const pixelIndex = (y * imageData.width + x) * 4;
        data[pixelIndex] = fillColor[0];
        data[pixelIndex + 1] = fillColor[1];
        data[pixelIndex + 2] = fillColor[2];
        data[pixelIndex + 3] = fillColor[3];
    }

    fillInterval = setInterval(() => {
        if (stack.length === 0 || !filling) {
            clearInterval(fillInterval);
            ctx.putImageData(imageData, 0, 0);
            filling = false;
            return;
        }

        const [currentX, currentY] = stack.pop();
        if (isSameColor(currentX, currentY)) {
            fillPixel(currentX, currentY);

            // Agregar píxeles adyacentes a la pila
            stack.push([currentX + 1, currentY]);
            stack.push([currentX - 1, currentY]);
            stack.push([currentX, currentY + 1]);
            stack.push([currentX, currentY - 1]);
        }

        // Actualizar el canvas en cada iteración
        ctx.putImageData(imageData, 0, 0);
    }, 10);
}

function scanlineFill(x, y) {
    const fillColor = [0, 255, 0, 255]; // Color de relleno (verde)
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    const stack = [[x, y]];

    fillInterval = setInterval(() => {
        if (stack.length === 0 || !filling) {
            clearInterval(fillInterval);
            ctx.putImageData(imageData, 0, 0);
            filling = false;
            return;
        }

        const [currentX, currentY] = stack.pop();
        const pixelIndex = (currentY * imageData.width + currentX) * 4;

        // Verificar límites y si el color es transparente
        if (currentX >= 0 && currentY >= 0 && currentX < imageData.width && currentY < imageData.height &&
            data[pixelIndex + 3] === 0) { // Verifica la transparencia
            // Rellenar el píxel
            data[pixelIndex] = fillColor[0];
            data[pixelIndex + 1] = fillColor[1];
            data[pixelIndex + 2] = fillColor[2];
            data[pixelIndex + 3] = fillColor[3];

            // Agregar píxeles adyacentes a la pila
            stack.push([currentX + 1, currentY]);
            stack.push([currentX - 1, currentY]);
            stack.push([currentX, currentY + 1]);
            stack.push([currentX, currentY - 1]);
        }

        // Actualizar el canvas en cada iteración
        ctx.putImageData(imageData, 0, 0);
    }, 10);
}
