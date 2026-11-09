// ==================== PÚBLICA: INICIO ====================

const funciones = [
  {
    titulo: "Check-in diario",
    texto: "Registre su ánimo y su nivel de estrés en menos de un minuto, con una nota opcional.",
  },
  {
    titulo: "Mis tendencias",
    texto: "Vea gráficos por semana y por cuatrimestre para identificar sus períodos de mayor estrés.",
  },
  {
    titulo: "Calendario académico",
    texto: "Anote exámenes y entregas: CampusMind los relaciona con su ánimo y le sugiere recursos antes.",
  },
  {
    titulo: "Recursos de autocuidado",
    texto: "Respiración, manejo del estrés, higiene del sueño y organización del tiempo, con favoritos.",
  },
  {
    titulo: "Citas con profesionales",
    texto: "Solicite, reprograme o cancele citas con orientación o psicología de su universidad.",
  },
  {
    titulo: "Ayuda en crisis",
    texto: "Un botón siempre visible con las líneas de atención inmediata, desde cualquier pantalla.",
  },
];

const pasos = [
  { titulo: "Cree su cuenta", texto: "Use su correo institucional. Si prefiere, elija un seudónimo." },
  { titulo: "Registre cómo se siente", texto: "Un check-in rápido cada día basta para ver patrones." },
  { titulo: "Reciba apoyo a tiempo", texto: "Consulte recursos o agende una cita antes de que el estrés se acumule." },
];

const roles = [
  { titulo: "Estudiante", texto: "Registra su ánimo, organiza su calendario, consulta recursos y solicita citas." },
  { titulo: "Profesional", texto: "Psicología u orientación: gestiona su agenda y da seguimiento a quien lo autoriza." },
  { titulo: "Administrador", texto: "Gestiona usuarios, profesionales y recursos, y consulta estadísticas anónimas." },
];

const mostrarFunciones = () => {
  const lista = document.querySelector("#listaFunciones");
  funciones.forEach(({ titulo, texto }) => {
    const tarjeta = document.createElement("article");
    tarjeta.className = "panel tarjeta";
    tarjeta.innerHTML = `<h3>${titulo}</h3><p>${texto}</p>`;
    lista.append(tarjeta);
  });
};

const mostrarPasos = () => {
  const lista = document.querySelector("#listaPasos");
  pasos.forEach(({ titulo, texto }) => {
    const paso = document.createElement("li");
    paso.innerHTML = `<strong>${titulo}</strong><span>${texto}</span>`;
    lista.append(paso);
  });
};

const mostrarRoles = () => {
  const lista = document.querySelector("#listaRoles");
  roles.forEach(({ titulo, texto }) => {
    const rol = document.createElement("div");
    rol.className = "rol-item";
    rol.innerHTML = `<strong>${titulo}</strong>${texto}`;
    lista.append(rol);
  });
};

// ==================== INICIO ====================

mostrarFunciones();
mostrarPasos();
mostrarRoles();
