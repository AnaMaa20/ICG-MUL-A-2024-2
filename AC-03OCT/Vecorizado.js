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

function trazarPoligonoVectorizado(puntos) {
    const svg = document.getElementById('svg');
    svg.innerHTML = ''; // Limpiar SVG

    let pathData = `M ${puntos[0].x},${puntos[0].y}`;
    for (let punto of puntos) {
        pathData += ` L ${punto.x},${punto.y}`;
    }
    pathData += ' Z'; // Cerrar el camino

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', pathData);
    path.setAttribute('fill', 'rgba(100, 150, 250, 0.5)');
    path.setAttribute('stroke', 'black');
    svg.appendChild(path);

    // Resultado convexidad
    const resultado = document.getElementById('resultado');
    resultado.textContent = esConvexa(puntos) ? "El polígono es convexa." : "El polígono es cóncava.";
}

// Trazar el polígono al cargar
trazarPoligonoVectorizado(puntos);

// Trazar el centroide y líneas
document.getElementById('trazarCentroide').onclick = function() {
    const centroide = calcularCentroide(puntos);
    const svg = document.getElementById('svg');

    // Dibujar centroide
    const centroideCirculo = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    centroideCirculo.setAttribute('cx', centroide.x);
    centroideCirculo.setAttribute('cy', centroide.y);
    centroideCirculo.setAttribute('r', 5);
    centroideCirculo.setAttribute('fill', 'red');
    svg.appendChild(centroideCirculo);

    // Dibujar líneas desde el centroide hasta los vértices
    puntos.forEach(punto => {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', centroide.x);
        line.setAttribute('y1', centroide.y);
        line.setAttribute('x2', punto.x);
        line.setAttribute('y2', punto.y);
        line.setAttribute('stroke', 'red');
        svg.appendChild(line);
    });
};
