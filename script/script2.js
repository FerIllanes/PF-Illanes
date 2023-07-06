//ARRAYS
const personajes = [
  {
    clase: "Guerrero",
    vida: 200,
    daño: 18,
    habilidad: "Genera el daño base mas el numero que salga en el dado, si sale 5 o 10 falla el golpe"
  },
  {
    clase: "Asesino",
    vida: 100,
    daño: 15,
    habilidad: "Numero Impar, Apuñala y triplica el daño"
  },
  {
    clase: "Paladin",
    vida: 150,
    daño: 20,
    habilidad: "Numero 6 o 12, genera un ataque potenciado que aplica el daño mas un 50% del mismo"
  },
  {
    clase: "Mago",
    vida: 100,
    daño: 10,
    habilidad: "Numero par, ataque magico que duplica el daño"
  }
]

//FUNCIONES
function miPrograma() {
  let jugadorUnoClase, jugadorDosClase
  do {
    mensajeBienvenida = prompt(opcion).trim()

    if (mensajeBienvenida.length === 0) {
      continue
    }

    mensajeBienvenida = Number(mensajeBienvenida)

    if (mensajeBienvenida === 1) {
      jugadorUnoClase = seleccionarClase("Jugador uno")
      jugadorDosClase = seleccionarClase("Jugador dos")

      const jugadorUno = { ...personajes.find(personaje => personaje.clase.toLocaleLowerCase() === jugadorUnoClase) }
      const jugadorDos = { ...personajes.find(personaje => personaje.clase.toLocaleLowerCase() === jugadorDosClase) }

      alert("¡COMIENZA LA BATALLA!")

      batallaPorTurnos(jugadorUno, jugadorDos)

    } else if (mensajeBienvenida === 2) {
      alert(mensajeInstruccion)
    } else if (mensajeBienvenida === 3) {
      let clase = prompt(`Escribe la clase que deseas conocer:\n${listar(personajes)}\n0 Para volver`).toLocaleLowerCase()
      conocerClase(clase)
    }
  } while (mensajeBienvenida !== 0)
  alert("Gracias por jugar, te esperamos en tu siguiente batalla")
}

function batallaPorTurnos(jugadorUno, jugadorDos) {
  let turno = 1

  while (jugadorUno.vida > 0 && jugadorDos.vida > 0) {
    alert(`Turno ${turno}\nJugador uno: ${jugadorUno.clase} - Vida: ${jugadorUno.vida}\nJugador dos: ${jugadorDos.clase} - Vida: ${jugadorDos.vida}`)

    // Turno de jugadorUno

    const accionJugadorUno = mensajeBatalla("uno")
    if (accionJugadorUno === 1) {
      if (jugadorUno.clase === "Guerrero") {
        // Implementar lógica para el Guerrero
        const dado = lanzarDado()
        if (dado === 5 || dado === 10) {
          alert(`Jugador uno:\nHas sacado un ${dado}¡Has fallado el golpe!`)
        } else {
          jugadorDos.vida -= (jugadorUno.daño + dado)
          alert(`Jugador uno:\nHas sacado un ${dado}, tu ataque es de ${jugadorUno.daño + dado}`)
        }
      } else if (jugadorUno.clase === "Asesino") {
        // Implementar lógica para el Asesino
        const dado = lanzarDado()
        if (dado % 2 !== 0) {
          jugadorDos.vida -= (jugadorUno.daño * 3)
          alert(`Jugador uno:\nHas sacado un ${dado}, tu ataque es de ${jugadorUno.daño * 3}`)
        } else {
          jugadorDos.vida -= jugadorUno.daño
          alert(`Jugador uno:\nHas sacado un ${dado}, tu ataque es de ${jugadorUno.daño}`)
        }
      } else if (jugadorUno.clase === "Paladin") {
        // Implementar lógica para el Paladin
        const dado = lanzarDado()
        if (dado === 2 || dado === 6 || dado === 10) {
          jugadorDos.vida -= (jugadorUno.daño * 1.5)
          alert(`Jugador uno:\nHas sacado un ${dado}, tu ataque es de ${jugadorUno.daño * 1.5}`)
        } else {
          jugadorDos.vida -= jugadorUno.daño
          alert(`Jugador uno:\nHas sacado un ${dado}, tu ataque es de ${jugadorUno.daño}`)
        }
      } else if (jugadorUno.clase === "Mago") {
        // Implementar lógica para el Mago
        const dado = lanzarDado()
        if (dado % 2 === 0) {
          jugadorDos.vida -= (jugadorUno.daño * 2)
          alert(`Jugador uno:\nHas sacado un ${dado}, tu ataque es de ${jugadorUno.daño * 2}`)
        } else {
          jugadorDos.vida -= jugadorUno.daño
          alert(`Jugador uno:\nHas sacado un ${dado}, tu ataque es de ${jugadorUno.daño}`)
        }
      }

      // Verificar si jugadorDos quedó sin vida
      if (jugadorDos.vida <= 0) {
        alert("¡Jugador Uno ganó!")
        break
      }
    } else if (accionJugadorUno === 0) {
      alert("El Jugador Uno ha abandonado la batalla. ¡Jugador Dos gana!")
      break
    }

    // Turno de jugadorDos

    const accionJugadorDos = mensajeBatalla("dos")
    if (accionJugadorDos === 1) {
      if (jugadorDos.clase === "Guerrero") {
        // Implementar lógica para el Guerrero
        const dado = lanzarDado()
        if (dado === 5 || dado === 10) {
          alert(`Jugador dos:\nHas sacado un ${dado}¡Has fallado el golpe!`)
        } else {
          jugadorUno.vida -= (jugadorDos.daño + dado)
          alert(`Jugador dos:\nHas sacado un ${dado}, tu ataque es de ${jugadorDos.daño + dado}`)
        }
      } else if (jugadorDos.clase === "Asesino") {
        // Implementar lógica para el Asesino
        const dado = lanzarDado()
        if (dado % 2 !== 0) {
          jugadorUno.vida -= (jugadorDos.daño * 3)
          alert(`Jugador dos:\nHas sacado un ${dado}, tu ataque es de ${jugadorDos.daño * 3}`)
        } else {
          jugadorUno.vida -= jugadorDos.daño
          alert(`Jugador dos:\nHas sacado un ${dado}, tu ataque es de ${jugadorDos.daño}`)
        }
      } else if (jugadorDos.clase === "Paladin") {
        // Implementar lógica para el Paladin
        const dado = lanzarDado()
        if (dado === 2 || dado === 6 || dado === 10) {
          jugadorUno.vida -= (jugadorDos.daño * 1.5)
          alert(`Jugador dos:\nHas sacado un ${dado}, tu ataque es de ${jugadorDos.daño * 1.5}`)
        } else {
          jugadorUno.vida -= jugadorDos.daño
          alert(`Jugador dos:\nHas sacado un ${dado}, tu ataque es de ${jugadorDos.daño}`)
        }
      } else if (jugadorDos.clase === "Mago") {
        // Implementar lógica para el Mago
        const dado = lanzarDado()
        if (dado % 2 === 0) {
          jugadorUno.vida -= (jugadorDos.daño * 2)
          alert(`Jugador dos:\nHas sacado un ${dado}, tu ataque es de ${jugadorDos.daño * 2}`)
        } else {
          jugadorUno.vida -= jugadorDos.daño
          alert(`Jugador dos:\nHas sacado un ${dado}, tu ataque es de ${jugadorDos.daño}`)
        }
      }
      // Verificar si jugadorUno quedó sin vida
      if (jugadorUno.vida <= 0) {
        alert("¡Jugador Dos ganó!")
        break
      }
    } else if (accionJugadorDos === 0) {
      alert("El Jugador Dos ha abandonado la batalla. ¡Jugador Uno gana!")
      break
    } turno++
  }
}

function mensajeBatalla(jugador) {
  let mensajeBatallaUno, mensajeBatallaDos

  do {
    if (jugador === "uno") {
      do {
        mensajeBatallaUno = prompt("Jugador uno, selecciona una opción:\n1- Lanzar dado\n0- Abandonar la batalla").trim()
      } while (mensajeBatallaUno !== "1" && mensajeBatallaUno !== "0")

      return mensajeBatallaUno === "" ? undefined : Number(mensajeBatallaUno)
    } else if (jugador === "dos") {
      do {
        mensajeBatallaDos = prompt("Jugador dos, selecciona una opción:\n1- Lanzar dado\n0- Abandonar la batalla").trim()
      } while (mensajeBatallaDos !== "1" && mensajeBatallaDos !== "0")

      return mensajeBatallaDos === "" ? undefined : Number(mensajeBatallaDos)
    }
  } while (true)
}

function lanzarDado() {
  return Math.floor(Math.random() * 12) + 1
}

function listar(array) {
  let listado = ""
  array.forEach(element => {
    listado += element.clase + "\n"
  })
  return listado
}

function seleccionarClase(jugador) {
  let clase
  do {
    clase = prompt(`${jugador}, elige tu clase:\n${listar(personajes)}`).toLocaleLowerCase()
    if (!personajes.find(personaje => personaje.clase.toLocaleLowerCase() === clase)) {
      alert("La clase ingresada no existe. Por favor, elige una clase existente.")
    }
  } while (!personajes.find(personaje => personaje.clase.toLocaleLowerCase() === clase))

  return clase
}

function buscarClase(tipo) {
  const personaje = personajes.find(personaje => personaje.clase.toLocaleLowerCase() === tipo)
  alert(`Clase: ${personaje.clase}\nVida: ${personaje.vida}\nDaño: ${personaje.daño}\nHabilidad: ${personaje.habilidad}`)
}

function conocerClase(clase) {
  do {
    if (clase === "guerrero") {
      buscarClase(clase)
    } else if (clase === "asesino") {
      buscarClase(clase)
    } else if (clase === "paladin") {
      buscarClase(clase)
    } else if (clase === "druida") {
      buscarClase(clase)
    } else if (clase === "mago") {
      buscarClase(clase)
    } else if (clase !== "0") {
      alert("La clase ingresada no existe.")
    }


    clase = prompt(
      "Escribe la clase que deseas conocer:\n" +
      listar(personajes) +
      "\n0 Para volver"
    ).toLowerCase();
  } while (clase !== "0")
}

let opcion = "BATALLAS EPICAS \n 1- Jugar \n 2- Instrucciones \n 3- Conoce las clases  \n 0- Salir"
let mensajeBienvenida
let mensajeInstruccion = "'BATALLAS EPICAS', es un juego por turnos de 2 jugadores \n 1- Cada jugador seleccionara un campeon, cada campeon tiene su habilidad especial\n2- El combate consiste en lanzar el dado, cada campeon tiene ciertas caracteristicas basicas y una habilidad especial que se activara si el dado saca ciertos numeros\n4- El jugador que logre dejar en cero la vida de su adversario ganara la BATALLA EPICA! "
let mesajePersonaje = ""
miPrograma()








