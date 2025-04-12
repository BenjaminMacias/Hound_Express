document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#buscar-guias form');
    const input = form.querySelector('input');
    const filas = document.querySelectorAll('#lista-guias tbody tr');
    const historialFilas = document.querySelectorAll('#historial-guias tbody tr');
  
    // Buscar guías
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const valor = input.value.trim().toLowerCase();
  
      filas.forEach(fila => {
        const numeroGuia = fila.querySelector('td').textContent.toLowerCase();
        fila.style.display = numeroGuia.includes(valor) ? '' : 'none';
      });
    });
  
    // Filtrar historial por guía desde el botón "Historial"
    document.querySelectorAll('#lista-guias tbody tr').forEach(row => {
      const btnHistorial = row.querySelector('button:nth-of-type(2)');
      btnHistorial.addEventListener('click', () => {
        const numeroGuia = row.querySelector('td').textContent;
  
        historialFilas.forEach(histFila => {
          const histNumero = histFila.querySelector('td').textContent;
          histFila.style.display = histNumero === numeroGuia ? '' : 'none';
        });
  
        document.querySelector('#btn-ver-todo-historial').style.display = 'inline-block';
        document.querySelector('#historial-guias').scrollIntoView({ behavior: 'smooth' });
      });
    });
  
    // Mostrar todo el historial
    const btnMostrarTodo = document.createElement('button');
    btnMostrarTodo.id = 'btn-ver-todo-historial';
    btnMostrarTodo.textContent = 'Ver todo el historial';
    btnMostrarTodo.style.display = 'none';
    btnMostrarTodo.style.margin = '1rem auto';
    btnMostrarTodo.style.padding = '0.7rem 1.2rem';
    btnMostrarTodo.style.backgroundColor = '#0b3d91';
    btnMostrarTodo.style.color = 'white';
    btnMostrarTodo.style.border = 'none';
    btnMostrarTodo.style.borderRadius = '5px';
    btnMostrarTodo.style.fontWeight = 'bold';
    btnMostrarTodo.style.cursor = 'pointer';
  
    btnMostrarTodo.addEventListener('click', () => {
      historialFilas.forEach(fila => fila.style.display = '');
      btnMostrarTodo.style.display = 'none';
    });
  
    document.querySelector('#historial-guias').prepend(btnMostrarTodo);
  });
  