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

// Función para generar puntos en un polígono simple
function generarPuntosAleatorios(cantidad) {
    const puntos = [];
    const radio = 80; // Radio del círculo
    const centroX = 150; // Centro X del polígono
    const centroY = 100; // Centro Y del polígono

    // Generar puntos en un círculo
    for (let i = 0; i < cantidad; i++) {
        const angulo = (i / cantidad) * 2 * Math.PI; // Ángulo para cada punto
        const x = centroX + radio * Math.cos(angulo);
        const y = centroY + radio * Math.sin(angulo);
        puntos.push(new Punto(x, y));
    }

    // Hacer que el polígono sea cóncavo aleatoriamente
    if (Math.random() > 0.5) { // 50% de probabilidad de hacer cóncavo
        const index = Math.floor(Math.random() * cantidad);
        // Mover un punto hacia adentro para hacer el polígono cóncavo
        puntos[index] = new Punto(puntos[index].x - 40, puntos[index].y + 40);
    }

    return puntos;
}

let puntos = generarPuntosAleatorios(5);

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
    const svg = document.getElementById('svgCanvas');
    svg.innerHTML = ''; // Limpiar el SVG

    let d = 'M ' + puntos[0].x + ' ' + puntos[0].y; // Mover a primer punto

    for (let punto of puntos) {
        d += ' L ' + punto.x + ' ' + punto.y; // Línea a cada punto
    }

    d += ' Z'; // Cerrar el polígono

    const poligono = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    poligono.setAttribute('d', d);
    poligono.setAttribute('fill', 'rgba(100, 150, 250, 0.5)');
    poligono.setAttribute('stroke', 'black');

    svg.appendChild(poligono);

    // Resultado convexidad
    const resultado = document.getElementById('resultado');
    resultado.textContent = esConvexa(puntos) ? "El polígono es convexa." : "El polígono es cóncava.";
}

// Trazar el polígono al cargar
trazarPoligonoVectorizado(puntos);

// Trazar el centroide y líneas
document.getElementById('trazarCentroide').onclick = function() {
    const svg = document.getElementById('svgCanvas');
    
    const centroide = calcularCentroide(puntos);
    
    // Dibujar centroide
    const circulo = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circulo.setAttribute('cx', centroide.x);
    circulo.setAttribute('cy', centroide.y);
    circulo.setAttribute('r', 5);
    circulo.setAttribute('fill', 'red');
    svg.appendChild(circulo);
    
    // Dibujar líneas desde el centroide hasta los vértices
    puntos.forEach(punto => {
        const linea = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        linea.setAttribute('x1', centroide.x);
        linea.setAttribute('y1', centroide.y);
        linea.setAttribute('x2', punto.x);
        linea.setAttribute('y2', punto.y);
        linea.setAttribute('stroke', 'red');
        svg.appendChild(linea);
    });
};

// Agregar evento al botón "Dibujar Figura"
document.getElementById('dibujar').onclick = function() {
    puntos = generarPuntosAleatorios(5);
    trazarPoligonoVectorizado(puntos);
};
