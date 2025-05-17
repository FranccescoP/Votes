const API_URL = "http://localhost:3000";

// Mostrar secciones
function mostrarSeccion(id) {
  document.querySelectorAll('.seccion').forEach(sec => sec.classList.remove('activa'));
  document.getElementById(id).classList.add('activa');
}

// Ver ganador
async function verGanador() {
  const res = await fetch(`${API_URL}/ganador`);
  const data = await res.json();
  const contenedor = document.getElementById('ganadorResultado');

  if (data.nombre) {
    contenedor.innerHTML = `<strong>${data.nombre}</strong> con <strong>${data.votos}</strong> votos.`;
  } else {
    contenedor.textContent = data.message || 'No hay datos.';
  }
}