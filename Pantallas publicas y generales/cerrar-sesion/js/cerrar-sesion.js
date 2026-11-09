// ==================== GENERAL: CERRAR SESIÓN ====================

// Al cerrar sesión se borra lo que la aplicación guardó en esta pestaña.
// global.js ya leyó el historial, así que se limpia después de cargar.
window.addEventListener("load", () => {
  sessionStorage.clear();
});
