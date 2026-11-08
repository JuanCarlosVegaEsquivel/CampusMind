// ==================== AVISO FLOTANTE ====================

const aviso = document.querySelector("#aviso");
let temporizadorAviso;

const mostrarAviso = (texto) => {
  aviso.innerText = texto;
  aviso.classList.add("visible");
  clearTimeout(temporizadorAviso);
  temporizadorAviso = setTimeout(() => {
    aviso.classList.remove("visible");
  }, 2400);
};

// ==================== AYUDA EN CRISIS ====================

const btnCrisis = document.querySelector("#btnCrisis");
const panelCrisis = document.querySelector("#panelCrisis");

btnCrisis.addEventListener("click", () => {
  panelCrisis.classList.toggle("d-none");
  const abierto = !panelCrisis.classList.contains("d-none");
  btnCrisis.setAttribute("aria-expanded", abierto);
});

// ==================== BOTÓN VOLVER ====================

const btnVolver = document.querySelector("#btnVolver");
const nombrePagina = document.body.dataset.pagina;

const leerHistorial = () => {
  return JSON.parse(sessionStorage.getItem("historial") || "[]");
};

const guardarHistorial = (historial) => {
  sessionStorage.setItem("historial", JSON.stringify(historial));
};

const mostrarBotonVolver = () => {
  const historial = leerHistorial();
  const anterior = historial[historial.length - 1];

  if (anterior && anterior.url !== location.href) {
    btnVolver.innerText = `← Volver a ${anterior.nombre}`;
    btnVolver.classList.remove("d-none");
  }
};

btnVolver.addEventListener("click", () => {
  const historial = leerHistorial();
  const anterior = historial.pop();
  guardarHistorial(historial);
  location.href = anterior.url;
});

// ==================== ENLACES Y BOTONES SIN BASE DE DATOS ====================

document.addEventListener("click", (event) => {
  if (event.target.closest(".sin-datos")) {
    event.preventDefault();
    mostrarAviso("Esta acción funcionará cuando se conecte la base de datos");
    return;
  }

  if (event.target.closest(".otra-parte")) {
    event.preventDefault();
    mostrarAviso("Esta pantalla la diseña otra parte del equipo");
    return;
  }

  const enlace = event.target.closest("a[href]");
  if (!enlace || enlace.getAttribute("href") === "#") {
    return;
  }

  if (enlace.classList.contains("menu-item")) {
    guardarHistorial([]);
  } else {
    const historial = leerHistorial();
    historial.push({ nombre: nombrePagina, url: location.href });
    guardarHistorial(historial);
  }
});

// ==================== FUNCIONES DE APOYO ====================

const mostrarMensaje = (idMensaje, texto, tipo) => {
  const mensaje = document.querySelector(idMensaje);
  mensaje.innerText = texto;
  mensaje.className = `mensaje ${tipo}`;
};

const limpiarErrores = (form) => {
  form.querySelectorAll(".campo").forEach((campo) => {
    campo.classList.remove("con-error");
  });
};

const configurarFiltros = (idFiltros, alCambiar) => {
  const botones = document.querySelectorAll(`${idFiltros} .btn-filtro`);

  botones.forEach((boton) => {
    boton.addEventListener("click", () => {
      botones.forEach((otro) => otro.classList.remove("activo"));
      boton.classList.add("activo");
      alCambiar(boton.dataset.filtro);
    });
  });
};

const textoConteo = (visibles, total, nombre, filtrado) => {
  if (filtrado) {
    return `${visibles} en esta página`;
  }
  return `Mostrando ${visibles} de ${total} ${nombre}`;
};

const crearPista = (porcentaje, alta) => {
  return `<div class="pista ${alta ? "alta" : ""}"><span style="width: ${porcentaje}%;"></span></div>`;
};

const dibujarBarras = (idGrafico, idEtiquetas, etiquetas, valores, opciones) => {
  const { minimo, maximo, marcados } = opciones;
  const grafico = document.querySelector(idGrafico);
  const contenedorEtiquetas = document.querySelector(idEtiquetas);

  valores.forEach((valor, indice) => {
    const marcada = marcados.includes(indice);
    const altura = ((valor - minimo) / (maximo - minimo)) * 100;

    const columna = document.createElement("div");
    columna.className = marcada ? "columna marcada" : "columna";
    columna.innerHTML = `<span class="columna-valor">${valor}</span>
                         <span class="columna-relleno" style="height: ${Math.max(altura, 3)}%"></span>`;
    grafico.append(columna);

    const etiqueta = document.createElement("span");
    etiqueta.innerText = etiquetas[indice];
    if (marcada) {
      etiqueta.className = "marcada";
    }
    contenedorEtiquetas.append(etiqueta);
  });
};

// ==================== INICIO ====================

mostrarBotonVolver();
