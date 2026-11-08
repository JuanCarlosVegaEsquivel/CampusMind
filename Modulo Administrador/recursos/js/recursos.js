// ==================== ADMINISTRADOR: RECURSOS DE AUTOCUIDADO ====================

const categorias = {
  respiracion: "Respiración",
  estres: "Manejo del estrés",
  sueno: "Sueño",
  tiempo: "Organización del tiempo",
};

const recursos = [
  {
    titulo: "Respiración 4-7-8",
    descripcion: "Para calmarse en menos de dos minutos",
    categoria: "respiracion",
    formato: "Ejercicio guiado",
    duracion: 2,
    consultas: 412,
    publicado: true,
  },
  {
    titulo: "Higiene del sueño en época de exámenes",
    descripcion: "Hábitos para dormir mejor sin dejar de estudiar",
    categoria: "sueno",
    formato: "Artículo",
    duracion: 6,
    consultas: 318,
    publicado: true,
  },
  {
    titulo: "Técnica Pomodoro",
    descripcion: "Bloques de estudio de 25 minutos",
    categoria: "tiempo",
    formato: "Artículo",
    duracion: 4,
    consultas: 276,
    publicado: true,
  },
  {
    titulo: "Ansiedad antes de un examen",
    descripcion: "Qué hacer la noche anterior y el mismo día",
    categoria: "estres",
    formato: "Audio",
    duracion: 8,
    consultas: 241,
    publicado: true,
  },
  {
    titulo: "Pausas activas de 5 minutos",
    descripcion: "Estiramientos entre clases",
    categoria: "estres",
    formato: "Video",
    duracion: 5,
    consultas: 150,
    publicado: true,
  },
  {
    titulo: "Planificar la semana de parciales",
    descripcion: "Plantilla para repartir el estudio",
    categoria: "tiempo",
    formato: "Ejercicio guiado",
    duracion: 10,
    consultas: 0,
    publicado: false,
  },
];

let totalRecursos = 42;
const filtroRecursos = { grupo: "todas" };

// ==================== LISTADO DE RECURSOS ====================

const mostrarRecursos = () => {
  const bodyRecursos = document.querySelector("#recursosBody");
  bodyRecursos.innerHTML = "";

  const visibles = recursos.filter((recurso) => {
    return filtroRecursos.grupo === "todas" || recurso.categoria === filtroRecursos.grupo;
  });

  visibles.forEach((recurso) => {
    const { titulo, descripcion, categoria, formato, duracion, consultas, publicado } = recurso;
    const textoDuracion = duracion ? ` · ${duracion} min` : "";

    let row = document.createElement("tr");
    row.innerHTML = `<td><span class="td-nombre"></span><br /><span class="td-sub"></span></td>
                     <td>${categorias[categoria]}<br /><span class="td-sub">${formato}${textoDuracion}</span></td>
                     <td class="${consultas ? "" : "td-gris"}">${consultas || "—"}</td>
                     <td><span class="estado ${publicado ? "activa" : "pendiente"}">${publicado ? "Publicado" : "Borrador"}</span></td>
                     <td class="celda-acciones"><button type="button" class="btn-texto sin-datos">Editar</button></td>`;
    row.querySelector(".td-nombre").innerText = titulo;
    row.querySelector(".td-sub").innerText = descripcion;
    bodyRecursos.append(row);
  });

  document.querySelector("#recursosVacio").classList.toggle("d-none", visibles.length > 0);
  document.querySelector("#recursosConteo").innerText = textoConteo(
    visibles.length,
    totalRecursos,
    "recursos",
    filtroRecursos.grupo !== "todas",
  );
};

configurarFiltros("#filtrosRecursos", (filtro) => {
  filtroRecursos.grupo = filtro;
  mostrarRecursos();
});

// ==================== FORMULARIO NUEVO RECURSO ====================

const formRecurso = document.querySelector("#formRecurso");

formRecurso.addEventListener("submit", (event) => {
  event.preventDefault();
  limpiarErrores(formRecurso);

  const form = event.target;
  const data = new FormData(form);
  const object = Object.fromEntries(data);

  const titulo = object.titulo.trim();
  const duracion = Number(object.duracion);

  if (titulo.length < 3) {
    document.querySelector("#recursoTitulo").classList.add("con-error");
    mostrarMensaje("#mensajeRecurso", "Escriba un título de al menos 3 letras.", "error");
    return;
  }

  if (object.categoria === "") {
    document.querySelector("#recursoCategoria").classList.add("con-error");
    mostrarMensaje("#mensajeRecurso", "Seleccione una categoría.", "error");
    return;
  }

  if (object.duracion !== "" && (duracion < 1 || duracion > 120)) {
    document.querySelector("#recursoDuracion").classList.add("con-error");
    mostrarMensaje("#mensajeRecurso", "La duración debe estar entre 1 y 120 minutos.", "error");
    return;
  }

  const publicado = object.publicar === "on";

  totalRecursos++;
  recursos.unshift({
    titulo: titulo,
    descripcion: object.descripcion.trim(),
    categoria: object.categoria,
    formato: object.formato,
    duracion: duracion,
    consultas: 0,
    publicado: publicado,
  });

  mostrarRecursos();
  form.reset();
  mostrarMensaje(
    "#mensajeRecurso",
    publicado ? "Recurso publicado." : "Recurso guardado como borrador.",
    "exito",
  );
});

formRecurso.addEventListener("reset", () => {
  limpiarErrores(formRecurso);
});

formRecurso.querySelectorAll(".campo").forEach((campo) => {
  campo.addEventListener("input", () => {
    campo.classList.remove("con-error");
    mostrarMensaje("#mensajeRecurso", "", "");
  });
});

// ==================== INICIO ====================

mostrarRecursos();
