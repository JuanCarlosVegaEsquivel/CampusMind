// ==================== PROFESIONAL: MI JORNADA ====================

const solicitudes = [
  {
    nombre: "D.F.R.",
    fecha: "mié 11 nov · 14:00",
    mensaje: "“Tengo parcial de cálculo el jueves y no estoy durmiendo bien.”",
    aceptada: false,
  },
  {
    nombre: "Nube",
    fecha: "jue 12 nov · 9:00",
    mensaje: "“Quisiera hablar de cómo organizarme este cuatrimestre.”",
    aceptada: false,
  },
  {
    nombre: "L.A.M.",
    fecha: "vie 13 nov · 10:30",
    mensaje: "Pide reprogramar su cita del miércoles.",
    aceptada: false,
  },
];

const mostrarSolicitudes = () => {
  const listaSolicitudes = document.querySelector("#listaSolicitudes");
  listaSolicitudes.innerHTML = "";

  solicitudes.forEach((solicitud, indice) => {
    const { nombre, fecha, mensaje, aceptada } = solicitud;

    const acciones = aceptada
      ? `<span class="respondida">Cita confirmada con ${nombre}</span>`
      : `<button type="button" class="btn btn-primario btn-aceptar" data-indice="${indice}">Aceptar</button>
         <button type="button" class="btn-texto sin-datos">Proponer otra hora</button>`;

    const item = document.createElement("div");
    item.className = "solicitud";
    item.innerHTML = `<div class="solicitud-cabeza"><strong>${nombre}</strong><span>${fecha}</span></div>
                      <p class="cita-texto">${mensaje}</p>
                      <div class="acciones">${acciones}</div>`;
    listaSolicitudes.append(item);
  });

  const pendientes = solicitudes.filter((solicitud) => !solicitud.aceptada).length;

  document.querySelector(".contador-solicitudes").innerText =
    pendientes === 1 ? "1 solicitud" : `${pendientes} solicitudes`;

  const contadorMenu = document.querySelector(".contador-menu");
  contadorMenu.innerText = pendientes;
  contadorMenu.classList.toggle("d-none", pendientes === 0);
};

document.querySelector("#listaSolicitudes").addEventListener("click", (event) => {
  const boton = event.target.closest(".btn-aceptar");
  if (!boton) {
    return;
  }

  solicitudes[boton.dataset.indice].aceptada = true;
  mostrarSolicitudes();
});

// ==================== INICIO ====================

mostrarSolicitudes();
