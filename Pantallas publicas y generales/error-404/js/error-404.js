// ==================== PÚBLICA: ERROR 404 Y ACCESO DENEGADO ====================

const errores = {
  noEncontrada: {
    codigo: "404",
    titulo: "Esta página no existe",
    texto: "Puede que el enlace esté mal escrito o que la página ya no esté disponible.",
    pestana: "Página no encontrada",
  },
  denegado: {
    codigo: "403",
    titulo: "Acceso denegado",
    texto:
      "Su cuenta no tiene permiso para ver esta pantalla. Si cree que es un error, inicie sesión con la cuenta correcta.",
    pestana: "Acceso denegado",
  },
};

const mostrarError = () => {
  const tipo = new URLSearchParams(location.search).get("tipo");
  const esDenegado = tipo === "denegado";
  const error = esDenegado ? errores.denegado : errores.noEncontrada;

  document.title = `${error.pestana} - CampusMind`;
  document.querySelector("#errorCodigo").innerText = error.codigo;
  document.querySelector("#errorCodigo").classList.toggle("denegado", esDenegado);
  document.querySelector("#errorTitulo").innerText = error.titulo;
  document.querySelector("#errorTexto").innerText = error.texto;
};

// ==================== INICIO ====================

mostrarError();
