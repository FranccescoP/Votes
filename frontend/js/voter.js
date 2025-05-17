const API_URL = "http://localhost:3000";

// Mostrar secciones
function mostrarSeccion(id) {
  document.querySelectorAll('.seccion').forEach(sec => sec.classList.remove('activa'));
  document.getElementById(id).classList.add('activa');
}


// Registrar votante
document.getElementById('formVotante').addEventListener('submit', async (e) => {
  e.preventDefault();
  const nombre = document.getElementById('nombreVotante').value;
  const email = document.getElementById('emailVotante').value;
  const dni = document.getElementById('dniVotante').value;

  const res = await fetch(`${API_URL}/votantes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, email ,dni})
  });

  const data = await res.json();
  alert(`Votante registrado: ${data.nombre}`);
});
