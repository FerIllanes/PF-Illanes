//ARRAYS


function miPrograma() {

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

  let turnoPerdido = false

  function renderizar(personaje, contenedor) {
    let tarjetaPersonaje = document.createElement("div")
    tarjetaPersonaje.classList.add(personaje.borde, "hoverTarjeta")
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
    contenedor.appendChild(tarjetaPersonaje)
    return tarjetaPersonaje
  }

  function seleccionJugadorUno(array) {
    let titulo = document.createElement("div")
    titulo.classList.add("titulo")
    titulo.innerHTML = `<h2> Jugador uno, elige tu campeón </h2><input id="filtroJugadorUno" placeholder="Filtra por clase/raza">`
    contenedor.appendChild(titulo)

    let contenedorTarjetas = document.createElement("div")
    contenedorTarjetas.classList.add("contenedorTarjetas")
    contenedor.appendChild(contenedorTarjetas)

    function filtrarPersonajes(array, filtro) {
      const filtroMin = filtro.toLowerCase()
      const personajesFiltrados = array.filter(personaje => {
        const clase = personaje.clase.toLowerCase()
        const raza = personaje.raza.toLowerCase()
        return clase.includes(filtroMin) || raza.includes(filtroMin)
      })
      return personajesFiltrados
    }

    function renderizarPersonajes(personajes, contenedor) {
      contenedor.innerHTML = ""

      personajes.forEach(personaje => {
        let tarjetaPersonaje = renderizar(personaje, contenedor);

        tarjetaPersonaje.addEventListener("click", () => {
          sessionStorage.setItem("jugadorUno", JSON.stringify(personaje))
          contenedorTarjetas.removeChild(tarjetaPersonaje)
          let nuevasTarjetas = array.filter(p => p !== personaje)

          ocultar(contenedorTarjetas)
          ocultar(titulo);
          seleccionJugadorDos(nuevasTarjetas)
        })
      })
    }

    let inputJugadorUno = document.getElementById("filtroJugadorUno")
    inputJugadorUno.addEventListener("input", () => {
      const filtro = inputJugadorUno.value
      const personajesFiltrados = filtrarPersonajes(array, filtro)
      renderizarPersonajes(personajesFiltrados, contenedorTarjetas)
    })

    renderizarPersonajes(array, contenedorTarjetas)
  }

  function seleccionJugadorDos(array) {
    let titulo = document.createElement("div")
    titulo.classList.add("titulo")
    titulo.innerHTML = `<h2> Jugador dos, elige tu campeón </h2><input id="filtroJugadorDos" placeholder="Filtra por clase/raza">`
    contenedor.appendChild(titulo)

    let contenedorTarjetas = document.createElement("div")
    contenedorTarjetas.classList.add("contenedorTarjetas")
    contenedor.appendChild(contenedorTarjetas)

    function filtrarPersonajes(array, filtro) {
      const filtroMin = filtro.toLowerCase()
      const personajesFiltrados = array.filter(personaje => {
        const clase = personaje.clase.toLowerCase()
        const raza = personaje.raza.toLowerCase()
        return clase.includes(filtroMin) || raza.includes(filtroMin)
      })
      return personajesFiltrados
    }

    function renderizarPersonajes(personajes, contenedor) {
      contenedor.innerHTML = ""

      personajes.forEach(personaje => {
        let tarjetaPersonaje = renderizar(personaje, contenedorTarjetas)

        tarjetaPersonaje.addEventListener("click", () => {
          sessionStorage.setItem("jugadorDos", JSON.stringify(personaje))
          batalla(JSON.parse(sessionStorage.getItem("jugadorUno")), personaje)
        })
      })
    }

    let inputJugadorDos = document.getElementById("filtroJugadorDos")
    inputJugadorDos.addEventListener("input", () => {
      const filtro = inputJugadorDos.value
      const personajesFiltrados = filtrarPersonajes(array, filtro)
      renderizarPersonajes(personajesFiltrados, contenedorTarjetas)
    })

    renderizarPersonajes(array, contenedorTarjetas)
  }

  function batalla(jugadorUno, jugadorDos) {
    contenedor.innerHTML = `
      <h2 class="inicioBatalla">¡COMIENZA LA BATALLA!</h2>
    `

    const h2 = document.querySelector('.inicioBatalla')

    h2.addEventListener('animationend', () => {
      ocultar(h2)

      const personajesSeleccionados = [
        jugadorUno,
        jugadorDos
      ]

      setTimeout(() => {
        contenedor.remove()
        let contenedorBatalla = document.getElementById("contenedorBatalla")
        let tituloUno = document.createElement("div")
        tituloUno.classList.add("tituloUno")
        let tituloDos = document.createElement("div")
        tituloDos.classList.add("tituloDos")
        let tarjetaUno = document.createElement("div")
        tarjetaUno.classList.add("tarjetaUno")
        let tarjetaDos = document.createElement("div")
        tarjetaDos.classList.add("tarjetaDos")
        let btnUno = document.createElement("div")
        btnUno.classList.add("btnUno")
        let btnDos = document.createElement("div")
        btnDos.classList.add("btnDos")
        let resultado = document.createElement("div")
        resultado.classList.add("resultado")

        contenedorBatalla.append(tituloUno, tituloDos, tarjetaUno, tarjetaDos, resultado, btnUno, btnDos)

        let tarjetaJugadorUno = renderizar(personajesSeleccionados[0], tarjetaUno)
        let tarjetaJugadorDos = renderizar(personajesSeleccionados[1], tarjetaDos)

        tarjetaJugadorUno.classList.remove("hoverTarjeta")
        tarjetaJugadorUno.classList.add("contenedorTarjeta")
        tarjetaJugadorDos.classList.remove("hoverTarjeta")
        tarjetaJugadorDos.classList.add("contenedorTarjeta")

        function realizarTurno(booleano) {
          if (booleano && jugadorUno.vida > 0) {
            mensajeBatalla(jugadorUno, tituloUno, btnUno);
            btnUno.querySelector(".btnAt").addEventListener("click", () => {
              batallaTurnos(jugadorUno, jugadorDos, tarjetaJugadorUno, tarjetaJugadorDos);
              // Verificar si el jugador dos perdió
              if (jugadorDos.vida <= 0) {
                // Mostrar mensaje de victoria del jugador uno
                ganador("¡Jugador uno ganó!")

              } else {
                // Cambiar turno al jugador dos
                ocultar(tituloUno);
                ocultar(btnUno);
                // Mostrar los elementos del jugador dos
                mostrar(tituloDos);
                mostrar(btnDos);
                realizarTurno(false);
              }
            });
          } else if (!booleano && jugadorDos.vida > 0) {
            mensajeBatalla(jugadorDos, tituloDos, btnDos);
            btnDos.querySelector(".btnAt").addEventListener("click", () => {
              batallaTurnos(jugadorDos, jugadorUno, tarjetaJugadorDos, tarjetaJugadorUno);
              // Verificar si el jugador uno perdió
              if (jugadorUno.vida <= 0) {
                // Mostrar mensaje de victoria del jugador dos
                ganador("¡Jugador dos ganó!")
              } else {
                // Cambiar turno al jugador uno
                ocultar(tituloDos);
                ocultar(btnDos);
                // Mostrar los elementos del jugador uno
                mostrar(tituloUno);
                mostrar(btnUno);
                realizarTurno(true);
              }
            });
          }
        }

        ocultar(tituloDos);
        ocultar(btnDos);
        realizarTurno(true);

      }, 500)
    })
  }

  function batallaTurnos(jugadorAt, jugadorDe, tarjetaJugadorAt, tarjetaJugadorDe) {
    const dado = lanzarDado()

    if (jugadorAt.clase === "Guerrero") {
      if (dado === 5 || dado === 10) {
        alert(`Jugador uno:\nHas sacado un ${dado} ¡Has fallado el golpe!`)
      } else {
        jugadorDe.vida -= jugadorAt.daño + dado
        if (jugadorDe.vida < 0) {
          jugadorDe.vida = 0
        }
        tarjetaJugadorDe.querySelector(".vidaTarjeta p").textContent = jugadorDe.vida
      }
    } else if (jugadorAt.clase === "Asesino") {
      if (dado % 2 !== 0) {
        jugadorDe.vida -= jugadorAt.daño * 3
        if (jugadorDe.vida < 0) {
          jugadorDe.vida = 0
        }
        tarjetaJugadorDe.querySelector(".vidaTarjeta p").textContent = jugadorDe.vida
      } else {
        jugadorDe.vida -= jugadorAt.daño
        if (jugadorDe.vida < 0) {
          jugadorDe.vida = 0
        }
        tarjetaJugadorDe.querySelector(".vidaTarjeta p").textContent = jugadorDe.vida
      }
    } else if (jugadorAt.clase === "Paladín") {
      if (dado === 2 || dado === 6 || dado === 10) {
        jugadorDe.vida -= jugadorAt.daño * 1.5 + dado
        if (jugadorDe.vida < 0) {
          jugadorDe.vida = 0
        }
        tarjetaJugadorDe.querySelector(".vidaTarjeta p").textContent = jugadorDe.vida
      } else {
        jugadorDe.vida -= jugadorAt.daño + dado
        if (jugadorDe.vida < 0) {
          jugadorDe.vida = 0
        }
        tarjetaJugadorDe.querySelector(".vidaTarjeta p").textContent = jugadorDe.vida
      }
    } else if (jugadorAt.clase === "Mago") {
      if (dado % 2 === 0) {
        jugadorDe.vida -= jugadorAt.daño * 2;
        if (jugadorDe.vida < 0) {
          jugadorDe.vida = 0
        }
        tarjetaJugadorDe.querySelector(".vidaTarjeta p").textContent = jugadorDe.vida
      } else {
        jugadorDe.vida -= jugadorAt.daño
        if (jugadorDe.vida < 0) {
          jugadorDe.vida = 0
        }
        tarjetaJugadorDe.querySelector(".vidaTarjeta p").textContent = jugadorDe.vida
      }
    } else if (jugadorAt.clase === "Druida") {
      if (dado % 2 === 0) {
        jugadorDe.vida -= jugadorAt.daño
        jugadorAt.vida += dado
        if (jugadorDe.vida < 0) {
          jugadorDe.vida = 0
        }
        tarjetaJugadorDe.querySelector(".vidaTarjeta p").textContent = jugadorDe.vida
        tarjetaJugadorAt.querySelector(".vidaTarjeta p").textContent = jugadorAt.vida
      } else {
        jugadorDe.vida -= jugadorAt.daño
        if (jugadorDe.vida < 0) {
          jugadorDe.vida = 0
        }
        tarjetaJugadorDe.querySelector(".vidaTarjeta p").textContent = jugadorDe.vida
      }
    }
  }

  function mensajeBatalla(jugador, contenedorTitulo, contenedorAccion) {
    contenedorTitulo.innerHTML = `<h2>Turno ${jugador.clase}</h2>`
    contenedorAccion.innerHTML = `<button class="btnAt">Atacar</button><button class="btnAb">Abandonar</button>`
  }

  function lanzarDado() {
    return Math.floor(Math.random() * 12) + 1
  }

  function ocultar(tag) {
    tag.classList.add("ocultar")
  }

  function mostrar(tag) {
    tag.classList.remove("ocultar")
  }

  function ganador(mensaje) {
    Swal.fire({
      title: mensaje,
      confirmButtonText: 'Jugar nuevamente',
      confirmButtonColor: '#D61C4E',
      background: '#333333',
      customClass: {
        title: 'sweetText',
      }
    })
  }


  seleccionJugadorUno(personajes)
}

miPrograma()
