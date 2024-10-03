class Punto {
    #x; // Propiedad privada
    #y; // Propiedad privada

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    get x() {
        return this.#x;
    }

    get y() {
        return this.#y;
    }
}

// Lista de puntos predefinidos
const puntos = [
    new Punto(50, 50),
    new Punto(150, 30),
    new Punto(250, 70),
    new Punto(200, 150),
    new Punto(100, 120)
];

function esConvexa(puntos) {
    const signo = (p1, p2, p3) => {
        return (p2.x - p1.x) * (p3.y - p1.y) - (p2.y - p1.y) * (p3.x - p1.x);
    };

    let n = puntos.length;
    if (n < 3) return false; // No puede ser un polígono

    let direcciones = [];
    for (let i = 0; i < n; i++) {
        let d = signo(puntos[i], puntos[(i + 1) % n], puntos[(i + 2) % n]);
        if (d !== 0) {
            direcciones.push(d > 0);
        }
    }
    return direcciones.every(d => d) || !direcciones.some(d => d); // Todos los mismos signos
}

function calcularCentroide(puntos) {
    let xSum = 0;
    let ySum = 0;
    for (let punto of puntos) {
        xSum += punto.x;
        ySum += punto.y;
    }
    return new Punto(xSum / puntos.length, ySum / puntos.length);
}

function trazarPoligonoRasterizado(puntos) {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = 300; // Ancho del canvas
    canvas.height = 200; // Alto del canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar canvas
    ctx.beginPath();
    ctx.moveTo(puntos[0].x, puntos[0].y);

    for (let punto of puntos) {
        ctx.lineTo(punto.x, punto.y);
    }

    ctx.closePath();
    ctx.fillStyle = 'rgba(100, 150, 250, 0.5)';
    ctx.fill();
    ctx.stroke();

    // Resultado convexidad
    const resultado = document.getElementById('resultado');
    resultado.textContent = esConvexa(puntos) ? "El polígono es convexa." : "El polígono es cóncava.";
}

// Dibujar polígono al cargar
trazarPoligonoRasterizado(puntos);

// Trazar el centroide y líneas
document.getElementById('trazarCentroide').onclick = function() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    const centroide = calcularCentroide(puntos);
    
    // Dibujar centroide
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(centroide.x, centroide.y, 5, 0, 2 * Math.PI);
    ctx.fill();
    
    // Dibujar líneas desde el centroide hasta los vértices
    ctx.strokeStyle = 'red';
    puntos.forEach(punto => {
        ctx.beginPath();
        ctx.moveTo(centroide.x, centroide.y);
        ctx.lineTo(punto.x, punto.y);
        ctx.stroke();
    });
};
