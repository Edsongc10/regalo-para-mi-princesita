const params = new URLSearchParams(window.location.search);
let numeroDia = parseInt(params.get('d')) || 1;

const TOTAL_DIAS = 366;

if (numeroDia < 1) numeroDia = 1;
if (numeroDia > TOTAL_DIAS) numeroDia = TOTAL_DIAS;

fetch('data/poemas.json')
    .then(respuesta => respuesta.json())
    .then(datos => {
        const dia = datos[numeroDia];

        if (!dia) {
            document.getElementById('titulo').textContent = `Día ${numeroDia}`;
            document.getElementById('poema').textContent = '💌 Este día aún está esperando su poema...';
            document.getElementById('placeholder-foto').style.display = 'flex';
            document.getElementById('foto').style.display = 'none';
            configurarNavegacion(numeroDia);
            return;
        }

        document.getElementById('titulo').textContent = dia.titulo || `Día ${numeroDia}`;

        // Si el poema está vacío, no muestra nada.
        document.getElementById('poema').textContent = dia.poema || '';

        const img = document.getElementById('foto');
        const placeholder = document.getElementById('placeholder-foto');

        if (dia.img && dia.img.trim() !== '') {
            img.src = dia.img;
            img.style.display = 'block';
            placeholder.style.display = 'none';

            img.onerror = () => {
                img.style.display = 'none';
                placeholder.style.display = 'flex';
            };
        } else {
            img.style.display = 'none';
            placeholder.style.display = 'flex';
        }

        configurarNavegacion(numeroDia);
    })
    .catch(error => {
        console.error('Error cargando poemas.json:', error);
        document.getElementById('poema').textContent = '⚠️ No se pudo cargar el contenido.';
    });

function configurarNavegacion(numero) {
    const anterior = document.getElementById('anterior');
    const siguiente = document.getElementById('siguiente');

    if (numero > 1) anterior.href = `dia.html?d=${numero - 1}`;
    else anterior.style.visibility = 'hidden';

    if (numero < TOTAL_DIAS) siguiente.href = `dia.html?d=${numero + 1}`;
    else siguiente.style.visibility = 'hidden';
}