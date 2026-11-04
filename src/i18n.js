import en from './idiomas/en.json'

const textos = [...document.querySelectorAll('[data-i18n]')].map(el => ({
  el,
  clave: el.dataset.i18n,
  es: el.innerHTML
}))

const atributos = [...document.querySelectorAll('[data-i18n-attr]')].map(el => {
  const [attr, clave] = el.dataset.i18nAttr.split(':')
  return { el, attr, clave, es: el.getAttribute(attr) }
})

const boton = document.getElementById('idioma')

function aplicar(idioma) {
  const ingles = idioma === 'en'
  textos.forEach(({ el, clave, es }) => (el.innerHTML = (ingles && en[clave]) || es))
  atributos.forEach(({ el, attr, clave, es }) => el.setAttribute(attr, (ingles && en[clave]) || es))
  document.documentElement.lang = idioma
  boton.querySelector('span').textContent = ingles ? 'ES' : 'EN'
  boton.setAttribute('aria-label', ingles ? 'Cambiar a español' : 'Switch to English')
  localStorage.setItem('idioma', idioma)
}

export function iniciarIdioma() {
  const guardado = localStorage.getItem('idioma')
  const inicial = guardado ?? (navigator.language.startsWith('es') ? 'es' : 'en')
  aplicar(inicial)
  boton.addEventListener('click', () => aplicar(document.documentElement.lang === 'es' ? 'en' : 'es'))
}
