const API_URL = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formVoto");
  const select = document.getElementById("PartidoCandidato");

  // Cargar candidatos en el select
  fetch(`${API_URL}/candidatos`)
    .then((res) => res.json())
    .then((candidatos) => {
      select.innerHTML = '<option value="">Seleccionar un partido</option>';
      candidatos.forEach((c) => {
        const option = document.createElement("option");
        option.value = c.Partido;
        option.textContent = c.Partido;
        select.appendChild(option);
      });
    })
    .catch((err) => {
      console.error("Error al cargar los candidatos:", err);
      select.innerHTML = '<option value="">Error al cargar partidos</option>';
    });

  // Enviar voto
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const dni = document.getElementById("dni").value.trim();
    const PartidoCandidato = select.value;

    if (!dni || !PartidoCandidato) {
      return alert("Por favor, completa todos los campos.");
    }

    try {
      const res = await fetch(`${API_URL}/votar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dni, PartidoCandidato }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Voto registrado exitosamente.");
        form.reset();
      } else {
        alert(`❌ Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error al registrar voto:", error);
      alert("❌ Error de conexión con el servidor.");
    }
  });
});
