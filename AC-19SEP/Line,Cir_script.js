// svgShapes.js

// Clase base para manejar el SVG
class SVGCanvas {
    constructor(svgElement) {
        this.svgElement = svgElement;
    }

    // Método para agregar un elemento al SVG
    addElement(tag, attributes) {
        const element = document.createElementNS("http://www.w3.org/2000/svg", tag);
        for (let attr in attributes) {
            element.setAttribute(attr, attributes[attr]);
        }
        this.svgElement.appendChild(element);
    }
}

// Clase Linea
class Linea {
    constructor(svgElement, x1, y1, x2, y2) {
        this.svgElement = svgElement;
        this._x1 = x1;
        this._y1 = y1;
        this._x2 = x2;
        this._y2 = y2;

        this.dibujar(); // Dibuja la línea al crear la instancia
    }

    // Método para dibujar la línea utilizando <line>
    dibujar() {
        const lineElement = document.createElementNS("http://www.w3.org/2000/svg", 'line');
        lineElement.setAttribute('x1', this._x1);
        lineElement.setAttribute('y1', this._y1);
        lineElement.setAttribute('x2', this._x2);
        lineElement.setAttribute('y2', this._y2);
        lineElement.setAttribute('stroke', 'black');
        lineElement.setAttribute('stroke-width', 2);
        this.svgElement.appendChild(lineElement);
    }
}

// Clase Circunferencia
class Circunferencia {
    constructor(svgElement, cx, cy, r) {
        this.svgElement = svgElement;
        this._cx = cx;
        this._cy = cy;
        this._r = r;

        this.dibujar(); // Dibuja la circunferencia al crear la instancia
    }

    // Método para dibujar la circunferencia utilizando <circle>
    dibujar() {
        const circleElement = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
        circleElement.setAttribute('cx', this._cx);
        circleElement.setAttribute('cy', this._cy);
        circleElement.setAttribute('r', this._r);
        circleElement.setAttribute('stroke', 'black');
        circleElement.setAttribute('stroke-width', 2);
        circleElement.setAttribute('fill', 'none');
        this.svgElement.appendChild(circleElement);
    }
}

// Clase Elipse
class Elipse {
    constructor(svgElement, cx, cy, rx, ry) {
        this.svgElement = svgElement;
        this._cx = cx;
        this._cy = cy;
        this._rx = rx;
        this._ry = ry;

        this.dibujar(); // Dibuja la elipse al crear la instancia
    }

    // Método para dibujar la elipse utilizando <ellipse>
    dibujar() {
        const ellipseElement = document.createElementNS("http://www.w3.org/2000/svg", 'ellipse');
        ellipseElement.setAttribute('cx', this._cx);
        ellipseElement.setAttribute('cy', this._cy);
        ellipseElement.setAttribute('rx', this._rx);
        ellipseElement.setAttribute('ry', this._ry);
        ellipseElement.setAttribute('stroke', 'black');
        ellipseElement.setAttribute('stroke-width', 2);
        ellipseElement.setAttribute('fill', 'none');
        this.svgElement.appendChild(ellipseElement);
    }
}

// Función para inicializar el SVG
function init() {
    const svgCanvasElement = document.getElementById('svgCanvas');
    const svgCanvas = new SVGCanvas(svgCanvasElement);

    // Dibujar las figuras
    new Linea(svgCanvasElement, 50, 50, 200, 200);
    new Circunferencia(svgCanvasElement, 300, 100, 50);
    new Elipse(svgCanvasElement, 400, 300, 80, 50);
}

// Exportar la función init si se desea usar en un módulo
if (typeof module !== 'undefined') {
    module.exports = { init };
}

// Llamar a la función init si se ejecuta en el navegador
if (document.readyState !== 'loading') {
    init();
} else {
    document.addEventListener('DOMContentLoaded', init);
}