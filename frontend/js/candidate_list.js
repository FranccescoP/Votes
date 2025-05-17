const API_URL = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", async () => {
  const contenedor = document.getElementById("contenedorCandidatos");

  try {
    const res = await fetch(`${API_URL}/candidatos`);
    const candidatos = await res.json();

    if (Array.isArray(candidatos) && candidatos.length > 0) {
      candidatos.forEach(c => {
        const card = document.createElement("div");
        card.className = "card-candidato";
          card.innerHTML = `
          <h3>${c.nombre}</h3>
          <p><strong>Partido:</strong> ${c.Partido}</p>
          <p><strong>Votos:</strong> ${c.votos || 0}</p>
          <button onclick="eliminarCandidato('${c._id}')">🗑️ Eliminar</button>`;

        
        contenedor.appendChild(card);
      });
    } else {
      contenedor.innerHTML = "<p>There's no register candidate.</p>";
    }
  } catch (error) {
    contenedor.innerHTML = "<p>Error loading candidates.</p>";
    console.error(error);
  }
});
