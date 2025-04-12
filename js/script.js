// Selección de elementos del formulario
const formulario = document.querySelector('.formulario__form');
const inputs = formulario.querySelectorAll('.formulario__input');
const selectEstado = formulario.querySelector('.formulario__select');
const tablaGuias = document.querySelector('.lista__tabla tbody');
const formBusqueda = document.querySelector('.busqueda__form');
const inputBusqueda = document.querySelector('.busqueda__input');
const btnMostrarTodas = document.getElementById('mostrar-todas');
const mensajeError = document.getElementById('mensaje-error');

// Lista en memoria
const guias = [];

function guiaExiste(numero) {
  const numeroLimpio = numero.trim().toLowerCase();
  return guias.some(g => g.numero.trim().toLowerCase() === numeroLimpio);
}

formulario.addEventListener('submit', (e) => {
  e.preventDefault();

  const [numero, origen, destino, destinatario, fechaInput] = Array.from(inputs).map(input => input.value.trim());
  const estado = selectEstado.value;

  if (!numero || !origen || !destino || !destinatario || !fechaInput || !estado) {
    mensajeError.textContent = 'Por favor, completa todos los campos.';
    mensajeError.style.display = 'block';
    return;
  }

  if (guiaExiste(numero)) {
    mensajeError.textContent = `⚠️ La guía "${numero}" ya está registrada.`;
    mensajeError.style.display = 'block';
    return;
  }

  mensajeError.style.display = 'none';

  const fechaHoraRegistro = new Date().toLocaleString('es-MX', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  const nuevaGuia = {
    numero,
    origen,
    destino,
    destinatario,
    fecha: fechaHoraRegistro,
    estado,
    historial: [
      {
        fecha: fechaHoraRegistro,
        estado,
        ubicacion: origen,
        observaciones: `Guía registrada con estado inicial: ${estado}`
      }
    ]
  };

  guias.push(nuevaGuia);
  renderGuia(nuevaGuia);
  actualizarPanelEstado();
  formulario.reset();
});

function renderGuia(guia) {
  const fila = document.createElement('tr');
  fila.innerHTML = `
    <td class="lista__td">${guia.numero}</td>
    <td class="lista__td">${guia.estado}</td>
    <td class="lista__td">${guia.origen}</td>
    <td class="lista__td">${guia.destino}</td>
    <td class="lista__td">${guia.fecha}</td>
    <td class="lista__td">
      <button class="lista__boton" onclick="actualizarEstado('${guia.numero}')">Actualizar</button>
      <button class="lista__boton" onclick="verHistorial('${guia.numero}')">Historial</button>
    </td>
  `;
  tablaGuias.appendChild(fila);
}

function renderListaGuias() {
  tablaGuias.innerHTML = '';
  guias.forEach(g => renderGuia(g));
}

function actualizarEstado(numeroGuia) {
  const guia = guias.find(g => g.numero === numeroGuia);
  if (!guia) return;

  const estados = ['Pendiente', 'En tránsito', 'Entregado'];
  const indiceActual = estados.indexOf(guia.estado);

  if (indiceActual < estados.length - 1) {
    const nuevoEstado = estados[indiceActual + 1];
    const fechaHoraActual = new Date().toLocaleString('es-MX', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    guia.estado = nuevoEstado;
    guia.fecha = fechaHoraActual;

    guia.historial.push({
      fecha: fechaHoraActual,
      estado: nuevoEstado,
      ubicacion: guia.destino,
      observaciones: `Estado actualizado a ${nuevoEstado}`
    });

    renderListaGuias();
    actualizarPanelEstado();
  }
}

function actualizarPanelEstado() {
  const total = guias.length;
  const pendientes = guias.filter(g => g.estado === 'Pendiente').length;
  const transito = guias.filter(g => g.estado === 'En tránsito').length;
  const entregadas = guias.filter(g => g.estado === 'Entregado').length;

  const tarjetas = document.querySelectorAll('.estado__card');
  tarjetas[0].textContent = `Guías activas: ${total}`;
  tarjetas[1].textContent = `En tránsito: ${transito}`;
  tarjetas[2].textContent = `Entregadas: ${entregadas}`;
}

function verHistorial(numeroGuia) {
  const guia = guias.find(g => g.numero === numeroGuia);
  const modal = document.getElementById('modal-historial');
  const modalTitulo = document.getElementById('modal-titulo');
  const modalTablaBody = document.getElementById('modal-tabla-body');

  if (!guia || guia.historial.length === 0) {
    alert('No hay historial disponible para esta guía.');
    return;
  }

  modalTitulo.textContent = `Historial de ${guia.numero}`;
  modalTablaBody.innerHTML = '';

  [...guia.historial].reverse().forEach(entry => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${entry.fecha}</td>
      <td>${entry.estado}</td>
      <td>${entry.ubicacion}</td>
      <td>${entry.observaciones}</td>
    `;
    modalTablaBody.appendChild(fila);
  });

  modal.classList.add('modal--visible');
}

document.getElementById('cerrar-modal').addEventListener('click', () => {
  document.getElementById('modal-historial').classList.remove('modal--visible');
});

window.addEventListener('click', (e) => {
  const modal = document.getElementById('modal-historial');
  if (e.target === modal) {
    modal.classList.remove('modal--visible');
  }
});

formBusqueda.addEventListener('submit', (e) => {
  e.preventDefault();
  const numero = inputBusqueda.value.trim();
  if (!numero) return;

  const guia = guias.find(g => g.numero === numero);

  if (guia) {
    tablaGuias.innerHTML = '';
    renderGuia(guia);
  } else {
    tablaGuias.innerHTML = `<tr><td colspan="6" class="lista__td" style="text-align:center; color: red;">No se encontró la guía ${numero}</td></tr>`;
  }

  formBusqueda.reset();
});

btnMostrarTodas.addEventListener('click', () => {
  renderListaGuias();
});



