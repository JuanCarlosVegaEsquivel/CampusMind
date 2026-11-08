// ==================== ADMINISTRADOR: PROFESIONALES ====================

const profesionales = [
  {
    nombre: "Valeria Solano Castro",
    correo: "v.solano@campusmind.cr",
    especialidad: "Psicología clínica",
    colegiado: "08412",
    estudiantes: 12,
    citas: 25,
    grupo: "psicologia",
    activa: true,
  },
  {
    nombre: "Mariana Cordero Ruiz",
    correo: "m.cordero@campusmind.cr",
    especialidad: "Psicología educativa",
    colegiado: "07655",
    estudiantes: 10,
    citas: 22,
    grupo: "psicologia",
    activa: true,
  },
  {
    nombre: "Esteban Rojas Núñez",
    correo: "e.rojas@campusmind.cr",
    especialidad: "Orientación",
    colegiado: "08990",
    estudiantes: 4,
    citas: 8,
    grupo: "orientacion",
    activa: true,
  },
  {
    nombre: "Laura Villalobos Soto",
    correo: "l.villalobos@campusmind.cr",
    especialidad: "Psicología clínica",
    colegiado: "09012",
    estudiantes: 5,
    citas: 8,
    grupo: "psicologia",
    activa: true,
  },
];

const citasPosibles = 30;
const totalProfesionales = 11;
const filtroProfesionales = { grupo: "todas", texto: "" };

const mostrarProfesionales = () => {
  const bodyProfesionales = document.querySelector("#profesionalesBody");
  bodyProfesionales.innerHTML = "";

  const { grupo, texto } = filtroProfesionales;
  const visibles = profesionales.filter((profesional) => {
    const coincideGrupo = grupo === "todas" || profesional.grupo === grupo;
    const busqueda = `${profesional.nombre} ${profesional.colegiado}`.toLowerCase();
    return coincideGrupo && busqueda.includes(texto);
  });

  visibles.forEach((profesional) => {
    const { nombre, correo, especialidad, colegiado, estudiantes, citas, activa } = profesional;
    const indice = profesionales.indexOf(profesional);
    const porcentaje = Math.round((citas / citasPosibles) * 100);

    let row = document.createElement("tr");
    row.innerHTML = `<td><span class="td-nombre">${nombre}</span><br /><span class="td-sub">${correo}</span></td>
                     <td>${especialidad}</td>
                     <td>${colegiado}</td>
                     <td>${estudiantes}</td>
                     <td><div class="carga">${crearPista(porcentaje, porcentaje >= 80)}${citas} de ${citasPosibles}</div></td>
                     <td><span class="estado ${activa ? "activa" : "desactivada"}">${activa ? "Activa" : "Desactivada"}</span></td>
                     <td class="celda-acciones">
                       <button type="button" class="btn-texto sin-datos">Editar</button>
                       <button type="button" class="btn-texto btn-estado" data-indice="${indice}">${activa ? "Desactivar" : "Activar"}</button>
                     </td>`;
    bodyProfesionales.append(row);
  });

  document.querySelector("#profesionalesVacio").classList.toggle("d-none", visibles.length > 0);
  document.querySelector("#profesionalesConteo").innerText = textoConteo(
    visibles.length,
    totalProfesionales,
    "profesionales",
    grupo !== "todas" || texto !== "",
  );
};

configurarFiltros("#filtrosProfesionales", (filtro) => {
  filtroProfesionales.grupo = filtro;
  mostrarProfesionales();
});

document.querySelector("#buscarProfesional").addEventListener("input", (event) => {
  filtroProfesionales.texto = event.target.value.trim().toLowerCase();
  mostrarProfesionales();
});

document.querySelector("#profesionalesBody").addEventListener("click", (event) => {
  const boton = event.target.closest(".btn-estado");
  if (!boton) {
    return;
  }

  const profesional = profesionales[boton.dataset.indice];
  profesional.activa = !profesional.activa;
  mostrarProfesionales();
});

// ==================== INICIO ====================

mostrarProfesionales();
