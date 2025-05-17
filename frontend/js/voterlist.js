const API_URL = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", async () => {
  const contenedor = document.getElementById("contenedorVotante");

  try {
    const res = await fetch(`${API_URL}/votantes`);
    const votantes = await res.json();

    if (Array.isArray(votantes) && votantes.length > 0) {
      votantes.forEach(v => {
        const card = document.createElement("div");
        card.className = "card-votante";
        card.innerHTML = `
          <h3>${v.nombre}</h3>
          <p><strong>Email:</strong> ${v.email}</p>
          <p><strong>DNI:</strong> ${v.dni}</p>
          <button onclick="eliminarVotante('${v._id}')">🗑️ Eliminar</button>
        `;

        contenedor.appendChild(card);
      });
    } else {
      contenedor.innerHTML = "<p>No hay Votantes registrados.</p>";
    }
  } catch (error) {
    contenedor.innerHTML = "<p>Error al cargar los Votantes.</p>";
    console.error(error);
  }
});