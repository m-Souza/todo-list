var listadoTareas = [
    {id: 1,
    descripcion: 'pintar pieza principal',
    checkbox: false},
    {id: 2,
    descripcion: 'comprar artefactos baño',
    checkbox: false},
    {id: 3,
    descripcion: 'tramitar permiso de obra',
    checkbox:false},
]

const seccionListado = document.querySelector("#listado-tareas")
const tareaInput = document.querySelector("#input-tarea")
const btnAgregar = document.querySelector("#agregar-tarea")
const totalesTareas = document.querySelector("#counter-tareas")
var totalesRealizadas = document.querySelector("#counter-realizadas")
var idBase = 3
var counterRealizadas = 0

// construir listado inicial
renderTareas()

// manejo de lista de tareas
function eliminar(id){
    const index = listadoTareas.findIndex((ele) => ele.id == id)
    listadoTareas.splice(index, 1)
    renderTareas()
}

function tareaRealizada() {
    let checkboxes = document.querySelectorAll(".chkbx")
    console.log(checkboxes)
    const checkboxesArray = Array.from(checkboxes)
    const checkFilter = checkboxesArray.filter(x => x.checked == true)
    totalesRealizadas.innerHTML = checkFilter.length
}

function renderTareas(){
    let html = ""
    for (let tarea of listadoTareas) {
        html += `
        <tr>
        <th scope="row">${tarea.id}</th>
        <td>${tarea.descripcion}</td>
        <td><input type="checkbox" id="chkbx${tarea.id}" class="chkbx" onclick="tareaRealizada()"></td>
        <td><button type="button" class="btn-close" aria-label="Close" onclick="eliminar(tarea, ${tarea.id})"></button></td>                        
        </tr>
        `;
    }

    seccionListado.innerHTML = html;
    totalesTareas.innerHTML = listadoTareas.length
    }

function crearId(){
    idBase +=1
    return idBase
}

// interacción con usuario

btnAgregar.addEventListener("click", () => {
    const nuevaTarea = {
        id: crearId(),
        descripcion: tareaInput.value,
        checkbox:false
    }
    listadoTareas.push(nuevaTarea)
    tareaInput.value = ""
    renderTareas()
})


