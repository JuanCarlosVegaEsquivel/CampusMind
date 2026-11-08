// ==================== COMPARTIDA: CAMBIAR CONTRASEÑA ====================

// ==================== MÓDULO QUE SE MUESTRA ====================

const modulos = {
  profesional: {
    rol: "espacio profesional",
    inicial: "V",
    nombre: "Valeria Solano",
    cargo: "Psicóloga",
    buscar: "Buscar estudiante o cita",
  },
  admin: {
    rol: "administración",
    inicial: "C",
    nombre: "Carolina Jiménez",
    cargo: "Administradora",
    buscar: "Buscar en la plataforma",
  },
};

const mostrarModulo = () => {
  const parametros = new URLSearchParams(location.search);
  const esAdmin = parametros.get("rol") === "admin";
  const { rol, inicial, nombre, cargo, buscar } = esAdmin ? modulos.admin : modulos.profesional;

  document.querySelector("#menuProfesional").classList.toggle("d-none", esAdmin);
  document.querySelector("#menuAdmin").classList.toggle("d-none", !esAdmin);

  document.querySelector("#marcaRol").innerText = rol;
  document.querySelector("#personaInicial").innerText = inicial;
  document.querySelector("#personaNombre").innerText = nombre;
  document.querySelector("#personaRol").innerText = cargo;
  document.querySelector("#buscarGeneral").placeholder = buscar;
};

// ==================== FORMULARIO ====================

const formContrasena = document.querySelector("#formContrasena");
const claveActual = document.querySelector("#claveActual");
const claveNueva = document.querySelector("#claveNueva");
const claveConfirmar = document.querySelector("#claveConfirmar");

const revisarRequisitos = () => {
  const nueva = claveNueva.value;
  const cumple = {
    largo: nueva.length >= 8,
    mayuscula: /[A-ZÁÉÍÓÚÑ]/.test(nueva),
    numero: /\d/.test(nueva),
    distinta: nueva !== "" && nueva !== claveActual.value,
    iguales: nueva !== "" && nueva === claveConfirmar.value,
  };

  document.querySelectorAll("[data-requisito]").forEach((item) => {
    item.classList.toggle("cumple", cumple[item.dataset.requisito]);
  });

  return cumple;
};

[claveActual, claveNueva, claveConfirmar].forEach((campo) => {
  campo.addEventListener("input", () => {
    campo.classList.remove("con-error");
    mostrarMensaje("#mensajeContrasena", "", "");
    revisarRequisitos();
  });
});

document.querySelectorAll(".btn-mostrar").forEach((boton) => {
  boton.addEventListener("click", () => {
    const campo = document.querySelector(`#${boton.dataset.campo}`);
    const estaOculta = campo.type === "password";
    campo.type = estaOculta ? "text" : "password";
    boton.innerText = estaOculta ? "Ocultar" : "Mostrar";
  });
});

formContrasena.addEventListener("submit", (event) => {
  event.preventDefault();
  limpiarErrores(formContrasena);
  const cumple = revisarRequisitos();

  if (claveActual.value === "") {
    claveActual.classList.add("con-error");
    mostrarMensaje("#mensajeContrasena", "Escriba su contraseña actual.", "error");
    return;
  }

  if (!cumple.largo || !cumple.mayuscula || !cumple.numero) {
    claveNueva.classList.add("con-error");
    mostrarMensaje("#mensajeContrasena", "La contraseña nueva no cumple todos los requisitos.", "error");
    return;
  }

  if (!cumple.distinta) {
    claveNueva.classList.add("con-error");
    mostrarMensaje("#mensajeContrasena", "Debe ser distinta de la actual.", "error");
    return;
  }

  if (!cumple.iguales) {
    claveConfirmar.classList.add("con-error");
    mostrarMensaje("#mensajeContrasena", "Las contraseñas no coinciden.", "error");
    return;
  }

  event.target.reset();
  revisarRequisitos();
  mostrarMensaje("#mensajeContrasena", "Contraseña actualizada.", "exito");
});

formContrasena.addEventListener("reset", () => {
  limpiarErrores(formContrasena);
  mostrarMensaje("#mensajeContrasena", "", "");
  setTimeout(revisarRequisitos);
});

// ==================== INICIO ====================

mostrarModulo();
