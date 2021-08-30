// CONSTRUCTOR DE OBJETO Y MÉTODOS
class Paciente {
  constructor(nombre, apellido, direccion, barrio, municipio, provincia, edad, motivo) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.direccion = direccion;
    this.barrio = barrio;
    this.municipio = municipio
    this.provincia = provincia;
    this.edad = edad;
    this.motivo = motivo;
  }
// MÉTODO IMPRIMIR PEDIDO
imprimirPedido() {
  $("#main_section").prepend(`
                            <div class="pedido card" style="display: none;">
                              <div class="card-header">
                                <h3 class="pedido__h3">Pedido de vacunación domiciliaria</h3>
                              </div>
                              <div class="card-body">
                                <p class="pedido__p">El/La señor/a ${this.nombre} ${this.apellido}, de ${this.edad} años, que reside en
                                ${this.direccion}, ${this.barrio}, ${this.provincia}, solicita vacunación en su domicilio debido a: ${this.motivo}.</p>
                              </div>
                              </div>
                              `);
$(".pedido").fadeIn("slow");
}

// MÉTODO AGREGAR A TABLA
  listadoTabla() {
    $("#tableBody").append(`
                           "<tr>
                               <td>${this.apellido}</td>
                               <td>${this.nombre}</td>
                               <td>${this.direccion}</td>
                               <td>${this.barrio}</td>
                               <td>${this.municipio}</td>
                               <td>${this.provincia}</td>
                               <td>${this.edad}</td>
                               <td>${this.motivo}</td>
                           </tr>"
                           `);
  }
}
// FIN CONSTRUCTOR

//FUNCIÓN IMPRIMIR FORMULARIO
const imprimirForm = function() {
  $(".form").fadeIn("slow");
  $(".operaciones").fadeIn("slow");
}

// FUNCIÓN MOSTRAR LISTADO
const listadoPacientes = function() {
  if ($(".table").length) {
    $(".table").remove();
  }

  $("#main_section").prepend(`<table class="table table-bordered table-striped" style="display: none;">
                                <thead class="thead-light">
                                   <tr>
                                     <th>Apellido</th>
                                     <th>Nombre</th>
                                     <th>Dirección</th>
                                     <th>Barrio</th>
                                     <th>Municipio</th>
                                     <th>Provincia</th>
                                     <th>Edad</th>
                                     <th>Motivo</th>
                                   </tr>
                                 </thead>
                               <tbody id="tableBody"></tbody>
                             </table>
                             `);

  for(let paciente of pacientes) {
    paciente.listadoTabla();
  }
  $(".table").fadeIn("slow");
  $("#return").fadeIn("slow");
}

// FUNCIÓN IMPRIMIR TODOS LOS PEDIDOS
const imprimirPedidos = function() {
  for(let paciente of pacientes) {
    paciente.imprimirPedido();
  }
  $("#return").fadeIn("slow");
}

// FUNCIÓN PROMEDIO
const promedioPacientes = function() {
  let sum = 0;

  for(const paciente of pacientes) {
    sum += paciente.edad;
  }

  let promedio = sum / pacientes.length;
  $("#main_section").prepend(`<div class="promedio" style="display: none;">
                               <h1 class="promedio__h1">
                               El promedio de edad de los pacientes es ${promedio}
                               </h1>
                             </div>
                             `);
  $(".promedio").fadeIn("slow");
  $("#return").fadeIn("slow");
}

//FUNCIÓN MEDIANA
const medianaPacientes = function() {
  let arr = [];
  let mediana;

  for (const paciente of pacientes) {
    arr.push(paciente.edad);
  }
  arr.sort();

  if (pacientes.length%2==0) {
    const par = (arr[arr.length/2-1] + arr[arr.length/2]) / 2;
    mediana = par;
  } else {
    const impar = Math.floor(arr.length/2);
    mediana = arr[impar];
  }

  $("#main_section").prepend(`<div class="mediana" style="display: none;">
                               <h1 class="mediana__h1">
                               La mediana de edad de los pacientes es ${mediana}
                               </h1>
                             </div>
                             `);
  $(".mediana").fadeIn("slow");
  $("#return").fadeIn("slow");
}

//FUNCIÓN LIMPIAR
const resetForm = function() {
  $("#formName").val("");
  $("#formSurname").val("");
  $("#formAddress").val("");
  $("#formBarrio").val("");
  $("#formMuni").val("");
  $("#formProvince").val("");
  $("#formAge").val("");
  $("#formMotive").val("");
}

// FUNCIÓN BORRAR FORMULARIO
const eraseForm = function() {
  $(".form").hide();
  $(".operaciones").hide();
}

// FUNCIÓN RESETEAR MAINSECTION
const resetMainSection = function() {
  if ($("#main_section").length > 0) {
    $("#main_section").empty()
  }
}

// FUNCIONES ALMACENAR Y RECUPERAR STORAGE
const almacenamientoLocal = (key, value) => { localStorage.setItem(key,value) };

const recuperarLocalStorage = function() {
  if (window.localStorage.length != 0) {
    let storage = JSON.parse(localStorage.getItem("pacientes"));
    pacientes = [];

    for(let obj of storage) {
      let paciente = new Paciente(obj.nombre, obj.apellido, obj.direccion, obj.barrio, obj.municipio, obj.provincia, obj.edad, obj.motivo);

      pacientes.push(paciente);
    }
  }
}

// FIN FUNCIONES

// VARIABLES GLOBALES
let pacientes = [];
const urlProvincias = "https://apis.datos.gob.ar/georef/api/provincias?campos=id,nombre";

const pacientesBtn = $("#pacientes");
const solicitudesBtn = $("#solicitudes");
const promedioBtn = $("#promedio");
const medianaBtn = $("#mediana");
const volverBtn = $("#return");

// ANIMACIÓN DE ARRANQUE Y AUTOCOMPLETAR PROVINCIAS
$("document").ready(() => {
  $("main").fadeIn("fast");

  $.get(urlProvincias, (resp, status) => {
    if (status === "success") {
      if ($("#formProvince").length > 0) {
        $("#formProvince").empty();
      }
      for(let prov of resp.provincias) {
        $("#formProvince").append(`<option id="${prov.id}" value="${prov.nombre}">${prov.nombre}</option>`);
      }
    }
  });

});

// AUTOCOMPLETAR MUNICIPIOS
$("#formProvince").click(() => {
  const id = $("#formProvince option:selected").attr("id");
  if (id == "02") {
    $("#formMuni").empty();
    $("#formMuni").append(`<option id="defaultCity" value="CABA">CABA</option>`);
  } else if(id == "78" || id == "30" || id == "86") {
    $("#formMuni").empty();
    $("#formMuni").append(`<option id="defaultCity" value="-">-</option>`);
  } else {
    $.get(`https://apis.datos.gob.ar/georef/api/municipios?provincia=${id}&campos=id,nombre&max=100`, (resp, status) => {
      if (status === "success") {
        if ($("#formMuni").length > 0) {
          $("#formMuni").empty();
        }
        for(let city of resp.municipios) {
          $("#formMuni").append(`<option id="${city.id}" value="${city.nombre}">${city.nombre}</option>`);
        }
      }
    });
  }
});

// INICIO CUESTIONARIO

$("#form").submit(function(e) {
  e.preventDefault();

  let nombre = $("#formName").val();
  let apellido = $("#formSurname").val();
  let direccion = $("#formAddress").val();
  let barrio = $("#formBarrio").val();
  let municipio = $("#formMuni").val();
  let provincia = $("#formProvince").val();
  let edad = parseInt($("#formAge").val());
  let motivo = $("#formMotive").val().toLowerCase();

  let patient = new Paciente(nombre, apellido, direccion, barrio, municipio, provincia, edad, motivo);

  if (window.localStorage.length != 0) {
    recuperarLocalStorage();
  }

  pacientes.push(patient);

  // SI TUVIERA SERVIDOR LO GUARDARÍA USANDO UN MÉTODO $.post

  almacenamientoLocal("pacientes", JSON.stringify(pacientes));
  resetForm();
});

// INICIO OPERACIONES
pacientesBtn.click(() => {
  resetMainSection();
  eraseForm();
  $("#main_section").fadeIn();
  recuperarLocalStorage();
  listadoPacientes();
});

solicitudesBtn.click(function() {
  resetMainSection();
  $("#main_section").fadeIn();
  eraseForm();
  recuperarLocalStorage();
  imprimirPedidos();
});

promedioBtn.click(() => {
  resetMainSection();
  $("#main_section").fadeIn();
  eraseForm();
  recuperarLocalStorage();
  promedioPacientes();
});

medianaBtn.click(() => {
  resetMainSection();
  $("#main_section").fadeIn();
  eraseForm();
  recuperarLocalStorage();
  medianaPacientes();
});

volverBtn.click(() => {
  $("#main_section").hide();
  $("#return").hide();
  imprimirForm();
});
