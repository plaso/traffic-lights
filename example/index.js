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
    this.paused = false

    // Selectores que me van a hacer falta
    this.lightsEls = document.querySelectorAll('.light')
    this.statusEl = document.getElementById('status')
    this.countdownEl = document.getElementById('countdown')
    this.startBtn = document.getElementById('start-btn')
    this.nextBtn = document.getElementById('next-btn')
    this.resetBtn = document.getElementById('reset-btn')
    this.conditionalBtns = document.querySelectorAll('.conditional-btn')

    // Atributos y selectores del toast
    this.toastTimeoutId = null
    this.toastEl = document.getElementById('toast')
    this.toastMessageEl = document.getElementById('toast-message')
    this.toastBtnEl = document.getElementById('close-toast')
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
      if (light.classList.contains(phase.color) && (this.isRunning() || this.paused)) { // Le pregunto si eres la clase actual que esta activa
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
    if (this.isRunning()) {
      return
    }
    // Va a poner el intervalo de gestion cada segundo
    this.intervalId = setInterval(() => {
      this.paused = false
      this.elapsed++

      // Si le dejo me pasara el cambia a... a numeros negativos, vamos a controlarlo y cuando llegue a cero paso a la siguiente fase
      if (this.elapsed >= this.currentPhase().duration) {
        this.next()
      }

      this.render()
    }, 1000)

    this.render()
    this.notify(this.currentPhase().message)
    this.conditionalBtns.forEach((btn) => {
      btn.classList.add('show')
    })
  }

  next() {
    this.index = (this.index + 1) % this.phases.length // Para resetear al index 0
    this.elapsed = 0
    this.render()


    // Toast con mensaje
    this.notify(this.currentPhase().message)
  }

  stop() {
    clearInterval(this.intervalId)
    this.intervalId = null
    this.paused = true
    this.render()
  }

  toggle() {
    if (this.isRunning()) {
      this.stop()
    } else {
      this.start()
    }
  }

  reset() {
    this.index = 0
    this.elapsed = 0
    this.stop()
    this.paused = false
    this.conditionalBtns.forEach(btn => {
      btn.classList.remove('show')
    })

    if (this.toastTimeoutId !== null) {
      this.hideToast()
    }

    this.render()
  }

  setUpListeners() {
    this.startBtn.addEventListener('click', () => {
      this.toggle()
    })
    this.nextBtn.addEventListener('click', () => {
      this.next()
    })
    this.resetBtn.addEventListener('click', () => {
      this.reset()
    })
    this.toastBtnEl.addEventListener('click', () => {
      this.hideToast()
    })
  }

  notify(message) {
    clearTimeout(this.toastTimeoutId)

    this.toastMessageEl.textContent = message
    this.toastEl.classList.add('show')

    this.toastTimeoutId = setTimeout(() => {
      this.hideToast()
    }, 3000);
  }

  hideToast() {
    clearTimeout(this.toastTimeoutId)
    this.toastEl.classList.remove('show')
  }
}

const trafficLight = new TrafficLight(phases)
trafficLight.setUpListeners()

