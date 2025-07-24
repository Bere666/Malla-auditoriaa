const malla = document.querySelector(".malla");

const semestres = [
  {
    nombre: "Año 1 - Primer Semestre",
    ramos: [
      { id: "administracion", nombre: "Administración" },
      { id: "economia", nombre: "Economía" },
      { id: "matematica", nombre: "Matemática" },
      { id: "comunicacion1", nombre: "Comunicación Oral y Escrita I" },
      { id: "idioma1", nombre: "Idioma Extranjero I" },
      { id: "intro-carrera", nombre: "Introducción a la Carrera" },
      { id: "contabilidad", nombre: "Fundamentos de Contabilidad" },
    ],
  },
  {
    nombre: "Año 1 - Segundo Semestre",
    ramos: [
      { id: "comunicacion2", nombre: "Comunicación Oral y Escrita II", prereq: ["comunicacion1"] },
      { id: "idioma2", nombre: "Idioma Extranjero II", prereq: ["idioma1"] },
      { id: "sistema-info-contable", nombre: "Sistema de Información Contable", prereq: ["contabilidad"] },
    ],
  },
  // Añade aquí los demás semestres con sus ramos y prerrequisitos, igual que en el ejemplo anterior
  // ...
];

function crearMalla() {
  semestres.forEach((sem) => {
    const semDiv = document.createElement("div");
    semDiv.className = "semestre";

    semDiv.innerHTML = `<h2>${sem.nombre}</h2>`;

    sem.ramos.forEach((ramo) => {
      const ramoDiv = document.createElement("div");
      ramoDiv.className = "ramo";
      ramoDiv.textContent = ramo.nombre;
      ramoDiv.dataset.id = ramo.id;

      if (ramo.prereq) {
        ramoDiv.classList.add("bloqueado");
        ramoDiv.dataset.prereq = JSON.stringify(ramo.prereq);
      }

      ramoDiv.addEventListener("click", () => toggleRamo(ramoDiv));

      semDiv.appendChild(ramoDiv);
    });

    malla.appendChild(semDiv);
  });

  actualizarBloqueos();
}

function toggleRamo(element) {
  if (element.classList.contains("bloqueado")) return;

  element.classList.toggle("aprobado");
  actualizarBloqueos();
}

function actualizarBloqueos() {
  const aprobados = Array.from(document.querySelectorAll(".ramo.aprobado")).map(
    (el) => el.dataset.id
  );

  document.querySelectorAll(".ramo").forEach((el) => {
    const prereq = el.dataset.prereq ? JSON.parse(el.dataset.prereq) : [];

    if (prereq.length > 0) {
      const cumple = prereq.every((id) => aprobados.includes(id));

      if (cumple) {
        el.classList.remove("bloqueado");
      } else {
        el.classList.add("bloqueado");
        el.classList.remove("aprobado");
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", crearMalla);
