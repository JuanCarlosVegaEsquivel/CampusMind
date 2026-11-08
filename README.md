# CampusMind

Plataforma web de bienestar y salud mental para estudiantes universitarios: seguimiento del estado de ánimo, recursos de autocuidado y conexión con orientación profesional.

Proyecto del curso SC-502 Ambiente Web Cliente/Servidor, grupo 1.

## Estado actual

Esta versión corresponde al segundo avance y contiene **solo el front end**. La página **no es funcional todavía**:

- No hay base de datos ni inicio de sesión.
- Todos los nombres, citas, registros de ánimo, recursos y estadísticas que se ven son **datos de ejemplo inventados**. Están escritos en arreglos dentro del JavaScript de cada pantalla.
- Los formularios validan lo que se escribe y muestran el resultado en la pantalla, pero nada se guarda: al recargar la página todo vuelve a como estaba.
- Los botones que dependen de la base de datos (por ejemplo "Agendar cita" o "Editar") muestran un aviso en lugar de hacer la acción.

## Cómo funciona la aplicación

CampusMind tiene tres tipos de usuario. Después de iniciar sesión, cada persona entra al módulo de su rol:

- **Estudiante:** registra cómo se siente cada día, ve sus tendencias de ánimo, organiza su calendario académico, consulta recursos de autocuidado y solicita citas con un profesional.
- **Profesional** (psicología u orientación): revisa su jornada y su agenda de citas, responde solicitudes y da seguimiento a los estudiantes que atiende. Solo ve la información que cada estudiante decidió compartir con él.
- **Administrador:** gestiona usuarios, profesionales y recursos de autocuidado, y consulta estadísticas generales anónimas.

El botón **Ayuda en crisis** está disponible en todas las pantallas.

## Cómo abrirlo

No necesita instalar nada. Basta con abrir cualquier archivo `.html` en el navegador, por ejemplo `Modulo Profesional/jornada/jornada.html`.

## Tecnologías

HTML5, CSS3, JavaScript y Bootstrap 5.3.8. En los siguientes avances se agregan PHP y MySQL.

## Estructura de carpetas

```
CampusMind/
├── assets/                          estilos y JavaScript que usan todas las pantallas
├── Pantallas publicas y generales/  inicio, registro, inicio de sesión y demás
├── Modulo Estudiante/
├── Modulo Profesional/
├── Modulo Administrador/
└── compartido/                      pantallas que usan varios roles
```

Cada pantalla tiene su propia carpeta con su archivo `.html` y las subcarpetas `css/` y `js/`.

## Integrantes y distribución del trabajo

| Integrante | Parte | Pantallas |
|---|---|---|
| Juan Diego Rojas | 1. Pantallas públicas y generales | Inicio, Registro, Iniciar sesión, Recuperar contraseña, Privacidad y términos, Ayuda en crisis, Error 404 y Cerrar sesión |
| Gabriel Duarte | 2. Módulo Estudiante | Panel principal, Check-in diario, Mis tendencias, Calendario académico, Recursos de autocuidado, Detalle del recurso, Mis citas, Solicitar o reprogramar cita y Mi perfil |
| Juan Carlos Vega Esquivel | 3. Módulos Profesional y Administrador | Mi jornada, Agenda de citas, Estudiantes en seguimiento, Detalle del estudiante, Resumen y estadísticas, Usuarios, Profesionales, Recursos de autocuidado y Cambiar contraseña |
