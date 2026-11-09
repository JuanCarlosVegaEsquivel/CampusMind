// ==================== FUNCIONES DE LAS PANTALLAS PÚBLICAS ====================

const esCorreo = (texto) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(texto.trim());
};

const revisarClave = (clave, confirmacion) => {
  return {
    largo: clave.length >= 8,
    mayuscula: /[A-ZÁÉÍÓÚÑ]/.test(clave),
    numero: /\d/.test(clave),
    iguales: clave !== "" && clave === confirmacion,
  };
};

document.querySelectorAll(".btn-mostrar").forEach((boton) => {
  boton.addEventListener("click", () => {
    const campo = document.querySelector(`#${boton.dataset.campo}`);
    const estaOculta = campo.type === "password";
    campo.type = estaOculta ? "text" : "password";
    boton.innerText = estaOculta ? "Ocultar" : "Mostrar";
  });
});
