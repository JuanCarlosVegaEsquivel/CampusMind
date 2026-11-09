// ==================== PÚBLICA: REGISTRO ====================

const formRegistro = document.querySelector("#formRegistro");
const nombre = document.querySelector("#nombre");
const apellidos = document.querySelector("#apellidos");
const correo = document.querySelector("#correo");
const clave = document.querySelector("#clave");
const confirmar = document.querySelector("#confirmar");
const acepto = document.querySelector("#acepto");

const revisarRequisitos = () => {
  const cumple = revisarClave(clave.value, confirmar.value);

  document.querySelectorAll("[data-requisito]").forEach((item) => {
    item.classList.toggle("cumple", cumple[item.dataset.requisito]);
  });

  return cumple;
};

formRegistro.querySelectorAll(".campo").forEach((campo) => {
  campo.addEventListener("input", () => {
    campo.classList.remove("con-error");
    mostrarMensaje("#mensajeRegistro", "", "");
    revisarRequisitos();
  });
});

acepto.addEventListener("change", () => {
  acepto.closest(".aceptar").classList.remove("con-error");
});

const marcarError = (campo, texto) => {
  campo.classList.add("con-error");
  mostrarMensaje("#mensajeRegistro", texto, "error");
  campo.focus();
};

formRegistro.addEventListener("submit", (event) => {
  event.preventDefault();
  limpiarErrores(formRegistro);
  const cumple = revisarRequisitos();

  if (nombre.value.trim() === "") {
    marcarError(nombre, "Escriba su nombre.");
    return;
  }

  if (apellidos.value.trim() === "") {
    marcarError(apellidos, "Escriba sus apellidos.");
    return;
  }

  if (!esCorreo(correo.value)) {
    marcarError(correo, "Escriba un correo válido, por ejemplo nombre@ufide.ac.cr.");
    return;
  }

  if (!cumple.largo || !cumple.mayuscula || !cumple.numero) {
    marcarError(clave, "La contraseña no cumple todos los requisitos.");
    return;
  }

  if (!cumple.iguales) {
    marcarError(confirmar, "Las contraseñas no coinciden.");
    return;
  }

  if (!acepto.checked) {
    acepto.closest(".aceptar").classList.add("con-error");
    mostrarMensaje("#mensajeRegistro", "Debe aceptar la política de privacidad y los términos.", "error");
    acepto.focus();
    return;
  }

  event.target.reset();
  revisarRequisitos();
  mostrarMensaje("#mensajeRegistro", "Cuenta creada. Ya puede iniciar sesión.", "exito");
});

formRegistro.addEventListener("reset", () => {
  limpiarErrores(formRegistro);
  document.querySelectorAll(".btn-mostrar").forEach((boton) => {
    document.querySelector(`#${boton.dataset.campo}`).type = "password";
    boton.innerText = "Mostrar";
  });
  setTimeout(revisarRequisitos);
});
