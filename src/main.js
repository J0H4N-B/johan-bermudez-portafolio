import 'bootstrap/dist/css/bootstrap.min.css'
import 'boxicons/css/boxicons.min.css'
import './styles/main.css'
import Collapse from 'bootstrap/js/dist/collapse'
import { iniciarIdioma } from './i18n.js'
import { iniciarRuta } from './ruta.js'

document.getElementById("anio").textContent = new Date().getFullYear()
iniciarIdioma()
iniciarRuta()

const menu = document.getElementById('menu')
menu.querySelectorAll('.nav-link').forEach(enlace =>
  enlace.addEventListener('click', () => Collapse.getOrCreateInstance(menu, { toggle: false }).hide())
)
