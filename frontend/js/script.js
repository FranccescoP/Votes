const API_URL = "http://localhost:3000";

// Mostrar secciones
function mostrarSeccion(id) {
  document.querySelectorAll('.seccion').forEach(sec => sec.classList.remove('activa'));
  document.getElementById(id).classList.add('activa');
}

// Crear candidato
document.getElementById('formCandidato').addEventListener('submit', async (e) => {
  e.preventDefault();
  const nombre = document.getElementById('nombreCandidato3').value;
  const descripcion = document.getElementById('descripcionCandidato').value;

  const res = await fetch(`${API_URL}/candidatos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, descripcion })
  });

  const data = await res.json();
  alert(`Candidato guardado: ${data.nombre}`);
});

// Registrar votante
document.getElementById('formVotante').addEventListener('submit', async (e) => {
  e.preventDefault();
  const nombre = document.getElementById('nombreVotante').value;
  const email = document.getElementById('emailVotante').value;

  const res = await fetch(`${API_URL}/votantes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, email })
  });

  const data = await res.json();
  alert(`Votante registrado: ${data.nombre}`);
});

// Votar
document.getElementById('formVoto').addEventListener('submit', async (e) => {
  e.preventDefault();
  const votanteId = document.getElementById('votanteId').value;
  const candidatoId = document.getElementById('candidatoId').value;

  const res = await fetch(`${API_URL}/votar`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ votanteId, candidatoId })
  });

  const data = await res.json();
  alert(data.message || 'Voto registrado');
});

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
