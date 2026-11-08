// ==================== PROFESIONAL: AGENDA DE CITAS ====================

const diasSemana = [
  { nombre: "lun", numero: 9 },
  { nombre: "mar", numero: 10 },
  { nombre: "mié", numero: 11 },
  { nombre: "jue", numero: 12 },
  { nombre: "vie", numero: 13 },
];

const textosEstadoCita = {
  atendida: "Atendida",
  "en-curso": "En curso",
  confirmada: "Confirmada",
  pendiente: "Por responder",
  reprogramar: "Pide cambio",
};

const citasSemana = [
  { dia: 0, hora: 8, nombre: "M.R.V.", estado: "atendida" },
  { dia: 0, hora: 9, nombre: "Sol", estado: "atendida" },
  { dia: 0, hora: 10, nombre: "K.G.M.", estado: "en-curso" },
  { dia: 0, hora: 13.5, nombre: "J.P.H.", estado: "confirmada" },
  { dia: 0, hora: 15, nombre: "A.C.S.", estado: "confirmada" },
  { dia: 1, hora: 9, nombre: "R.S.B.", estado: "confirmada" },
  { dia: 1, hora: 11, nombre: "E.V.C.", estado: "confirmada" },
  { dia: 1, hora: 14, nombre: "B.N.Q.", estado: "confirmada" },
  { dia: 1, hora: 15, nombre: "T.O.A.", estado: "confirmada" },
  { dia: 2, hora: 8, nombre: "G.M.A.", estado: "confirmada" },
  { dia: 2, hora: 10, nombre: "L.A.M.", estado: "reprogramar" },
  { dia: 2, hora: 11, nombre: "Sol", estado: "confirmada" },
  { dia: 2, hora: 13, nombre: "P.J.R.", estado: "confirmada" },
  { dia: 2, hora: 14, nombre: "D.F.R.", estado: "pendiente" },
  { dia: 2, hora: 15, nombre: "C.A.M.", estado: "confirmada" },
  { dia: 3, hora: 8, nombre: "S.B.U.", estado: "confirmada" },
  { dia: 3, hora: 9, nombre: "Nube", estado: "pendiente" },
  { dia: 3, hora: 10, nombre: "A.R.M.", estado: "confirmada" },
  { dia: 3, hora: 11, nombre: "J.C.V.", estado: "confirmada" },
  { dia: 3, hora: 13, nombre: "M.P.S.", estado: "confirmada" },
  { dia: 3, hora: 14, nombre: "F.G.H.", estado: "confirmada" },
  { dia: 3, hora: 15, nombre: "I.L.R.", estado: "confirmada" },
  { dia: 4, hora: 9, nombre: "K.G.M.", estado: "confirmada" },
  { dia: 4, hora: 10.5, nombre: "L.A.M.", estado: "pendiente" },
  { dia: 4, hora: 14, nombre: "J.P.H.", estado: "confirmada" },
];

const solicitudes = [
  {
    nombre: "D.F.R.",
    fecha: "mié 11 · 14:00",
    motivo: "Primera cita · ansiedad por parciales",
    cita: { dia: 2, hora: 14 },
    aceptada: false,
  },
  {
    nombre: "Nube",
    fecha: "jue 12 · 9:00",
    motivo: "Organización del tiempo",
    cita: { dia: 3, hora: 9 },
    aceptada: false,
  },
  {
    nombre: "L.A.M.",
    fecha: "vie 13 · 10:30",
    motivo: "Reprogramar la cita del miércoles",
    cita: { dia: 4, hora: 10.5 },
    reemplaza: { dia: 2, hora: 10 },
    aceptada: false,
  },
];

const formatearHora = (hora) => {
  const minutos = hora % 1 === 0 ? "00" : "30";
  return `${Math.floor(hora)}:${minutos}`;
};

const buscarCita = (posicion) => {
  return citasSemana.find((cita) => cita.dia === posicion.dia && cita.hora === posicion.hora);
};

// ==================== CALENDARIO DE LA SEMANA ====================

const dibujarAgenda = () => {
  const agenda = document.querySelector("#agendaSemana");
  agenda.innerHTML = "";

  const esquina = document.createElement("div");
  esquina.className = "agenda-dia esquina";
  agenda.append(esquina);

  diasSemana.forEach((dia, indice) => {
    const { nombre, numero } = dia;

    const encabezado = document.createElement("div");
    encabezado.className = indice === 0 ? "agenda-dia hoy" : "agenda-dia";
    encabezado.style.gridColumn = indice + 2;
    encabezado.innerHTML = `${nombre}<strong>${numero}</strong>`;
    agenda.append(encabezado);
  });

  for (let hora = 8; hora < 16; hora++) {
    const fila = (hora - 8) * 2 + 2;

    const etiqueta = document.createElement("div");
    etiqueta.className = "agenda-hora";
    etiqueta.style.gridRow = `${fila} / span 2`;
    etiqueta.innerText = formatearHora(hora);
    agenda.append(etiqueta);

    diasSemana.forEach((dia, indice) => {
      const celda = document.createElement("div");
      celda.className = "agenda-celda";
      celda.style.gridColumn = indice + 2;
      celda.style.gridRow = `${fila} / span 2`;
      agenda.append(celda);
    });
  }

  citasSemana.forEach((cita) => {
    const { dia, hora, nombre, estado } = cita;

    const bloque = document.createElement("a");
    bloque.href = "../detalle-estudiante/detalle-estudiante.html";
    bloque.className = `bloque ${estado}`;
    bloque.style.gridColumn = dia + 2;
    bloque.style.gridRow = `${(hora - 8) * 2 + 2} / span 2`;
    bloque.innerHTML = `<strong>${nombre}</strong>${formatearHora(hora)} · ${textosEstadoCita[estado]}`;
    agenda.append(bloque);
  });
};

// ==================== SOLICITUDES POR RESPONDER ====================

const mostrarSolicitudes = () => {
  const listaSolicitudes = document.querySelector("#listaSolicitudes");
  listaSolicitudes.innerHTML = "";

  solicitudes.forEach((solicitud, indice) => {
    const { nombre, fecha, motivo, aceptada } = solicitud;

    const acciones = aceptada
      ? `<span class="respondida">Cita confirmada con ${nombre}</span>`
      : `<button type="button" class="btn btn-primario btn-aceptar" data-indice="${indice}">Aceptar</button>
         <button type="button" class="btn-texto sin-datos">Otra hora</button>`;

    const item = document.createElement("div");
    item.className = "solicitud";
    item.innerHTML = `<div class="solicitud-cabeza"><strong>${nombre}</strong><span>${fecha}</span></div>
                      <p class="cita-texto">${motivo}</p>
                      <div class="acciones">${acciones}</div>`;
    listaSolicitudes.append(item);
  });

  const pendientes = solicitudes.filter((solicitud) => !solicitud.aceptada).length;
  const texto = pendientes === 1 ? "1 solicitud" : `${pendientes} solicitudes`;

  document.querySelectorAll(".contador-solicitudes").forEach((contador) => {
    contador.innerText = texto;
  });

  const contadorMenu = document.querySelector(".contador-menu");
  contadorMenu.innerText = pendientes;
  contadorMenu.classList.toggle("d-none", pendientes === 0);
};

document.querySelector("#listaSolicitudes").addEventListener("click", (event) => {
  const boton = event.target.closest(".btn-aceptar");
  if (!boton) {
    return;
  }

  const solicitud = solicitudes[boton.dataset.indice];
  solicitud.aceptada = true;

  const cita = buscarCita(solicitud.cita);
  cita.estado = "confirmada";

  if (solicitud.reemplaza) {
    const citaAnterior = buscarCita(solicitud.reemplaza);
    citasSemana.splice(citasSemana.indexOf(citaAnterior), 1);
  }

  dibujarAgenda();
  mostrarSolicitudes();
});

// ==================== INICIO ====================

dibujarAgenda();
mostrarSolicitudes();
