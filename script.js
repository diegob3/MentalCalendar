// Archivo JavaScript
const MONTHS_ES = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio", 
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
];

const DAYS_ES = [
    "lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"
];

let timeoutHandles = [];

function generateDate() {
    clearTimeouts();
    const format = document.getElementById('format').value;
    const speed = parseInt(document.getElementById('speed').value) * 1000;

    // Generar fecha aleatoria
    const year = getRandomInt(1600, 2109);
    const month = getRandomInt(1, 12);
    const day = getRandomInt(1, new Date(year, month, 0).getDate());
    const date = new Date(year, month - 1, day);

    const parts = getFormattedDate(format, year, day, MONTHS_ES[month - 1]);
    const dayOfWeek = DAYS_ES[date.getDay() - 1];

    const output = document.getElementById('output');
    output.innerHTML = "";

    // Mostrar partes progresivamente
    parts.forEach((part, index) => {
        timeoutHandles.push(setTimeout(() => {
            output.innerHTML += part + " ";
        }, index * speed));
    });

    // Mostrar día de la semana
    timeoutHandles.push(setTimeout(() => {
        output.innerHTML += `<strong>Día de la semana: ${dayOfWeek} </strong>`;
    }, parts.length * speed));
}

function getFormattedDate(format, year, day, month) {
    if (format === "year-day-month") {
        return [year, day, month];
    } else if (format === "day-month-year") {
        return [day, month, year];
    } else {
        return [year, month, day];
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function clearTimeouts() {
    timeoutHandles.forEach(handle => clearTimeout(handle));
    timeoutHandles = [];
}