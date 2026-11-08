// ==================== ADMINISTRADOR: USUARIOS ====================

const roles = {
  estudiante: { texto: "Estudiante", sello: "sello neutro" },
  profesional: { texto: "Profesional", sello: "sello" },
  administrador: { texto: "Administradora", sello: "sello calido" },
};

const usuarios = [
  {
    nombre: "Valeria Solano Castro",
    correo: "v.solano@campusmind.cr",
    carne: "Col. 08412",
    rol: "profesional",
    activa: true,
    ultimoIngreso: "Hoy, 7:52",
  },
  {
    nombre: "Andrés Quesada Mora",
    correo: "a.quesada@campusmind.cr",
    carne: "Col. 09107",
    rol: "profesional",
    activa: true,
    ultimoIngreso: "Hace 2 días",
  },
  {
    nombre: "Gabriel Monge Araya",
    correo: "g.monge@campusmind.cr",
    carne: "2023-0418",
    rol: "estudiante",
    activa: true,
    ultimoIngreso: "Ayer",
  },
  {
    nombre: "María Fernanda Ruiz",
    correo: "mf.ruiz@campusmind.cr · seudónimo “Nube”",
    carne: "2024-1102",
    rol: "estudiante",
    activa: true,
    ultimoIngreso: "Hace 3 días",
  },
  {
    nombre: "Daniela Céspedes León",
    correo: "d.cespedes@campusmind.cr",
    carne: "Col. 09233",
    rol: "profesional",
    activa: true,
    ultimoIngreso: "Ayer",
  },
  {
    nombre: "José Pablo Herrera",
    correo: "jp.herrera@campusmind.cr",
    carne: "2022-0733",
    rol: "estudiante",
    activa: false,
    ultimoIngreso: "Hace 2 meses",
  },
  {
    nombre: "Sofía Brenes Ulate",
    correo: "s.brenes@campusmind.cr",
    carne: "2025-0067",
    rol: "estudiante",
    activa: true,
    ultimoIngreso: "Hoy, 6:40",
  },
  {
    nombre: "Carolina Jiménez Vargas",
    correo: "c.jimenez@campusmind.cr",
    carne: "",
    rol: "administrador",
    activa: true,
    ultimoIngreso: "Hoy, 8:10",
  },
];

const totalUsuarios = 429;
const filtroUsuarios = { grupo: "todas", texto: "" };

const mostrarUsuarios = () => {
  const bodyUsuarios = document.querySelector("#usuariosBody");
  bodyUsuarios.innerHTML = "";

  const { grupo, texto } = filtroUsuarios;
  const visibles = usuarios.filter((usuario) => {
    const coincideGrupo = grupo === "todas" || usuario.rol === grupo;
    const busqueda = `${usuario.nombre} ${usuario.correo} ${usuario.carne}`.toLowerCase();
    return coincideGrupo && busqueda.includes(texto);
  });

  visibles.forEach((usuario) => {
    const { nombre, correo, carne, rol, activa, ultimoIngreso } = usuario;
    const indice = usuarios.indexOf(usuario);

    const botonEstado =
      rol === "administrador"
        ? ""
        : `<button type="button" class="btn-texto btn-estado" data-indice="${indice}">${activa ? "Desactivar" : "Activar"}</button>`;

    let row = document.createElement("tr");
    row.innerHTML = `<td><span class="td-nombre">${nombre}</span><br /><span class="td-sub">${correo}</span></td>
                     <td class="${carne ? "" : "td-gris"}">${carne || "—"}</td>
                     <td><span class="${roles[rol].sello}">${roles[rol].texto}</span></td>
                     <td><span class="estado ${activa ? "activa" : "desactivada"}">${activa ? "Activa" : "Desactivada"}</span></td>
                     <td class="${activa ? "" : "td-gris"}">${ultimoIngreso}</td>
                     <td class="celda-acciones">
                       <button type="button" class="btn-texto sin-datos">Editar</button>
                       ${botonEstado}
                     </td>`;
    bodyUsuarios.append(row);
  });

  document.querySelector("#usuariosVacio").classList.toggle("d-none", visibles.length > 0);
  document.querySelector("#usuariosConteo").innerText = textoConteo(
    visibles.length,
    totalUsuarios,
    "personas",
    grupo !== "todas" || texto !== "",
  );
};

configurarFiltros("#filtrosUsuarios", (filtro) => {
  filtroUsuarios.grupo = filtro;
  mostrarUsuarios();
});

document.querySelector("#buscarUsuario").addEventListener("input", (event) => {
  filtroUsuarios.texto = event.target.value.trim().toLowerCase();
  mostrarUsuarios();
});

document.querySelector("#usuariosBody").addEventListener("click", (event) => {
  const boton = event.target.closest(".btn-estado");
  if (!boton) {
    return;
  }

  const usuario = usuarios[boton.dataset.indice];
  usuario.activa = !usuario.activa;
  mostrarUsuarios();
});

// ==================== INICIO ====================

mostrarUsuarios();
