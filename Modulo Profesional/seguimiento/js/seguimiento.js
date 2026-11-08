// ==================== PROFESIONAL: ESTUDIANTES EN SEGUIMIENTO ====================

const estudiantes = [
  {
    nombre: "Sol",
    seudonimo: true,
    sesiones: 6,
    desde: "2 de setiembre",
    proximaCita: "mié 11 · 11:00",
    animo: [4, 4, 3, 3, 2, 2, 1],
    comparte: ["Ánimo", "Calendario"],
    estado: "Necesita atención",
    tipoEstado: "alerta",
    grupo: "atencion",
  },
  {
    nombre: "M.R.V.",
    seudonimo: false,
    sesiones: 9,
    desde: "19 de agosto",
    proximaCita: "mar 17 · 8:00",
    animo: [3, 3, 4, 4, 4, 5, 4],
    comparte: ["Ánimo"],
    estado: "Estable",
    tipoEstado: "activa",
    grupo: "",
  },
  {
    nombre: "K.G.M.",
    seudonimo: false,
    sesiones: 1,
    desde: "hoy",
    proximaCita: "",
    animo: [],
    notaAnimo: "Aún no hay registros",
    comparte: ["Ánimo"],
    estado: "Nuevo",
    tipoEstado: "pendiente",
    grupo: "sin-cita",
  },
  {
    nombre: "J.P.H.",
    seudonimo: false,
    sesiones: 4,
    desde: "7 de octubre",
    proximaCita: "Hoy · 13:30",
    animo: [3, 4, 3, 3, 4, 4, 3],
    comparte: ["Ánimo", "Calendario"],
    estado: "Estable",
    tipoEstado: "activa",
    grupo: "",
  },
  {
    nombre: "Nube",
    seudonimo: true,
    sesiones: 2,
    desde: "21 de octubre",
    proximaCita: "jue 12 · 9:00",
    selloCita: { texto: "Por confirmar", tipo: "ambar" },
    animo: [],
    notaAnimo: "No comparte su ánimo",
    comparte: ["Calendario"],
    estado: "Estable",
    tipoEstado: "activa",
    grupo: "",
  },
  {
    nombre: "P.J.R.",
    seudonimo: false,
    sesiones: 3,
    desde: "14 de octubre",
    proximaCita: "mié 11 · 13:00",
    animo: [3, 2, 2, 3, 2, 1, 2],
    comparte: ["Ánimo"],
    estado: "Necesita atención",
    tipoEstado: "alerta",
    grupo: "atencion",
  },
  {
    nombre: "G.M.A.",
    seudonimo: false,
    sesiones: 11,
    desde: "12 de agosto",
    proximaCita: "mié 11 · 8:00",
    animo: [3, 4, 4, 5, 4, 5, 5],
    comparte: ["Ánimo", "Calendario"],
    estado: "Mejorando",
    tipoEstado: "activa",
    grupo: "",
  },
  {
    nombre: "L.A.M.",
    seudonimo: false,
    sesiones: 5,
    desde: "30 de setiembre",
    proximaCita: "mié 11 · 10:00",
    selloCita: { texto: "Pide cambio", tipo: "calido" },
    animo: [4, 3, 4, 4, 3, 4, 4],
    comparte: ["Ánimo"],
    estado: "Estable",
    tipoEstado: "activa",
    grupo: "",
  },
];

const totalEstudiantes = 12;
const filtroEstudiantes = { grupo: "todas", texto: "" };

const crearAnimo = (valores) => {
  let cuadros = "";
  valores.forEach((valor) => {
    cuadros += `<span class="a${valor}"></span>`;
  });
  return `<div class="animo">${cuadros}</div>`;
};

const mostrarEstudiantes = () => {
  const bodyEstudiantes = document.querySelector("#estudiantesBody");
  bodyEstudiantes.innerHTML = "";

  const { grupo, texto } = filtroEstudiantes;
  const visibles = estudiantes.filter((estudiante) => {
    const coincideGrupo = grupo === "todas" || estudiante.grupo === grupo;
    const coincideTexto = estudiante.nombre.toLowerCase().includes(texto);
    return coincideGrupo && coincideTexto;
  });

  visibles.forEach((estudiante) => {
    const {
      nombre,
      seudonimo,
      sesiones,
      desde,
      proximaCita,
      selloCita,
      animo,
      notaAnimo,
      comparte,
      estado,
      tipoEstado,
    } = estudiante;

    let sellosComparte = "";
    comparte.forEach((dato) => {
      sellosComparte += `<span class="sello neutro">${dato}</span> `;
    });

    const celdaCita = proximaCita
      ? `<td>${proximaCita} ${selloCita ? `<span class="sello ${selloCita.tipo}">${selloCita.texto}</span>` : ""}</td>`
      : `<td class="td-gris">Sin agendar</td>`;

    const celdaAnimo =
      animo.length > 0
        ? `<td>${crearAnimo(animo)}</td>`
        : `<td class="animo-vacio">${notaAnimo}</td>`;

    let row = document.createElement("tr");
    row.innerHTML = `<td><span class="td-nombre">${nombre}</span>${seudonimo ? '<br /><span class="td-sub">Seudónimo</span>' : ""}</td>
                     <td>${sesiones}<br /><span class="td-sub">desde ${desde}</span></td>
                     ${celdaCita}
                     ${celdaAnimo}
                     <td>${sellosComparte}</td>
                     <td><span class="estado ${tipoEstado}">${estado}</span></td>
                     <td class="celda-acciones">
                       <a href="../detalle-estudiante/detalle-estudiante.html" class="btn-texto">Ver detalle</a>
                     </td>`;
    bodyEstudiantes.append(row);
  });

  document.querySelector("#estudiantesVacio").classList.toggle("d-none", visibles.length > 0);
  document.querySelector("#estudiantesConteo").innerText = textoConteo(
    visibles.length,
    totalEstudiantes,
    "estudiantes",
    grupo !== "todas" || texto !== "",
  );
};

configurarFiltros("#filtrosEstudiantes", (filtro) => {
  filtroEstudiantes.grupo = filtro;
  mostrarEstudiantes();
});

document.querySelector("#buscarEstudiante").addEventListener("input", (event) => {
  filtroEstudiantes.texto = event.target.value.trim().toLowerCase();
  mostrarEstudiantes();
});

// ==================== INICIO ====================

mostrarEstudiantes();
