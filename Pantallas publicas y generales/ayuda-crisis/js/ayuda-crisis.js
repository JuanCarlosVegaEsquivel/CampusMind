// ==================== PÚBLICA: AYUDA EN CRISIS ====================

const lineas = [
  {
    nombre: "Apoyo psicológico",
    detalle: "Atendida por profesionales en psicología (Ministerio de Salud y 9-1-1).",
    numero: "1322",
  },
  {
    nombre: "Línea 1147 del PANI",
    detalle: "Para niñas, niños y adolescentes. Confidencial.",
    numero: "1147",
  },
  {
    nombre: "Bienestar estudiantil de la universidad",
    detalle: "Aquí irá el número del departamento de la universidad.",
    numero: null,
  },
];

const consejos = [
  "Respire lento: inhale 4 segundos, sostenga 4 y exhale 6.",
  "Aléjese de cualquier objeto con el que pueda lastimarse.",
  "Busque a una persona de confianza y dígale cómo se siente.",
  "Evite quedarse a solas.",
];

const listaLineas = document.querySelector("#listaLineas");

lineas.forEach(({ nombre, detalle, numero }) => {
  const linea = document.createElement("div");
  linea.className = "linea";

  const contacto = numero
    ? `<a href="tel:${numero}" class="linea-numero">${numero}</a>`
    : `<span class="sello ambar">Por definir</span>`;

  linea.innerHTML = `<div>
                       <span class="linea-nombre">${nombre}</span>
                       <span class="linea-detalle">${detalle}</span>
                     </div>
                     ${contacto}`;
  listaLineas.append(linea);
});

const listaConsejos = document.querySelector("#listaConsejos");

consejos.forEach((texto) => {
  const item = document.createElement("li");
  item.innerText = texto;
  listaConsejos.append(item);
});
