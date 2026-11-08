// ==================== PROFESIONAL: DETALLE DEL ESTUDIANTE ====================

const animoSol = {
  dias: ["27", "28", "29", "30", "31", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  valores: [4, 4, 3, 4, 3, 3, 4, 4, 3, 3, 2, 2, 1, 2],
  marcados: [9],
};

const notas = [
  {
    fecha: "2 de noviembre · sesión virtual",
    autora: "Valeria Solano",
    texto:
      "Refiere dificultad para conciliar el sueño desde la semana de parciales. Se trabajó higiene del sueño y se acordó registrar cuántas horas duerme.",
  },
  {
    fecha: "26 de octubre · presencial",
    autora: "Valeria Solano",
    texto:
      "Se organizaron las fechas de entrega del mes con ayuda del calendario. Se siente con menos carga al tenerlo por escrito.",
  },
  {
    fecha: "19 de octubre · presencial",
    autora: "Valeria Solano",
    texto:
      "Practicamos respiración 4-7-8 antes de presentaciones. Le recomendé el recurso de pausas activas.",
  },
];

// ==================== NOTAS DE SEGUIMIENTO ====================

const mostrarNotas = () => {
  const listaNotas = document.querySelector("#listaNotas");
  listaNotas.innerHTML = "";

  notas.forEach((nota) => {
    const { fecha, autora, texto } = nota;

    const item = document.createElement("div");
    item.className = "nota-seguimiento";
    item.innerHTML = `<div class="nota-cabeza"><strong>${fecha}</strong><span>${autora}</span></div>
                      <p class="nota-texto"></p>`;
    item.querySelector(".nota-texto").innerText = texto;
    listaNotas.append(item);
  });
};

document.querySelector("#formNota").addEventListener("submit", (event) => {
  event.preventDefault();

  const form = event.target;
  const data = new FormData(form);
  const object = Object.fromEntries(data);
  const texto = object.texto.trim();
  const campo = document.querySelector("#notaTexto");

  if (texto.length < 10) {
    campo.classList.add("con-error");
    mostrarMensaje("#mensajeNota", "Escriba al menos una oración para guardar la nota.", "error");
    return;
  }

  notas.unshift({
    fecha: "9 de noviembre · sesión virtual",
    autora: "Valeria Solano",
    texto: texto,
  });

  mostrarNotas();
  form.reset();
  campo.classList.remove("con-error");
  mostrarMensaje("#mensajeNota", "Nota guardada.", "exito");
});

document.querySelector("#notaTexto").addEventListener("input", (event) => {
  event.target.classList.remove("con-error");
  mostrarMensaje("#mensajeNota", "", "");
});

// ==================== INICIO ====================

mostrarNotas();
dibujarBarras("#graficoSol", "#etiquetasSol", animoSol.dias, animoSol.valores, {
  minimo: 0,
  maximo: 5,
  marcados: animoSol.marcados,
});
