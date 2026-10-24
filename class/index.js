// console.log('Pido la pizza')

// setTimeout(() => {
//   console.log('LLego la pizza')
// }, 5 * 1000) // ms segundos * 1000
// setTimeout(() => {
//   console.log('LLego la pizza 2')
// }, 4 * 1000) // ms segundos * 1000


// console.log('Friego los platos de la comida')

console.log('Borrando cancion...')

function deleteSong() { // me devuelve un id
  console.log('Cancion borrada para siempre')
}

const deleteId = setTimeout(deleteSong, 7000)

function stopDelete(id) {
  clearTimeout(id)
  console.log('Deshaciendo borrado')
}

const cancelDeleteBtn = document.getElementById('cancel-delete')

cancelDeleteBtn.onclick = () => {
  stopDelete(deleteId)
}

// SET INTERVAL

const stop = document.getElementById('stop')

let second = 0

console.log('segundo:', second)

const intervalId = setInterval(() => {
  second++
  console.log('segundo:', second)

  if (second >= 50) {
    clearInterval(intervalId)
  }
}, 100)

stop.addEventListener('click', () => {
  clearInterval(intervalId)
  console.log('Pausado')
})

// const obj = {
//   name: 'pepe',
//   set: function () {
//     setInterval(() => {
//       console.log(this)
//     }, 100)
//   }
// }

// obj.set()