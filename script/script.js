//ARRAYS
const personajes = [
  {
    clase: "Guerrero",
    raza: "Orco",
    vida: 200,
    daño: 18,
    habilidad: "Genera daño base + el numero obtenido, si el numero es 5-10 fallará",
    titulo: "tituloGue",
    borde: "bordeGue",
    rutaImg: "guerrero.png"
  },
  {
    clase: "Asesino",
    raza: "Elfo Oscuro",
    vida: 100,
    daño: 15,
    habilidad: "Numero Impar, Apuñala y triplica el daño base",
    titulo: "tituloAse",
    borde: "bordeAse",
    rutaImg: "asesino.png"
  },
  {
    clase: "Paladín",
    raza: "Humano",
    vida: 150,
    daño: 20,
    habilidad: "Numero: 6-12, potencia el daño base con un 50% del numero obtenido",
    titulo: "tituloPal",
    borde: "bordePal",
    rutaImg: "paladin.png"
  },
  {
    clase: "Mago",
    raza: "Gnomo",
    vida: 100,
    daño: 20,
    habilidad: "Numero par, ataque magico que duplica el daño base",
    titulo: "tituloMag",
    borde: "bordeMag",
    rutaImg: "mago.png"
  },
  {
    clase: "Druida",
    raza: "Entidad",
    vida: 80,
    daño: 20,
    habilidad: "Numero par, se cura el total del numero obtenido",
    titulo: "tituloDrui",
    borde: "bordeDrui",
    rutaImg: "druida.png"
  }
]

let contenedor = document.getElementById("contenedorPrincipal")

function renderizarTarjetas(array) {
  let tituloUno = document.createElement("div")
  tituloUno.classList.add("tituloUno")
  tituloUno.innerHTML=`<h2> Jugador uno, eligue tu campeon </h2><input placeholder="Filtra por clase/raza">`
  contenedor.appendChild(tituloUno)
  let contenedorUno = document.createElement("div")
  contenedorUno.classList.add("contenedorJugadorUno")
  contenedor.appendChild(contenedorUno)
  array.forEach(personaje => {
    let tarjetaPersonaje = document.createElement("div")
    tarjetaPersonaje.classList.add("contenedorTarjeta", personaje.borde)
    tarjetaPersonaje.innerHTML = `
      <div class="tituloTarjeta">
        <h2 class="${personaje.titulo}">${personaje.clase}</h2>
        <h3>${personaje.raza}</h3>
      </div>
      <div class="imgTarjeta">
        <img src="./img/${personaje.rutaImg}">
      </div>
      <div class="iconoTarjeta">
        <div class="vidaTarjeta">
          <img src="./img/rubi.png">
          <p>${personaje.vida}</p>
        </div>
        <div class="danioTarjeta">
          <img src="./img/espada.png">
          <p>${personaje.daño}</p>
        </div>
      </div>
      <div class="descripcionTarjeta">
        <p>${personaje.habilidad}</p>
      </div>
    `
    tarjetaPersonaje.addEventListener("click", function() {
      sessionStorage.setItem("tarjetaSeleccionada", JSON.stringify(personaje));
    })
    contenedorUno.appendChild(tarjetaPersonaje)
  })
}

renderizarTarjetas(personajes)


const tarjetaSeleccionadaStr = sessionStorage.getItem("tarjetaSeleccionada")


let tarjetaSeleccionada = null
if (tarjetaSeleccionadaStr) {
  tarjetaSeleccionada = JSON.parse(tarjetaSeleccionadaStr)
}

console.log(tarjetaSeleccionada)