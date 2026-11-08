// ==================== ADMINISTRADOR: RESUMEN Y ESTADÍSTICAS ====================

const semanas = ["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8", "S9", "S10"];
const semanasParciales = [6, 9];
const animoPorSemana = [3.8, 3.9, 3.7, 3.6, 3.7, 3.5, 3.1, 3.4, 3.3, 2.9];
const citasPorSemana = [12, 18, 22, 25, 31, 35, 58, 41, 47, 63];

const recursosMasConsultados = [
  { nombre: "Respiración 4-7-8", consultas: 412 },
  { nombre: "Higiene del sueño en época de exámenes", consultas: 318 },
  { nombre: "Técnica Pomodoro", consultas: 276 },
  { nombre: "Ansiedad antes de un examen", consultas: 241 },
  { nombre: "Pausas activas de 5 minutos", consultas: 150 },
];

const citasPosibles = 30;
const cargaProfesionales = [
  { nombre: "Valeria Solano", citas: 25 },
  { nombre: "Mariana Cordero", citas: 22 },
  { nombre: "Esteban Rojas", citas: 8 },
  { nombre: "Laura Villalobos", citas: 8 },
];

// ==================== RANKINGS ====================

const mostrarRankingRecursos = () => {
  const rankingRecursos = document.querySelector("#rankingRecursos");
  const maximo = recursosMasConsultados[0].consultas;

  recursosMasConsultados.forEach((recurso, indice) => {
    const { nombre, consultas } = recurso;
    const porcentaje = Math.round((consultas / maximo) * 100);
    const texto = indice === 0 ? `${consultas} consultas` : consultas;

    const item = document.createElement("li");
    item.innerHTML = `<div class="ranking-cabeza"><strong>${nombre}</strong><span>${texto}</span></div>
                      ${crearPista(porcentaje, false)}`;
    rankingRecursos.append(item);
  });
};

const mostrarRankingCarga = () => {
  const rankingCarga = document.querySelector("#rankingCarga");

  cargaProfesionales.forEach((profesional) => {
    const { nombre, citas } = profesional;
    const porcentaje = Math.round((citas / citasPosibles) * 100);

    const item = document.createElement("li");
    item.innerHTML = `<div class="ranking-cabeza"><strong>${nombre}</strong><span>${citas} de ${citasPosibles}</span></div>
                      ${crearPista(porcentaje, porcentaje >= 80)}`;
    rankingCarga.append(item);
  });
};

// ==================== INICIO ====================

dibujarBarras("#graficoAnimo", "#etiquetasAnimo", semanas, animoPorSemana, {
  minimo: 0,
  maximo: 5,
  marcados: semanasParciales,
});
dibujarBarras("#graficoCitas", "#etiquetasCitas", semanas, citasPorSemana, {
  minimo: 0,
  maximo: 70,
  marcados: semanasParciales,
});
mostrarRankingRecursos();
mostrarRankingCarga();
