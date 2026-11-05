const suavizar = t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

let cuadro = 0

function distanciaAlTope(elemento) {
  let distancia = 0
  for (let nodo = elemento; nodo; nodo = nodo.offsetParent) distancia += nodo.offsetTop
  return distancia
}

function duracion() {
  return matchMedia('(prefers-reduced-motion: reduce)').matches ? 500 : 900
}

function cancelar() {
  cancelAnimationFrame(cuadro)
}

function ir(destino) {
  cancelar()
  const raiz = document.documentElement
  const margen = parseFloat(getComputedStyle(raiz).scrollPaddingTop) || 0
  const inicio = scrollY
  const ms = duracion()
  const arranque = performance.now()

  const posicionFinal = () => {
    const tope = raiz.scrollHeight - innerHeight
    return Math.min(distanciaAlTope(destino) - margen, tope)
  }

  const paso = ahora => {
    const avance = Math.min((ahora - arranque) / ms, 1)
    scrollTo(0, inicio + (posicionFinal() - inicio) * suavizar(avance))
    if (avance < 1) {
      cuadro = requestAnimationFrame(paso)
    } else {
      destino.focus({ preventScroll: true })
    }
  }

  cuadro = requestAnimationFrame(paso)
}

export function iniciarDesplazamiento() {
  addEventListener('wheel', cancelar, { passive: true })
  addEventListener('touchstart', cancelar, { passive: true })
  addEventListener('keydown', cancelar)

  document.querySelectorAll('a[href^="#"]').forEach(enlace => {
    const destino = document.querySelector(enlace.getAttribute('href'))
    if (!destino) return
    destino.setAttribute('tabindex', '-1')
    enlace.addEventListener('click', evento => {
      evento.preventDefault()
      history.pushState(null, '', enlace.getAttribute('href'))
      ir(destino)
    })
  })
}
