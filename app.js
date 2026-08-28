const entradaTarea = document.getElementById('entradaTarea');
const btnAgregar = document.getElementById('btnAgregar');
const listaPendientes = document.getElementById('listaPendientes');
const contador = document.getElementById('contador');

let pendientes = [];

function actualizarContador() {
    const cantidad = pendientes.filter(t => !t.completada).length;
    contador.textContent = cantidad === 1
        ? "1 tarea pendiente"
        : `${cantidad} tareas pendientes`;
}

function crearElementoTarea(tarea) {
    const item = document.createElement('li');
    const texto = document.createElement('span');
    const btnBorrar = document.createElement('button');

    texto.textContent = tarea.texto;
    btnBorrar.textContent = "✕";
    btnBorrar.classList.add('btn-borrar');

    if (tarea.completada) {
        item.classList.add('hecha');
    }

    texto.addEventListener('click', () => {
        tarea.completada = !tarea.completada;
        item.classList.toggle('hecha');
        actualizarContador();
    });

    btnBorrar.addEventListener('click', (evento) => {
        evento.stopPropagation();
        pendientes = pendientes.filter(t => t.id !== tarea.id);
        item.remove();
        actualizarContador();
    });

    item.appendChild(texto);
    item.appendChild(btnBorrar);
    return item;
}

function agregarTarea() {
    const texto = entradaTarea.value.trim();

    if (texto === "") {
        alert("Escribe algo antes de agregar la tarea.");
        return;
    }

    const nuevaTarea = {
        id: Date.now(),
        texto: texto,
        completada: false
    };

    pendientes.push(nuevaTarea);
    listaPendientes.appendChild(crearElementoTarea(nuevaTarea));
    actualizarContador();

    entradaTarea.value = "";
    entradaTarea.focus();
}

btnAgregar.addEventListener('click', agregarTarea);

entradaTarea.addEventListener('keypress', (evento) => {
    if (evento.key === 'Enter') {
        agregarTarea();
    }
});
