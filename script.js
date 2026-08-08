const STORAGE_KEY = "malla-curricular-data";
let data = null;
let editMode = false;
let selectedId = null;

const exampleData = {
  cycles: [
    { id: "niv", name: "Nivelación", courses: [
      { id: "n1", code: "100000X101", name: "Nivelación de Redacción", credits: 4, prereq: [], state: "aprobado" },
      { id: "n2", code: "100000X104", name: "Nivelación de Matemática - Ingeniería", credits: 5, prereq: [], state: "aprobado" },
    ]},
    { id: "c1", name: "1er ciclo", courses: [
      { id: "c1_1", code: "100000I0N2", name: "Matemática I", credits: 3, prereq: ["n2"], state: "aprobado" },
      { id: "c1_2", code: "100000I07N", name: "Principios de Algoritmos", credits: 2, prereq: [], state: "aprobado" },
      { id: "c1_3", code: "100000N09I", name: "Individuo y Medio Ambiente", credits: 2, prereq: [], state: "aprobado" },
      { id: "c1_4", code: "100000VU01", name: "Introducción a la Vida Universitaria", credits: 2, prereq: [], state: "aprobado" },
      { id: "c1_5", code: "100000N03I", name: "Inglés I", credits: 3, prereq: [], state: "aprobado" },
      { id: "c1_6", code: "100000N01I", name: "Comprensión y Redacción de Textos I", credits: 4, prereq: ["n1"], state: "aprobado" },
    ]},
    { id: "c2", name: "2do ciclo", courses: [
      { id: "c2_1", code: "100000N06I", name: "Problemas y Desafíos en el Perú Actual", credits: 3, prereq: ["c1_3","c1_6"], state: "aprobado" },
      { id: "c2_2", code: "100000I13N", name: "Estadística Descriptiva y Probabilidades", credits: 3, prereq: ["c1_1"], state: "aprobado" },
      { id: "c2_3", code: "100000I0N3", name: "Matemática II", credits: 4, prereq: ["c1_1"], state: "aprobado" },
      { id: "c2_4", code: "100000SI13", name: "Matemática Discreta", credits: 2, prereq: ["c1_1"], state: "aprobado" },
      { id: "c2_5", code: "100000N05I", name: "Inglés II", credits: 3, prereq: ["c1_5"], state: "aprobado" },
      { id: "c2_6", code: "100000A16E", name: "Comprensión y Redacción de Textos II", credits: 4, prereq: ["c1_6"], state: "aprobado" },
      { id: "c2_7", code: "100000TI50", name: "Introducción a las TIC", credits: 2, prereq: ["c1_4"], state: "aprobado" },
    ]},
    { id: "c3", name: "3er ciclo", courses: [
      { id: "c3_1", code: "100000I0N6", name: "Cálculo I", credits: 4, prereq: ["c2_3"], state: "aprobado" },
      { id: "c3_2", code: "100000F1I2", name: "Laboratorio de Mecánica Clásica", credits: 0.22, prereq: ["c2_3"], state: "aprobado" },
      { id: "c3_3", code: "100000F1I1", name: "Mecánica Clásica", credits: 3.78, prereq: ["c2_3"], state: "aprobado" },
      { id: "c3_4", code: "100000I17N", name: "Estadística Inferencial", credits: 4, prereq: ["c2_2"], state: "aprobado" },
      { id: "c3_5", code: "100000N08I", name: "Inglés III", credits: 3, prereq: ["c2_5"], state: "aprobado" },
      { id: "c3_6", code: "100000N07C", name: "Ciudadanía y Reflexión Ética", credits: 3, prereq: ["c1_3","c1_6"], state: "aprobado" },
      { id: "c3_7", code: "100000I50N", name: "Taller de Programación", credits: 3, prereq: ["c2_7","c1_2"], state: "aprobado" },
    ]},
    { id: "c4", name: "4to ciclo", courses: [
      { id: "c4_1", code: "100000I1N0", name: "Cálculo II", credits: 2, prereq: ["c3_1"], state: "cursando" },
      { id: "c4_2", code: "100000F2I2", name: "Laboratorio de Fundamentos de Electromagnetismo", credits: 0.22, prereq: ["c3_2","c3_3","c3_1"], state: "cursando" },
      { id: "c4_3", code: "100000F2I1", name: "Fundamentos de Electromagnetismo", credits: 3.78, prereq: ["c3_2","c3_3","c3_1"], state: "cursando" },
      { id: "c4_4", code: "100000SI35", name: "Análisis y Diseño de Algoritmos", credits: 3, prereq: ["c2_4","c3_7"], state: "cursando" },
      { id: "c4_5", code: "100000N02C", name: "Investigación Académica", credits: 4, prereq: ["c1_3"], state: "aprobado" },
      { id: "c4_6", code: "100000N10I", name: "Inglés IV", credits: 3, prereq: ["c3_5"], state: "cursando" },
      { id: "c4_7", code: "100000I55N", name: "Programación Orientada a Objetos", credits: 3, prereq: ["c3_7"], state: "cursando" },
      { id: "c4_8", code: "100000I52N", name: "Base de Datos", credits: 3, prereq: ["c3_7"], state: "cursando" },
    ]},
    { id: "c5", name: "5to ciclo", courses: [
      { id: "c5_1", code: "100000I04N", name: "Herramientas Informáticas para la Toma de Decisiones", credits: 2, prereq: [], state: "cursando" },
      { id: "c5_2", code: "100000SI47", name: "Diseño de Patrones", credits: 2, prereq: ["c4_8","c4_7"], state: "pendiente" },
      { id: "c5_3", code: "100000SI46", name: "Base de Datos II", credits: 4, prereq: ["c4_8"], state: "pendiente" },
      { id: "c5_4", code: "100000I41N", name: "Redes y Comunicación de Datos I", credits: 4, prereq: ["c4_7"], state: "pendiente" },
      { id: "c5_5", code: "100000I57N", name: "Taller de Programación Web", credits: 2, prereq: ["c4_8"], state: "pendiente" },
      { id: "c5_6", code: "100000I56N", name: "Sistemas Operativos", credits: 3, prereq: ["c4_8"], state: "pendiente" },
      { id: "c5_7", code: "100000I53N", name: "Algoritmos y Estructuras de Datos", credits: 3, prereq: ["c4_4","c4_7"], state: "pendiente" },
    ]},
    { id: "c6", name: "6to ciclo", courses: [
      { id: "c6_1", code: "100000SI58", name: "Hojas de Estilo en Cascada Avanzado", credits: 2, prereq: ["c5_5"], state: "pendiente" },
      { id: "c6_2", code: "100000SI57", name: "Marcos de Desarrollo Web", credits: 3, prereq: ["c5_5"], state: "pendiente" },
      { id: "c6_3", code: "100000SI56", name: "JavaScript Avanzado", credits: 3, prereq: ["c5_5"], state: "pendiente" },
      { id: "c6_4", code: "100000I33N", name: "Gestión de Proyectos", credits: 3, prereq: ["c5_1"], state: "pendiente" },
      { id: "c6_5", code: "100000N21I", name: "Administración y Organización de Empresas", credits: 3, prereq: [], state: "pendiente" },
      { id: "c6_6", code: "100000I60N", name: "Análisis y Diseño de Sistemas de Información", credits: 4, prereq: ["c5_7"], state: "pendiente" },
      { id: "c6_7", code: "100000I58N", name: "Curso Integrador I: Sistemas - Software", credits: 3, prereq: ["c5_7"], state: "pendiente" },
    ]},
    { id: "c7", name: "7mo ciclo", courses: [
      { id: "c7_1", code: "100000ST61", name: "Desarrollo Web Integrado", credits: 2, prereq: ["c6_1","c6_2","c6_3"], state: "pendiente" },
      { id: "c7_2", code: "100000I45N", name: "Seguridad Informática", credits: 3, prereq: ["c5_4"], state: "pendiente" },
      { id: "c7_3", code: "100000S61T", name: "Herramientas de Desarrollo", credits: 3, prereq: ["c6_2","c6_3","c6_1"], state: "pendiente" },
      { id: "c7_4", code: "100000SI69", name: "Teoría de Sistemas", credits: 3, prereq: ["c5_7","c2_7"], state: "pendiente" },
      { id: "c7_5", code: "100000SI68", name: "Lenguajes de Programación", credits: 2, prereq: ["c5_7"], state: "pendiente" },
      { id: "c7_6", code: "100000SI67", name: "Diseño de Productos y Servicios", credits: 3, prereq: ["c6_5"], state: "pendiente" },
      { id: "c7_7", code: "100000SI66", name: "Liderazgo y Gestión de Equipos", credits: 3, prereq: ["c6_5"], state: "pendiente" },
    ]},
    { id: "c8", name: "8vo ciclo", courses: [
      { id: "c8_1", code: "100000S73T", name: "Herramientas de Prototipado", credits: 3, prereq: ["c7_6"], state: "pendiente" },
      { id: "c8_2", code: "100000S72T", name: "Gestión del Servicio TI", credits: 3, prereq: ["c6_6"], state: "pendiente" },
      { id: "c8_3", code: "100000S71T", name: "Negociación y Narrativa", credits: 2, prereq: ["c6_5"], state: "pendiente" },
      { id: "c8_4", code: "100000TD09", name: "Innovación y Transformación Digital", credits: 3, prereq: ["c6_6"], state: "pendiente" },
      { id: "c8_5", code: "100000H01C", name: "Herramientas para la Comunicación Efectiva", credits: 3, prereq: ["c6_7"], state: "pendiente" },
      { id: "c8_6", code: "100000S06I", name: "Diseño e Implementación de Arquitectura Empresarial", credits: 3, prereq: ["c6_6"], state: "pendiente" },
      { id: "c8_7", code: "100000I62N", name: "Inteligencia de Negocios", credits: 4, prereq: ["c7_3","c5_3"], state: "pendiente" },
    ]},
    { id: "c9", name: "9no ciclo", courses: [
      { id: "c9_1", code: "100000SI87", name: "Interacción Hombre Máquina", credits: 3, prereq: ["c7_6","c6_6"], state: "pendiente" },
      { id: "c9_2", code: "100000S02I", name: "Gestión del Conocimiento", credits: 2, prereq: ["c8_7"], state: "pendiente" },
      { id: "c9_3", code: "100000S07I", name: "Planeamiento Estratégico de las TICs", credits: 4, prereq: ["c8_6"], state: "pendiente" },
      { id: "c9_4", code: "100000SI86", name: "Sistemas de Información Empresarial", credits: 3, prereq: ["c6_6","c6_5"], state: "pendiente" },
      { id: "c9_5", code: "100000S09I", name: "Curso Integrador II: Sistemas", credits: 3, prereq: ["c8_7","c8_6","c6_7"], state: "pendiente" },
      { id: "c9_6", code: "100000SI82", name: "Formación para la Investigación - Sistemas", credits: 4, prereq: ["c4_5","c6_7","c2_6"], state: "pendiente" },
    ]},
    { id: "c10", name: "10mo ciclo", courses: [
      { id: "c10_1", code: "10000096SI", name: "Herramientas de Desarrollo Profesional - TIC", credits: 2, prereq: ["c8_4"], state: "pendiente" },
      { id: "c10_2", code: "100000SI97", name: "Servicios Cloud", credits: 3, prereq: ["c5_4"], state: "pendiente" },
      { id: "c10_3", code: "100000NI24", name: "Ingeniería Económica", credits: 3, prereq: ["c9_4"], state: "pendiente" },
      { id: "c10_4", code: "100000N11I", name: "Formación para la Empleabilidad", credits: 3, prereq: ["c8_5"], state: "pendiente" },
      { id: "c10_5", code: "100000N25I", name: "Ética Profesional", credits: 2, prereq: ["c9_6"], state: "pendiente" },
      { id: "c10_6", code: "100000SI95", name: "Taller de Investigación - Sistemas", credits: 4, prereq: ["c9_6"], state: "pendiente" },
    ]},
    { id: "c11", name: "Electivos", courses: [
      { id: "c11_1", code: "100000ZZ28", name: "Elementary Business English", credits: 4, prereq: ["c4_6"], state: "pendiente" },
      { id: "c11_2", code: "100000I64M", name: "Calidad de Software", credits: 3, prereq: ["c6_6"], state: "pendiente" },
      { id: "c11_3", code: "100000RI07", name: "Contabilidad General", credits: 3, prereq: ["c6_5"], state: "pendiente" },
      { id: "c11_4", code: "100000CN47", name: "Formación Profesional con Enfoque en Discapacidad e Inclusión", credits: 3, prereq: ["c3_6"], state: "pendiente" },
    ]},
  ]
};

async function loadData(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    data = raw ? JSON.parse(raw) : JSON.parse(JSON.stringify(exampleData));
  }catch(e){
    data = JSON.parse(JSON.stringify(exampleData));
  }
  render();
}

async function saveData(){
  try{
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }catch(e){ console.error("No se pudo guardar:", e); }
}

function allCourses(){
  return data.cycles.flatMap(c => c.courses);
}
function getCourse(id){
  return allCourses().find(c => c.id === id);
}
function isLocked(course){
  if(!course.prereq || course.prereq.length===0) return false;
  return course.prereq.some(pid => {
    const p = getCourse(pid);
    return p && p.state !== "aprobado";
  });
}
function dependentsOf(id){
  return allCourses().filter(c => (c.prereq||[]).includes(id));
}

function cycleStats(cycle){
  const total = cycle.courses.reduce((s,c)=>s+Number(c.credits||0),0);
  const done = cycle.courses.filter(c=>c.state==="aprobado").reduce((s,c)=>s+Number(c.credits||0),0);
  return {total, done};
}

function renderStats(){
  const cs = allCourses();
  const totalCourses = cs.length;
  const approved = cs.filter(c=>c.state==="aprobado").length;
  const inProgress = cs.filter(c=>c.state==="cursando").length;
  const totalCredits = cs.reduce((s,c)=>s+Number(c.credits||0),0);
  const doneCredits = cs.filter(c=>c.state==="aprobado").reduce((s,c)=>s+Number(c.credits||0),0);
  const pct = totalCourses ? Math.round(approved/totalCourses*100) : 0;

  document.getElementById("stats").innerHTML = `
    <div class="stat-card">
      <div class="stat-label">Avance de cursos</div>
      <div class="stat-value">${approved} / ${totalCourses}</div>
      <div class="bar-track"><div class="bar-fill" style="width:${pct}%"></div></div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Créditos aprobados</div>
      <div class="stat-value">${doneCredits} / ${totalCredits}</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Cursando ahora</div>
      <div class="stat-value">${inProgress}</div>
    </div>
  `;
}

function cycleState(course){
  const order = ["pendiente","cursando","aprobado"];
  return order;
}

function nextState(state){
  const order = ["pendiente","cursando","aprobado"];
  const idx = order.indexOf(state);
  return order[(idx+1)%order.length];
}

function courseCard(course, cycleId){
  const locked = isLocked(course);
  const cls = ["course"];
  if(course.state==="aprobado") cls.push("approved");
  if(course.state==="cursando") cls.push("progress");
  if(locked) cls.push("locked");
  if(selectedId){
    const sel = getCourse(selectedId);
    const isSelf = course.id===selectedId;
    const isPrereq = sel && (sel.prereq||[]).includes(course.id);
    const isDep = (course.prereq||[]).includes(selectedId);
    if(isSelf) cls.push("selected");
    else if(!isPrereq && !isDep) cls.push("dim");
  }

  if(editMode){
    const options = allCourses().filter(c=>c.id!==course.id).map(c=>{
      const checked = (course.prereq||[]).includes(c.id) ? "checked" : "";
      return `<label><input type="checkbox" data-prereq="${c.id}" ${checked}/> ${c.code} — ${c.name}</label>`;
    }).join("");
    return `<div class="${cls.join(' ')}" data-id="${course.id}" data-editcard="1">
      <div class="edit-row">
        <input type="text" data-field="code" value="${course.code||''}" placeholder="Código"/>
        <input type="text" data-field="name" value="${course.name||''}" placeholder="Nombre del curso"/>
        <input type="number" data-field="credits" value="${course.credits||0}" placeholder="Créditos" min="0"/>
        <div class="prereq-box">${options || '<em style="color:var(--ink-soft)">Sin otros cursos</em>'}</div>
        <div class="edit-actions">
          <button class="small danger" data-action="delete-course" data-id="${course.id}" data-cycle="${cycleId}">Eliminar</button>
        </div>
      </div>
    </div>`;
  }

  return `<div class="${cls.join(' ')}" data-id="${course.id}">
      <div class="course-code">${course.code||'—'}</div>
      <div class="course-name">${course.name||'(sin nombre)'}</div>
      <div class="course-foot">
        <span><span class="state-dot"></span> ${course.credits||0} cr.</span>
        ${locked ? '<span class="lock-icon">🔒</span>' : ''}
      </div>
    </div>`;
}

function render(){
  renderStats();
  const content = document.getElementById("content");
  if(!data.cycles || data.cycles.length===0){
    content.innerHTML = `<div class="empty">Aún no tienes ciclos en tu malla.<br><br>
      <button class="primary" id="addFirstCycle">Agregar primer ciclo</button></div>`;
    document.getElementById("addFirstCycle").onclick = addCycle;
    return;
  }

  const cyclesHtml = data.cycles.map(cycle => {
    const st = cycleStats(cycle);
    const titleHtml = editMode
      ? `<input type="text" value="${cycle.name}" data-cycle-name="${cycle.id}"/>`
      : `<div class="cycle-title">${cycle.name}</div>`;
    const coursesHtml = cycle.courses.map(c => courseCard(c, cycle.id)).join("");
    const addBtn = editMode ? `<button class="add-course-btn" data-action="add-course" data-cycle="${cycle.id}">+ Agregar curso</button>` : "";
    const delCycleBtn = editMode ? `<button class="small danger" data-action="delete-cycle" data-cycle="${cycle.id}" style="margin-top:6px;width:100%;">Eliminar ciclo</button>` : "";
    return `<div class="cycle">
        <div class="cycle-head">
          ${titleHtml}
        </div>
        <div class="cycle-credits">${st.done}/${st.total} créditos</div>
        <div style="margin-top:8px;">${coursesHtml}</div>
        ${addBtn}
        ${delCycleBtn}
      </div>`;
  }).join("");

  content.innerHTML = `<div class="board" id="board">
      <svg id="traceSvg"></svg>
      ${cyclesHtml}
      <div class="cycle add-cycle"><button id="addCycleBtn">+ Agregar ciclo</button></div>
    </div>`;

  attachHandlers();
  if(selectedId) requestAnimationFrame(drawTrace);
}

function attachHandlers(){
  document.getElementById("addCycleBtn").onclick = addCycle;
  // Clicks on courses and edit buttons are handled via event delegation on #content.
}

function cycleCourseState(id){
  const c = getCourse(id);
  if(!c) return;
  c.state = nextState(c.state);
  saveData();
}

function addCycle(){
  const n = data.cycles.length+1;
  data.cycles.push({ id: "cy"+Date.now(), name: "Ciclo "+n, courses: [] });
  saveData(); render();
}

function addCourse(cycleId){
  const cycle = data.cycles.find(c=>c.id===cycleId);
  if(!cycle) return;
  cycle.courses.push({ id:"co"+Date.now(), code:"", name:"Nuevo curso", credits:3, prereq:[], state:"pendiente" });
  saveData(); render();
}

function deleteCourse(cycleId, courseId){
  const cycle = data.cycles.find(c=>c.id===cycleId);
  if(!cycle) return;
  cycle.courses = cycle.courses.filter(c=>c.id!==courseId);
  data.cycles.forEach(cy => cy.courses.forEach(c => {
    c.prereq = (c.prereq||[]).filter(p=>p!==courseId);
  }));
  saveData(); render();
}

function deleteCycle(cycleId){
  data.cycles = data.cycles.filter(c=>c.id!==cycleId);
  saveData(); render();
}

function drawTrace(){
  const svg = document.getElementById("traceSvg");
  const board = document.getElementById("board");
  if(!svg || !board || !selectedId) { if(svg) svg.innerHTML=""; return; }
  const boardRect = board.getBoundingClientRect();
  const sel = getCourse(selectedId);
  const selEl = board.querySelector(`.course[data-id="${selectedId}"]`);
  if(!selEl){ svg.innerHTML=""; return; }
  const selRect = selEl.getBoundingClientRect();
  const selPoint = {
    x: selRect.left - boardRect.left + selRect.width/2,
    y: selRect.top - boardRect.top + selRect.height/2
  };

  let lines = "";
  const related = [...(sel.prereq||[]), ...dependentsOf(selectedId).map(d=>d.id)];
  related.forEach(rid => {
    const rEl = board.querySelector(`.course[data-id="${rid}"]`);
    if(!rEl) return;
    const rRect = rEl.getBoundingClientRect();
    const rPoint = {
      x: rRect.left - boardRect.left + rRect.width/2,
      y: rRect.top - boardRect.top + rRect.height/2
    };
    const midX = (selPoint.x + rPoint.x)/2;
    lines += `<path d="M ${selPoint.x} ${selPoint.y} C ${midX} ${selPoint.y}, ${midX} ${rPoint.y}, ${rPoint.x} ${rPoint.y}"
      stroke="var(--trace)" stroke-width="2" fill="none" opacity="0.75" stroke-dasharray="5 4"/>`;
    lines += `<circle cx="${rPoint.x}" cy="${rPoint.y}" r="4" fill="var(--trace)" opacity="0.85"/>`;
  });
  svg.innerHTML = lines;
}

// event delegation for dynamic content (edit fields, buttons, course click)
document.getElementById("content").addEventListener("click", (e) => {
  const actionBtn = e.target.closest("[data-action]");
  if(actionBtn){
    const action = actionBtn.dataset.action;
    if(action==="add-course") addCourse(actionBtn.dataset.cycle);
    if(action==="delete-course") deleteCourse(actionBtn.dataset.cycle, actionBtn.dataset.id);
    if(action==="delete-cycle") deleteCycle(actionBtn.dataset.cycle);
    return;
  }
  const card = e.target.closest(".course");
  if(card && !card.dataset.editcard){
    const id = card.dataset.id;
    // click toggles state; ctrl/cmd-click (or double intent) selects for trace
    if(e.altKey || e.metaKey || e.ctrlKey){
      selectedId = (selectedId === id) ? null : id;
      render();
    } else {
      cycleCourseState(id);
      render();
    }
  }
});

document.getElementById("content").addEventListener("change", (e) => {
  const cardEl = e.target.closest("[data-editcard]");
  if(cardEl){
    const id = cardEl.dataset.id;
    const c = getCourse(id);
    if(!c) return;
    const field = e.target.dataset.field;
    if(field){
      c[field] = field==="credits" ? Number(e.target.value) : e.target.value;
    }
    const prereqId = e.target.dataset.prereq;
    if(prereqId){
      c.prereq = c.prereq || [];
      if(e.target.checked){ if(!c.prereq.includes(prereqId)) c.prereq.push(prereqId); }
      else { c.prereq = c.prereq.filter(p=>p!==prereqId); }
    }
    saveData();
    return;
  }
  const cycleNameInput = e.target.closest("[data-cycle-name]");
  if(cycleNameInput){
    const cy = data.cycles.find(c=>c.id===cycleNameInput.dataset.cycleName);
    if(cy){ cy.name = cycleNameInput.value; saveData(); }
  }
});

document.getElementById("editToggle").addEventListener("click", () => {
  editMode = !editMode;
  selectedId = null;
  document.getElementById("editToggle").textContent = editMode ? "Salir de edición" : "Modo edición";
  document.getElementById("editToggle").classList.toggle("primary", !editMode);
  render();
});

document.getElementById("resetExample").addEventListener("click", () => {
  if(confirm("Esto reemplazará tu malla actual con tu plan de estudio oficial (créditos, prerrequisitos y avance tal como figuran en tu PDF). Perderás cualquier cambio manual que hayas hecho. ¿Continuar?")){
    data = JSON.parse(JSON.stringify(exampleData));
    saveData(); render();
  }
});

document.getElementById("clearAll").addEventListener("click", () => {
  if(confirm("Esto borrará todos tus ciclos y cursos. ¿Continuar?")){
    data = { cycles: [] };
    saveData(); render();
  }
});

window.addEventListener("resize", () => { if(selectedId) drawTrace(); });

loadData();
