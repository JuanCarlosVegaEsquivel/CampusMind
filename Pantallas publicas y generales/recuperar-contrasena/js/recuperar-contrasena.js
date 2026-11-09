// ==================== PÚBLICA: RECUPERAR CONTRASEÑA ====================

const formRecuperar = document.querySelector("#formRecuperar");
const correo = document.querySelector("#correo");

correo.addEventListener("input", () => {
  correo.classList.remove("con-error");
  mostrarMensaje("#mensajeRecuperar", "", "");
});

formRecuperar.addEventListener("submit", (event) => {
  event.preventDefault();
  limpiarErrores(formRecuperar);

  if (!esCorreo(correo.value)) {
    correo.classList.add("con-error");
    mostrarMensaje("#mensajeRecuperar", "Escriba un correo válido, por ejemplo nombre@ufide.ac.cr.", "error");
    correo.focus();
    return;
  }

  // El mensaje es el mismo exista o no la cuenta, para no revelar quién está registrado
  mostrarMensaje(
    "#mensajeRecuperar",
    "Si el correo está registrado, recibirá un enlace en unos minutos.",
    "exito",
  );
  formRecuperar.reset();
});
