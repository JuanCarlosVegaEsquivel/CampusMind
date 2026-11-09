// ==================== PÚBLICA: PRIVACIDAD Y TÉRMINOS ====================

const secciones = [
  {
    id: "datos",
    titulo: "Qué datos guardamos",
    parrafos: ["Guardamos únicamente lo necesario para que la plataforma funcione:"],
    lista: [
      "Sus datos de cuenta: nombre, correo institucional y, si lo elige, un seudónimo.",
      "Sus registros de ánimo y estrés, y las notas que usted agregue.",
      "Sus exámenes y entregas del calendario académico.",
      "Sus citas con profesionales.",
    ],
  },
  {
    id: "uso",
    titulo: "Para qué los usamos",
    parrafos: [
      "Usamos sus datos para mostrarle sus tendencias, sugerirle recursos antes de los períodos de mayor estrés y gestionar sus citas. No vendemos ni compartimos su información con terceros con fines comerciales.",
    ],
  },
  {
    id: "quien",
    titulo: "Quién puede ver su información",
    parrafos: [
      "El profesional que lo atiende solo ve lo que usted decide compartir con él, y puede retirar ese permiso cuando quiera. La administración solo consulta estadísticas generales anonimizadas, nunca sus registros personales.",
    ],
  },
  {
    id: "seguridad",
    titulo: "Cómo la protegemos",
    parrafos: [
      "Las contraseñas se guardan cifradas, el acceso a cada módulo depende del rol de la persona usuaria y las consultas a la base de datos se hacen con medidas contra la inyección de código.",
    ],
  },
  {
    id: "derechos",
    titulo: "Sus derechos",
    parrafos: [
      "Conforme a la Ley 8968 de Protección de la Persona frente al Tratamiento de sus Datos Personales de Costa Rica, usted puede acceder a sus datos, corregirlos y solicitar que se eliminen. Puede pedirlo desde su perfil o escribiendo al equipo de la plataforma.",
    ],
  },
  {
    id: "terminos",
    titulo: "Términos de uso",
    parrafos: ["Al crear una cuenta usted se compromete a:"],
    lista: [
      "Dar información veraz y mantener su contraseña en privado.",
      "Usar la plataforma solo para su propio bienestar y para contactar a los profesionales.",
      "Tratar con respeto a los profesionales y al resto de la comunidad.",
    ],
  },
  {
    id: "alcance",
    titulo: "Alcance de la plataforma",
    parrafos: [
      "CampusMind es una herramienta de apoyo y no reemplaza la atención médica ni psicológica. No es un servicio de emergencias: si usted o alguien cerca está en riesgo inmediato, llame al 911 o use la pantalla de Ayuda en crisis.",
    ],
  },
];

const listaIndice = document.querySelector("#listaIndice");
const textoLegal = document.querySelector("#textoLegal");

secciones.forEach(({ id, titulo, parrafos, lista }) => {
  const entrada = document.createElement("li");
  entrada.innerHTML = `<a href="#${id}">${titulo}</a>`;
  listaIndice.append(entrada);

  const bloque = document.createElement("section");
  bloque.id = id;
  const textos = parrafos.map((parrafo) => `<p>${parrafo}</p>`).join("");
  const items = lista ? `<ul>${lista.map((item) => `<li>${item}</li>`).join("")}</ul>` : "";
  bloque.innerHTML = `<h2>${titulo}</h2>${textos}${items}`;
  textoLegal.append(bloque);
});
