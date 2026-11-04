export function iniciarAparicion() {
  const observador = new IntersectionObserver(
    entradas => entradas.forEach(entrada => {
      if (!entrada.isIntersecting) return
      entrada.target.classList.add('visible')
      observador.unobserve(entrada.target)
    }),
    { threshold: 0.1, rootMargin: '0px 0px -8% 0px' }
  )

  document.querySelectorAll('.bloque').forEach(bloque => observador.observe(bloque))
}
