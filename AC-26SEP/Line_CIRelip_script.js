// Crear el canvas y obtener el contexto
const canvas = document.createElement('canvas');
canvas.width = 600;
canvas.height = 400;
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

// Clase Punto
class Punto {
    #x; // Propiedad privada
    #y; // Propiedad privada

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    getX() {
        return this.#x;
    }

    getY() {
        return this.#y;
    }
}

// Clase Linea utilizando el algoritmo de Bresenham
class Linea {
    #punto1; // Propiedad privada
    #punto2; // Propiedad privada

    constructor(punto1, punto2) {
        this.#punto1 = punto1;
        this.#punto2 = punto2;

        this.dibujar(); // Dibuja la línea al crear la instancia
    }

    // Método para implementar el algoritmo de Bresenham
    bresenham() {
        let x1 = this.#punto1.getX();
        let y1 = this.#punto1.getY();
        let x2 = this.#punto2.getX();
        let y2 = this.#punto2.getY();
        const points = [];

        const dx = Math.abs(x2 - x1);
        const dy = Math.abs(y2 - y1);
        const sx = (x1 < x2) ? 1 : -1;
        const sy = (y1 < y2) ? 1 : -1;
        let err = dx - dy;

        while (true) {
            points.push({ x: x1, y: y1 });
            if (x1 === x2 && y1 === y2) break;
            const err2 = err * 2;
            if (err2 > -dy) {
                err -= dy;
                x1 += sx;
            }
            if (err2 < dx) {
                err += dx;
                y1 += sy;
            }
        }
        return points;
    }

    // Método para dibujar la línea
    dibujar() {
        const points = this.bresenham();
        points.forEach(point => {
            this.dibujarPunto(point.x, point.y);
        });
    }

    dibujarPunto(x, y) {
        ctx.fillStyle = 'black';
        ctx.fillRect(x, y, 1, 1); // Dibuja un pixel
    }
}

// Clase Circunferencia
class Circunferencia {
    #centro; // Propiedad privada
    #r; // Propiedad privada

    constructor(centro, r) {
        this.#centro = centro;
        this.#r = r;

        this.dibujar(); // Dibuja la circunferencia al crear la instancia
    }

    dibujar() {
        ctx.beginPath();
        ctx.arc(this.#centro.getX(), this.#centro.getY(), this.#r, 0, Math.PI * 2, false);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.stroke();
    }
}

// Clase Elipse
class Elipse {
    #centro; // Propiedad privada
    #rx; // Propiedad privada
    #ry; // Propiedad privada

    constructor(centro, rx, ry) {
        this.#centro = centro;
        this.#rx = rx;
        this.#ry = ry;

        this.dibujar(); // Dibuja la elipse al crear la instancia
    }

    dibujar() {
        ctx.beginPath();
        ctx.ellipse(this.#centro.getX(), this.#centro.getY(), this.#rx, this.#ry, 0, 0, Math.PI * 2);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.stroke();
    }
}

// Crear puntos
const punto1 = new Punto(50, 50);
const punto2 = new Punto(200, 200);
const centroCircunferencia = new Punto(300, 100);
const centroElipse = new Punto(400, 300);

// Dibujar las figuras
new Linea(punto1, punto2);
new Circunferencia(centroCircunferencia, 50);
new Elipse(centroElipse, 80, 50);
