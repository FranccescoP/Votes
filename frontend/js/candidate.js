const API_URL = "http://localhost:3000";

// Mostrar secciones
function mostrarSeccion(id) {
  document.querySelectorAll('.seccion').forEach(sec => sec.classList.remove('activa'));
  document.getElementById(id).classList.add('activa');
}

// Crear candidato
document.getElementById('formCandidato').addEventListener('submit', async (e) => {
  e.preventDefault();
  const nombre = document.getElementById('nombreCandidato').value;
  const Partido = document.getElementById('PartidoCandidato').value;

  const res = await fetch(`${API_URL}/candidatos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, Partido })
  });

  const data = await res.json();
  alert(`Candidato guardado: ${data.nombre}`);
});

