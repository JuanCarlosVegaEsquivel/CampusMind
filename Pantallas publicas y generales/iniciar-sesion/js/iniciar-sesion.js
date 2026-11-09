// ==================== PÚBLICA: INICIAR SESIÓN ====================

// Destino de cada rol (la parte del estudiante la hace otra persona del equipo)
const destinos = {
  profesional: "../../Modulo Profesional/jornada/jornada.html",
  admin: "../../Modulo Administrador/estadisticas/estadisticas.html",
};

const formLogin = document.querySelector("#formLogin");
const correo = document.querySelector("#correo");
const clave = document.querySelector("#clave");
const rol = document.querySelector("#rol");

[correo, clave].forEach((campo) => {
  campo.addEventListener("input", () => {
    campo.classList.remove("con-error");
    mostrarMensaje("#mensajeLogin", "", "");
  });
});

formLogin.addEventListener("submit", (event) => {
  event.preventDefault();
  limpiarErrores(formLogin);

  if (!esCorreo(correo.value)) {
    correo.classList.add("con-error");
    mostrarMensaje("#mensajeLogin", "Escriba un correo válido, por ejemplo nombre@ufide.ac.cr.", "error");
    correo.focus();
    return;
  }

  if (clave.value === "") {
    clave.classList.add("con-error");
    mostrarMensaje("#mensajeLogin", "Escriba su contraseña.", "error");
    clave.focus();
    return;
  }

  const destino = destinos[rol.value];

  if (!destino) {
    mostrarMensaje("#mensajeLogin", "Datos correctos. El espacio del estudiante lo diseña otra parte del equipo.", "exito");
    return;
  }

  mostrarMensaje("#mensajeLogin", "Datos correctos. Entrando a su espacio...", "exito");
  setTimeout(() => {
    location.href = destino;
  }, 900);
});
