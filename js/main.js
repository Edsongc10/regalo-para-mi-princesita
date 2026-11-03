

const FECHA_INICIO = new Date(2026, 10, 4); 
const FECHA_FIN = new Date(2027, 10, 4); 

const MESES_ES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];


function calcularNumeroDia(fecha) {
    const unDia = 1000 * 60 * 60 * 24;
    const inicio = new Date(FECHA_INICIO.getFullYear(), FECHA_INICIO.getMonth(), FECHA_INICIO.getDate());
    const actual = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate());
    return Math.floor((actual - inicio) / unDia) + 1;
}

function totalDias() {
    return calcularNumeroDia(FECHA_FIN); 
}

function fechaDelDia(numeroDia) {
    const fecha = new Date(FECHA_INICIO);
    fecha.setDate(fecha.getDate() + (numeroDia - 1));
    return fecha;
}


function irAlDiaDeHoy() {
    const hoy = new Date();
    const numero = calcularNumeroDia(hoy);
    const total = totalDias();

    if (numero < 1) {
        alert('💌 Este regalo comienza el 4 de noviembre de 2026. ¡Todavía falta un poquito!');
        return;
    }
    if (numero > total) {
        window.location.href = `dia.html?d=${total}`;
        return;
    }
    window.location.href = `dia.html?d=${numero}`;
}

function toggleMenu() {
    const lista = document.getElementById('lista-meses');
    const flecha = document.getElementById('flecha');

    if (lista.style.display === 'none') {
        generarMenu();
        lista.style.display = 'block';
        flecha.textContent = '▲';
    } else {
        lista.style.display = 'none';
        flecha.textContent = '▼';
    }
}

function generarMenu() {
    const lista = document.getElementById('lista-meses');

    if (lista.dataset.generado === 'true') return;

    const total = totalDias();   

    const meses = {};  

    for (let d = 1; d <= total; d++) {
        const fecha = fechaDelDia(d);
        const clave = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}`;
        if (!meses[clave]) meses[clave] = [];
        meses[clave].push(d);
    }

  
    let html = '';
    const clavesOrdenadas = Object.keys(meses).sort();

    for (const clave of clavesOrdenadas) {
        const [anio, mesNum] = clave.split('-');
        const nombreMes = MESES_ES[parseInt(mesNum) - 1];
        const dias = meses[clave];

        html += `
            <div class="mes-bloque">
                <div class="mes-titulo" onclick="toggleMes(this)">
                    ${nombreMes} ${anio} <span class="flecha-mes">▼</span>
                </div>
                <div class="mes-dias" style="display:none;">
        `;

        for (const d of dias) {
            const fecha = fechaDelDia(d);
            const diaTxt = String(fecha.getDate()).padStart(2, '0');
            html += `<a href="dia.html?d=${d}" class="dia-link">
                        ${diaTxt} ${nombreMes.substring(0, 3)} · Día ${d}
                     </a>`;
        }

        html += `
                </div>
            </div>
        `;
    }

    lista.innerHTML = html;
    lista.dataset.generado = 'true';
}

function toggleMes(elemento) {
    const dias = elemento.nextElementSibling;
    const flecha = elemento.querySelector('.flecha-mes');

    if (dias.style.display === 'none') {
        dias.style.display = 'block';
        flecha.textContent = '▲';
    } else {
        dias.style.display = 'none';
        flecha.textContent = '▼';
    }
}