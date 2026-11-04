export function iniciarRuta() {
  const ruta = document.querySelector('.ruta')
  const raiz = document.documentElement

  const actualizar = () => {
    const maximo = raiz.scrollHeight - innerHeight
    const avance = maximo > 0 ? scrollY / maximo : 0
    ruta.style.setProperty('--avance', `${(avance * 100).toFixed(1)}%`)
  }

  addEventListener('scroll', actualizar, { passive: true })
  addEventListener('resize', actualizar)
  actualizar()
}
