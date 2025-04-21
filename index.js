/** Array Lista de PRODUCTOS**/
const listaProductos = [
  {
    id: 1,
    nombre: 'The tear',
    categoria: 'Collares',
    precio: 100,
    material: 'Oro',
    ocasion: 'Casual',
    imagen: 'assets/IMG_8177.jpg'
  },
  {
    id: 2,
    nombre: 'Camille ring',
    categoria: 'Anillos',
    precio: 48,
    material: 'Bañado en Oro',
    ocasion: 'Casual',
    imagen: 'assets/Cammille ring.jpg'
  },
  {
    id: 3,
    nombre: 'Collar Ova',
    categoria: 'Collares',
    precio: 130,
    material: 'Oro',
    ocasion: 'Casual',
    imagen: 'assets/IMG_2996.jpg'
  },
  {
    id: 4,
    nombre: 'Esmeralda collar',
    categoria: 'Collares',
    precio: 130,
    material: 'Oro',
    ocasion: 'Boda',
    imagen: 'assets/360C8667-D869-4A5F-A27A-4C747210B4A3.JPG'
  },
  {
    id: 5,
    nombre: 'Flat ring',
    categoria: 'Anillos',
    precio: 70,
    material: 'Bañado en Oro',
    ocasion: 'Especial',
    imagen: 'assets/flat.jpg'
  },

  {
    id: 6,
    nombre: 'Camille ears',
    categoria: 'Pendientes',
    precio: 120,
    material: 'Oro',
    ocasion: 'Especial',
    imagen: 'assets/IMG_0526.JPG'
  }
]
// FUNCION MOSTRAR LOS PRODUCTOS
function mostrarProductos(productos) {
  const contenedor = document.getElementById('container-productos')

  contenedor.innerHTML = '' //  Limpiar el contenedor antes de agregar productos

  productos.forEach((producto) => {
    const productoDiv = document.createElement('div')
    productoDiv.classList.add('producto')

    productoDiv.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-img">
      <h3>${producto.nombre}</h3>
      <p><strong>Categoría:</strong> ${producto.categoria}</p>
      <p><strong>Precio:</strong> ${producto.precio}€</p>
      <p><strong>Material:</strong> ${producto.material}</p>
      <p><strong>Ocasión:</strong> ${producto.ocasion}</p>
    `

    contenedor.appendChild(productoDiv)
  })

  console.log(`✅ Se han mostrado ${productos.length} productos en la página.`)
  console.log(listaProductos.map((p) => Object.keys(p)))
}
document.addEventListener('DOMContentLoaded', function () {
  console.log('El DOM ha cargado completamente.')
})

function crearModalFiltros() {
  const modal = document.createElement('div')
  modal.id = 'modal-filtros'
  modal.classList.add('modal', 'oculto')

  modal.innerHTML = `
  <div class="modal-contenido">
  <span id = "cerrar-modal" class="cerrar">&times;</span>
  <h2>Filtrar productos</h2>
  <form id="form-filtros">
  <label for="categoria">Categoria:</label>
  <select id="categoria" name="categoria">
  <option value="">Todas</option>
  <option value="Anillos">Anillos</option>
  <option value="Collares">Collares</option>
  <option value="Pendientes">Pendientes</option>
    <option value="Pulseras">Pulseras</option>
  </select>

  <label for="material">Material:</label>
  <select id="material" name="material">
  <option value="">Todos</option>
  <option value="Oro">Oro</option>
  <option value="Bañado en Oro">Bañado en Oro</option>
   <option value="Plata">Plata</option>
      </select>

  <label for="precio">Precio:</label>
  <select id="precio" name="precio">
  <option value="">Todos</option>
  <option value="300€">300€</option>
  <option value="130€">130€</option>
  <option value="100€">100€</option>
  <option value="48€">48€</option>
  
      </select>

  <label for="ocasion">Ocasión:</label>
  <select id="ocasion" name="ocasion">
  <option value="">Todas</option>
  <option value="Casual">Casual</option>
  <option value="Especial">Especial</option>
  <option value="Boda">Boda</option>
    <option value="Festivo">Festivo</option>

  </select>   

  <button type="submit">Aplicar filtros</button>
  <button type="button" id="limpiar-filtros">Limpiar filtros</button></form>
  </div>
  `

  document.body.appendChild(modal)
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('El DOM ha cargado correctamente')
  // Mostrar los productos en la página al cargar
  mostrarProductos(listaProductos)

  const mensaje = document.getElementById('mensaje-filtros')
  mensaje.style.display = 'none'
  // Crear el modal dinamicamente
  crearModalFiltros()
  const formFiltros = document.getElementById('form-filtros')
  const selectCategoria = document.getElementById('categoria')
  const selectMaterial = document.getElementById('material')
  const selectOcasion = document.getElementById('ocasion')
  const selectPrecio = document.getElementById('precio')
  const btnAbrir = document.getElementById('open-modal')
  const modal = document.getElementById('modal-filtros')
  const btnCerrar = document.getElementById('cerrar-modal')
  const btnLimpiar = document.getElementById('limpiar-filtros')
  const modalFiltros = document.getElementById('modal-filtros')
  const mensajeFiltros = document.getElementById('mensaje-filtros')

  btnAbrir.addEventListener('click', () => {
    modal.classList.remove('oculto')
  })

  btnCerrar.addEventListener('click', () => {
    modal.classList.add('oculto')
  })

  formFiltros.addEventListener('submit', (e) => {
    e.preventDefault()

    const categoriaSeleccionada = selectCategoria.value
    const materialSeleccionado = selectMaterial.value
    const ocasionSeleccionada = selectOcasion.value
    const precioSeleccionado = selectPrecio.value

    let filtrosAplicados = 0

    if (categoriaSeleccionada) filtrosAplicados++
    if (materialSeleccionado) filtrosAplicados++
    if (ocasionSeleccionada) filtrosAplicados++
    if (precioSeleccionado) filtrosAplicados++

    if (filtrosAplicados < 2) {
      alert('Por favor, selecciona al menos dos filtros.')
      return
    }

    const filtrados = listaProductos.filter((producto) => {
      let coincidencias = 0

      if (categoriaSeleccionada && producto.categoria === categoriaSeleccionada)
        coincidencias++
      if (materialSeleccionado && producto.material === materialSeleccionado)
        coincidencias++
      if (ocasionSeleccionada && producto.ocasion === ocasionSeleccionada)
        coincidencias++
      if (
        precioSeleccionado &&
        producto.precio === parseInt(precioSeleccionado)
      )
        coincidencias++

      console.log('Comparando:', {
        categoriaSeleccionada,
        productoCategoria: producto.categoria
      })

      return coincidencias === filtrosAplicados
    })
    const mensaje = document.getElementById('mensaje-filtros')

    if (filtrados.length > 0) {
      mensaje.style.display = 'none' //  OCULTAR el mensaje
      mostrarProductos(filtrados)
    } else {
      mensaje.style.display = 'block' //  MOSTRAR el mensaje cuando haya sugerencias
      mostrarSugerencias()
    }

    modal.classList.add('oculto')
  })
  btnLimpiar.addEventListener('click', (e) => {
    e.preventDefault()

    selectCategoria.value = ''
    selectMaterial.value = ''
    selectOcasion.value = ''
    selectPrecio.value = ''

    mensajeFiltros.style.display = 'none'
    modalFiltros.classList.add('oculto')
    mostrarProductos(listaProductos)
  })
})
function mostrarSugerencias() {
  const mensaje = document.getElementById('mensaje-filtros')

  mensaje.textContent =
    'No se encontraron coincidencias. Mira estas sugerencias:'

  const sugerencias = []

  while (sugerencias.length < 3) {
    const aleatorio =
      listaProductos[Math.floor(Math.random() * listaProductos.length)]
    if (!sugerencias.includes(aleatorio)) {
      sugerencias.push(aleatorio)
    }
  }

  // Mostramos las sugerencias justo después del mensaje
  mostrarProductos(sugerencias)
}
