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
    if(listadoTareas[index]["checkbox"] == true){
        totalesRealizadas.innerHTML -= 1
    }
    listadoTareas.splice(index, 1)
    renderTareas()
}

function tareaRealizada(idTarea) {
    let checkboxes = document.querySelectorAll(".chkbx")
    const checkboxesArray = Array.from(checkboxes)
    const checkFilter = checkboxesArray.filter(x => x.checked == true)
    totalesRealizadas.innerHTML = checkFilter.length
    const indexAModificar = listadoTareas.findIndex(i => i.id===idTarea)
    const currentBoxStatus = document.querySelector("#chkbx"+idTarea).checked
    if (currentBoxStatus == true){
        listadoTareas[indexAModificar]["checkbox"] = true
    } else {
        listadoTareas[indexAModificar]["checkbox"] = false
    }
}

function renderTareas(){
    let html = ""
    for (let tarea of listadoTareas) {
        html += `
        <tr>
        <th scope="row">${tarea.id}</th>
        <td>${tarea.descripcion}</td>
        <td><input type="checkbox" id="chkbx${tarea.id}" class="chkbx" onclick="tareaRealizada(${tarea.id})"></td>
        <td><button type="button" class="btn-close" aria-label="Close" onclick="eliminar(${tarea.id})"></button></td>                        
        </tr>
        `;
    }
    seccionListado.innerHTML = html;
    totalesTareas.innerHTML = listadoTareas.length
    // Restaurar tareas realizadas
    var checkboxes = document.querySelectorAll("input[type=checkbox][class=chkbx]");
    console.log(checkboxes)
    checkboxes.forEach( x => x.checked = listadoTareas[listadoTareas.findIndex(i => i.id === Number(x.id.slice(5)) )]["checkbox"]
    )
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


