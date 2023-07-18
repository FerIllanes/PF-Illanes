
function miPrograma() {

  let contenedorInicio = document.querySelector(".contenedorInicio")
  let contenedorSeleccion = document.querySelector(".contenedorSeleccion")

  function mostrarMenuPrincipal() {
    contenedorInicio.innerHTML = `
      <h2>BATALLA ÉPICA</h2>
      <hr>
      <h3>HEROES Y LEYENDAS</h3>
      <button class="btnJugar">JUGAR</button>
      <button class="btnInst">INSTRUCCIONES</button>`

    const botonJugar = document.querySelector(".btnJugar")
    botonJugar.addEventListener("click", () => {
      fetch("./db.json")
        .then(response => response.json())
        .then(data => seleccionJugadorUno(data.personajes))
        .catch(error => console.error('Error al obtener el archivo JSON:', error))
    })

    const botonInstrucciones = document.querySelector(".btnInst")
    botonInstrucciones.addEventListener("click", mostrarInstrucciones)
  }

  function mostrarInstrucciones() {
    Swal.fire({
      padding: '2rem',
      title: '"BATALLA ÉPICA" es un juego por turnos para 2 jugadores. Cada jugador selecciona un campeón, cada uno con su habilidad especial única. El combate se lleva a cabo lanzando un dado, donde cada campeón tiene características básicas y una habilidad especial que se activa al obtener ciertos números en el dado. El jugador que logre reducir la vida de su adversario a cero será el ganador de esta épica batalla.',
      confirmButtonColor: '#f25f4c',
      background: '#fffffe',
      customClass: {
        title: 'sweetTextIns',
      },
      html: '<div class="contenedorInst"><div><img class="imgInst" src="./img/dado.png" alt=""><p class="infoInst">DADO</p></div><div><img class="imgInst" src="./img/rubi.png" alt=""><p class="infoInst">VIDA BASE</p></div><div><img class="imgInst" src="./img/espada.png" alt=""><p class="infoInst">DAÑO BASE</p></div></div>',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    })
  }

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

  function filtrarPersonajes(array, filtro) {
    const filtroMin = filtro.toLowerCase()
    const personajesFiltrados = array.filter(personaje => {
      const clase = personaje.clase.toLowerCase()
      const raza = personaje.raza.toLowerCase()
      return clase.includes(filtroMin) || raza.includes(filtroMin)
    })
    return personajesFiltrados
  }
  
//EL PROBLEMA ESTA CUANDO FILTRAMOS EN EL INPUT E INVOCAMOS ESTA FUNCION, SE VACIA EL CONTENEDOR

  function renderizarPersonajes(array, contenedor, jugador, titulo) {
    contenedor.innerHTML = ""

    array.forEach(personaje => {
      let tarjetaPersonaje = renderizar(personaje, contenedor)
      tarjetaPersonaje.addEventListener("click", () => {
        jugador === "uno"
        ? (sessionStorage.setItem("jugadorUno", JSON.stringify(personaje)),
           contenedor.removeChild(tarjetaPersonaje),
           nuevasTarjetas = array.filter(p => p !== personaje),
           ocultar(contenedor),
           ocultar(titulo),
           seleccionJugadorDos(nuevasTarjetas))
        : (sessionStorage.setItem("jugadorDos", JSON.stringify(personaje)),
           batalla(JSON.parse(sessionStorage.getItem("jugadorUno")), personaje))
      })
    })
  }

  function seleccionJugadorUno(array) {
    mostrar(contenedorSeleccion)
    ocultar(contenedorInicio)

    let titulo = document.createElement("div")
    titulo.classList.add("titulo")
    titulo.innerHTML = `<h2> Jugador uno, elige tu campeón </h2><input id="filtroJugadorUno" placeholder="Filtra por clase/raza">`

    let contenedorTarjetas = document.createElement("div")
    contenedorTarjetas.classList.add("contenedorTarjetas")

    contenedorSeleccion.append(titulo, contenedorTarjetas)

    let inputJugadorUno = document.getElementById("filtroJugadorUno")
    inputJugadorUno.addEventListener("input", () => {
      const filtro = inputJugadorUno.value
      const personajesFiltrados = filtrarPersonajes(array, filtro)
      console.log(personajesFiltrados)
      renderizarPersonajes(personajesFiltrados, contenedorTarjetas, "uno", titulo)
    })

    renderizarPersonajes(array, contenedorTarjetas, "uno", titulo)
  }

  function seleccionJugadorDos(array) {

    let titulo = document.createElement("div")
    titulo.classList.add("titulo")
    titulo.innerHTML = `<h2> Jugador dos, elige tu campeón </h2><input id="filtroJugadorDos" placeholder="Filtra por clase/raza">`

    let contenedorTarjetas = document.createElement("div")
    contenedorTarjetas.classList.add("contenedorTarjetas")

    contenedorSeleccion.append(titulo, contenedorTarjetas)

    let inputJugadorDos = document.getElementById("filtroJugadorDos")
    inputJugadorDos.addEventListener("input", () => {
      const filtroDos = inputJugadorDos.value
      const personajesFiltradosDos = filtrarPersonajes(array, filtroDos)
      renderizarPersonajes(personajesFiltradosDos, contenedorTarjetas, "dos", titulo)
    })

    renderizarPersonajes(array, contenedorTarjetas, "dos", titulo)
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
        let contenedorBatalla = document.querySelector(".contenedorBatalla")
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
            mensajeBatalla(jugadorUno, tarjetaUno, tarjetaDos, tituloUno, btnUno, resultado)
            btnUno.querySelector(".btnAb").addEventListener("click", () => {
              ganador("¡Jugador dos ganó!")
            })
            resultado.querySelector(".dado").addEventListener("click", () => {
              batallaTurnos(jugadorUno, jugadorDos, tarjetaJugadorUno, tarjetaJugadorDos, resultado)
              // Verificar si el jugador dos perdió
              if (jugadorDos.vida <= 0) {
                // Mostrar mensaje de victoria del jugador uno
                ganador("¡Jugador uno ganó!")
              } else {
                setTimeout(() => {
                  ocultarTurno(tituloUno)
                  ocultarTurno(btnUno)
                  // Mostrar los elementos del jugador dos
                  mostrarTurno(tituloDos)
                  mostrarTurno(btnDos)
                  realizarTurno(false)
                }, 3000)
              }
            })
          } else if (!booleano && jugadorDos.vida > 0) {
            mensajeBatalla(jugadorDos, tarjetaDos, tarjetaUno, tituloDos, btnDos, resultado)
            btnDos.querySelector(".btnAb").addEventListener("click", () => {
              ganador("¡Jugador uno ganó!")
            })
            resultado.querySelector(".dado").addEventListener("click", () => {
              batallaTurnos(jugadorDos, jugadorUno, tarjetaJugadorDos, tarjetaJugadorUno, resultado)
              // Verificar si el jugador uno perdió
              if (jugadorUno.vida <= 0) {
                // Mostrar mensaje de victoria del jugador dos
                ganador("¡Jugador dos ganó!")
              } else {
                setTimeout(() => {
                  ocultarTurno(tituloDos)
                  ocultarTurno(btnDos)
                  // Mostrar los elementos del jugador uno
                  mostrarTurno(tituloUno)
                  mostrarTurno(btnUno)
                  realizarTurno(true)
                }, 3000)
              }
            })
          }
        }

        realizarTurno(true)


      }, 500)
    })
  }

  //FUNCION LA LOGICA DE DAÑO SEGUN LA CLASE
  function batallaTurnos(jugadorAt, jugadorDe, tarjetaJugadorAt, tarjetaJugadorDe, contenedor) {
    const dado = lanzarDado()
    if (jugadorAt.clase === "Guerrero") {
      if (dado === 5 || dado === 10) {
        contenedor.innerHTML = `
          <h2 class="resultadoDado">${dado}</h2>
          <h3 class="resultadoInfo">Has fallado el golpe</h3>`
      } else {
        jugadorDe.vida -= jugadorAt.daño + dado
        contenedor.innerHTML = `
          <h2 class="resultadoDado">${dado}</h2>
          <h3 class="resultadoInfo">Generas ${jugadorAt.daño + dado} de daño</h3>`
        if (jugadorDe.vida < 0) {
          jugadorDe.vida = 0
        }
        tarjetaJugadorDe.querySelector(".vidaTarjeta p").textContent = jugadorDe.vida
        tarjetaJugadorDe.classList.add("shake")
        setTimeout(() => {
          tarjetaJugadorDe.classList.remove("shake")
        }, 500)
      }
    } else if (jugadorAt.clase === "Asesino") {
      if (dado % 2 !== 0) {
        jugadorDe.vida -= jugadorAt.daño * 3
        contenedor.innerHTML = `
        <h2 class="resultadoDado">${dado}</h2>
        <h3 class="resultadoInfo">Apuñalas por ${jugadorAt.daño * 3} de daño</h3>`
        if (jugadorDe.vida < 0) {
          jugadorDe.vida = 0
        }
        tarjetaJugadorDe.querySelector(".vidaTarjeta p").textContent = jugadorDe.vida
        tarjetaJugadorDe.classList.add("shake")
        setTimeout(() => {
          tarjetaJugadorDe.classList.remove("shake")
        }, 500)
      } else {
        jugadorDe.vida -= jugadorAt.daño
        contenedor.innerHTML = `
          <h2 class="resultadoDado">${dado}</h2>
          <h3 class="resultadoInfo">Generas ${jugadorAt.daño} de daño</h3>`
        if (jugadorDe.vida < 0) {
          jugadorDe.vida = 0
        }
        tarjetaJugadorDe.querySelector(".vidaTarjeta p").textContent = jugadorDe.vida
        tarjetaJugadorDe.classList.add("shake")
        setTimeout(() => {
          tarjetaJugadorDe.classList.remove("shake")
        }, 500)
      }
    } else if (jugadorAt.clase === "Paladín") {
      if (dado === 2 || dado === 6 || dado === 12) {
        jugadorDe.vida -= jugadorAt.daño + 10
        contenedor.innerHTML = `
        <h2 class="resultadoDado">${dado}</h2>
        <h3 class="resultadoInfo">Ataque potenciado de ${jugadorAt.daño + 10} puntos</h3>`
        if (jugadorDe.vida < 0) {
          jugadorDe.vida = 0
        }
        tarjetaJugadorDe.querySelector(".vidaTarjeta p").textContent = jugadorDe.vida
        tarjetaJugadorDe.classList.add("shake")
        setTimeout(() => {
          tarjetaJugadorDe.classList.remove("shake")
        }, 500)
      } else {
        jugadorDe.vida -= jugadorAt.daño + dado
        contenedor.innerHTML = `
        <h2 class="resultadoDado">${dado}</h2>
        <h3 class="resultadoInfo">Generas ${jugadorAt.daño} de daño</h3>`
        if (jugadorDe.vida < 0) {
          jugadorDe.vida = 0
        }
        tarjetaJugadorDe.querySelector(".vidaTarjeta p").textContent = jugadorDe.vida
        tarjetaJugadorDe.classList.add("shake")
        setTimeout(() => {
          tarjetaJugadorDe.classList.remove("shake")
        }, 500)
      }
    } else if (jugadorAt.clase === "Mago") {
      if (dado % 2 === 0) {
        jugadorDe.vida -= jugadorAt.daño * 2
        contenedor.innerHTML = `
        <h2 class="resultadoDado">${dado}</h2>
        <h3 class="resultadoInfo">Daño magico de ${jugadorAt.daño * 2}</h3>`
        if (jugadorDe.vida < 0) {
          jugadorDe.vida = 0
        }
        tarjetaJugadorDe.querySelector(".vidaTarjeta p").textContent = jugadorDe.vida
        tarjetaJugadorDe.classList.add("shake")
        setTimeout(() => {
          tarjetaJugadorDe.classList.remove("shake")
        }, 500)
      } else {
        jugadorDe.vida -= jugadorAt.daño
        contenedor.innerHTML = `
        <h2 class="resultadoDado">${dado}</h2>
        <h3 class="resultadoInfo">Generas ${jugadorAt.daño} de daño</h3>`
        if (jugadorDe.vida < 0) {
          jugadorDe.vida = 0
        }
        tarjetaJugadorDe.querySelector(".vidaTarjeta p").textContent = jugadorDe.vida
        tarjetaJugadorDe.classList.add("shake")
        setTimeout(() => {
          tarjetaJugadorDe.classList.remove("shake")
        }, 500)
      }
    } else if (jugadorAt.clase === "Druida") {
      if (dado % 2 === 0) {
        jugadorDe.vida -= jugadorAt.daño
        jugadorAt.vida += jugadorAt.daño
        contenedor.innerHTML = `
        <h2 class="resultadoDado">${dado}</h2>
        <h3 class="resultadoInfo">Absorbes ${jugadorAt.daño} puntos de vida</h3>`
        if (jugadorDe.vida < 0) {
          jugadorDe.vida = 0
        }
        tarjetaJugadorDe.querySelector(".vidaTarjeta p").textContent = jugadorDe.vida
        tarjetaJugadorDe.classList.add("shake")
        setTimeout(() => {
          tarjetaJugadorDe.classList.remove("shake")
        }, 500)
        tarjetaJugadorAt.querySelector(".vidaTarjeta p").textContent = jugadorAt.vida
      } else {
        jugadorDe.vida -= jugadorAt.daño
        contenedor.innerHTML = `
        <h2 class="resultadoDado">${dado}</h2>
        <h3 class="resultadoInfo">Generas ${jugadorAt.daño} de daño</h3>`
        if (jugadorDe.vida < 0) {
          jugadorDe.vida = 0
        }
        tarjetaJugadorDe.querySelector(".vidaTarjeta p").textContent = jugadorDe.vida
        tarjetaJugadorDe.classList.add("shake")
        setTimeout(() => {
          tarjetaJugadorDe.classList.remove("shake")
        }, 500)
      }
    }
  }

  //FUNCION PARA MOSTRAR EL TURNO DEL JUGADOR
  function mensajeBatalla(jugador, fxAt, fxDe, contenedorTitulo, contenedorAccion, contenedorResultado) {
    fxAt.classList.add("fx")
    fxDe.classList.remove("fx")
    contenedorTitulo.innerHTML = `<h2>Turno ${jugador.clase}</h2>`
    contenedorAccion.innerHTML = `<button class="btnAb">Abandonar</button>`
    contenedorResultado.innerHTML = `<img class="dado" src="./img/dado.png" alt="">`
  }

  // FUNCION PARA LANZAR EL DADO
  function lanzarDado() {
    return Math.floor(Math.random() * 12) + 1
  }

  //FUNCIONES PARA QUITAR Y MOSTRAR ELEMENTOS
  function ocultar(tag) {
    tag.classList.add("ocultar")
  }

  function mostrar(tag) {
    tag.classList.remove("ocultar")
  }

  //FUNCIONES PARA TRANSICIONAR ENTRE TURNOS
  function ocultarTurno(tag) {
    tag.classList.remove("mostrarTurno")
    tag.classList.add("ocultarTurno")
  }

  function mostrarTurno(tag) {
    tag.classList.remove("ocultarTurno")
    tag.classList.add("mostrarTurno")
  }

  //FUNCION MENSAJE GANADOR
  function ganador(mensaje) {
    Swal.fire({
      title: mensaje,
      confirmButtonText: 'Jugar nuevamente',
      confirmButtonColor: '#f25f4c',
      background: '#a7a9bed3',
      customClass: {
        title: 'sweetText',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = 'index.html'
      }
    })
  }

  mostrarMenuPrincipal()

}

miPrograma()
