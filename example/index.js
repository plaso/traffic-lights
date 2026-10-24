class Phase {
  constructor(color, message, duration) {
    this.color = color
    this.message = message
    this.duration = duration
  }
}

const phases = [
  new Phase('red', 'Rojo: espera', 5),
  new Phase('green', 'Verde: puedes cruzar', 4),
  new Phase('amber', 'Ámbar: ¡date prisa!', 2)
]

// Semaforo

class TrafficLight {
  constructor(phases) {
    // Atributos de informacion
    this.phases = phases // la info de las phases
    this.index = 0 // en cual empiezo
    this.elapsed = 0 // tiempo en la fase actual 1,2,3,4,5 - reset a 0 porque cambio de fase
    this.intervalId = null // el id del futuro setInterval, le pongo null para saber que el intervalo esta parado

    // Selectores que me van a hacer falta
    this.lightsEls = document.querySelectorAll('.light')
    this.statusEl = document.getElementById('status')
    this.countdownEl = document.getElementById('countdown')
    this.startBtn = document.getElementById('start-btn')
  }

  currentPhase() {
    return this.phases[this.index]
  }

  isRunning() {
    return this.intervalId !== null
  }

  render() {
    const phase = this.currentPhase()

    this.lightsEls.forEach((light) => {
      if (light.classList.contains(phase.color)) { // Le pregunto si eres la clase actual que esta activa
        light.classList.add('on')
      } else {
        light.classList.remove('on')
      }
    })

    this.statusEl.textContent = this.isRunning() ? phase.message : 'En pausa'
    this.countdownEl.textContent = this.isRunning() ? `Cambia en ${phase.duration - this.elapsed} s` : ''
    this.startBtn.textContent = this.isRunning() ? '⏸ Pausa' : '▶ Encender'
  }

  start() {
    // Va a poner el intervalo de gestion cada segundo
    this.intervalId = setInterval(() => {
      this.elapsed++

      // Si le dejo me pasara el cambia a... a numeros negativos, vamos a controlarlo y cuando llegue a cero paso a la siguiente fase
      if (this.elapsed >= this.currentPhase().duration) {
        this.next()
      }

      this.render()
    }, 1000)

    this.render()
  }

  next() {
    this.index = (this.index + 1) % this.phases.length // Para resetear al index 0
    this.elapsed = 0
  }
}

const trafficLight = new TrafficLight(phases)
trafficLight.start()

