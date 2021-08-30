// CONSTRUCTOR DE OBJETO Y MÉTODOS
class Paciente {
  constructor(nombre, apellido, direccion, localidad, edad, motivo) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.direccion = direccion;
    this.localidad = localidad;
    this.edad = edad;
    this.motivo = motivo;
  }
  imprimirPedido() {
    console.log("El/La señor/a " + this.nombre + " " + this.apellido + ", de " + this.edad + " años, que reside en " +
    this.direccion + ", " + this.localidad + ", solicita vacunación en su domicilio debido a " +
    this.motivo);
    let div = document.createElement("div");

    div.innerHTML = `
                    <h3>Pedido de vacunación domiciliaria</h3>
                    <br>
                    <p>El/La señor/a ${this.nombre} ${this.apellido}, de ${this.edad} años, que reside en
                    ${this.direccion}, ${this.localidad} , solicita vacunación en su domicilio debido a ${this.motivo}`;

    mainSection.appendChild(div)
  }
}

// FUNCIÓN IMPRIMIR TODOS LOS PEDIDOS
const imprimirPedidos = function() {
  for(let paciente of pacientes) {
    paciente.imprimirPedido();
  }
}

// FUNCIÓN PROMEDIO
const promedioPacientes = function() {
  let sum = 0;

  for(const paciente of pacientes) {
    sum += paciente.edad;
  }
  console.log("El promedio de edad es " + (sum / pacientes.length));
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
    const impar = Math.floor(arr.length/2)
    mediana = arr[impar];
  }
  console.log("La mediana de edad es " + mediana);
}
// FIN FUNCIONES Y CONSTRUCTORES

// VARIABLES GLOBALES
let pacientes = [];
let halt = false;
let halt1 = false;

const mainSection = document.getElementById("main_section");

// INICIO CUESTIONARIO
alert("Bienvenido al sistema de vacunación móvil, por favor, rellene el formulario con sus datos:");

do {
  let continuar = prompt("Escriba 'n' (sin las comillas) si desea finalizar");

  if(continuar.toLowerCase() == "n") {
    halt = true;
    break;
  }

  let nombre = prompt("Ingrese su/s nombre/s");
  let apellido = prompt("Ingrese su/s apellido/s");
  let direccion = prompt("Ingrese su domicilio (calle, altura, piso y depto)");
  let localidad = prompt("Ingrese su localidad");
  let edad =parseInt(prompt("Ingrese su edad"));
  let motivo = prompt("Ingrese el motivo por el cual debe ser vacunado en su hogar (movilidad reducida, indisponibilidad horaria, etc");

  let patient = new Paciente(nombre, apellido, direccion, localidad, edad, motivo);
  pacientes.push(patient);
} while (!halt)

// INICIO OUTPUT
do {
  let listado = parseInt(prompt("Escriba 1 para el listado de pacientes, 2 para las solicitudes, 3 para los promedios de edad, 4 para la mediana de edad, o deje vacío, o escriba otra cosa para finalizar"));

  switch (listado) {
    case 1:
      console.log(pacientes);
      alert("El listado está en la consola");
      break;

    case 2:
      imprimirPedidos();
      alert("Las solicitudes están en la consola");
      break;

    case 3:
      promedioPacientes();
      alert("El promedio de edad está en la consola");
      break;

    case 4:
      medianaPacientes();
      alert("La mediana de edad está en la consola");
      break;

    default:
      break;
  }

  let continuar1 = prompt("Escriba 'n' (sin las comillas) si desea finalizar");
  if(continuar1.toLowerCase() == "n") {
    halt1 = true;
    break;
  }

} while (!halt1);
