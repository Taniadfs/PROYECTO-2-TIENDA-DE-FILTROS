document.addEventListener('DOMContentLoaded', iniciarModal)

function iniciarModal() {
  // OBTENER LA IMG QUE ABRIRA EL MODAL
  const openModalButton = document.getElementById('open-modal')

  // SI NO EXISTE EL BOTÓN, MOSTRAR ERROR Y SALIR
  if (!openModalButton) {
    console.error(" No se encontró el botón con id 'open-modal'")
    return
  }

  // CREO EL MODAL DINÁMICAMENTE
  const modal = document.createElement('div')
  modal.id = 'filter-modal'
  modal.className = 'modal'
  modal.innerHTML = `
    <div class='modal-content'>
        <span class='close'>&times;</span>

        <p>Selecciona un filtro</p>
        <div id='filters-container'></div>
        <button id='apply-filters'>Aplicar</button>
    </div>
  `

  // INSERTO EL MODAL EN EL BODY
  document.body.appendChild(modal)

  const applyFiltersButton = document.getElementById('apply-filters')

  if (applyFiltersButton) {
    applyFiltersButton.addEventListener('click', aplicarFiltros)
  } else {
    console.error('error: no se encontro el boton aplicar filtros')
  }

  // OBTENER EL BOTÓN DE CERRAR DENTRO DEL MODAL
  const closeModalButton = modal.querySelector('.close')

  modal.style.display = 'none'

  // EVENTO PARA ABRIR EL MODAL AL HACER CLIC EN LA IMAGEN
  openModalButton.addEventListener('click', function () {
    mostrarFiltros((modal.style.display = 'flex')) // Muestra los filtros dentro del modal
  })

  // EVENTO PARA CERRAR EL MODAL AL HACER CLIC EN "X"
  closeModalButton.addEventListener('click', function () {
    modal.style.display = 'none'
  })

  // EVENTO PARA CERRAR EL MODAL SI EL USUARIO HACE CLIC FUERA DE ÉL
  window.addEventListener('click', function (event) {
    if (event.target === modal) {
      modal.style.display = 'none'
    }
  })
}

// ARRAY DE FILTROS
const filtros = [
  {
    id: 'categoria',
    nombre: 'Categoria',
    opciones: ['Anillos', 'Collares', 'Pendientes', 'Pulseras']
  },
  {
    id: 'precio',
    nombre: 'Rango de precio',
    opciones: ['Menos de 50€', '50€ - 100€', 'Más de 100€']
  },
  {
    id: 'material',
    nombre: 'Material',
    opciones: ['Oro', 'Plata', 'Banado en Oro']
  },
  {
    id: 'ocasion',
    nombre: 'Ocasion',
    opciones: ['Casual', 'Especial', 'Boda']
  }
]

/*FUNCIÓN PARA MOSTRAR LOS FILTROS DENTRO DEL MODAL*/
function mostrarFiltros() {
  const filtersContainer = document.getElementById('filters-container')

  // SI NO SE ENCUENTRA EL CONTENEDOR, MOSTRAR ERROR Y SALIR
  if (!filtersContainer) {
    console.error(
      ' Error: No se encontró el contenedor de filtros (`#filters-container`).'
    )
    return
  }

  // LIMPIAR EL CONTENIDO ANTERIOR DE LOS FILTROS
  filtersContainer.innerHTML = ''

  // RECORRER EL ARRAY DE FILTROS Y CREAR LOS ELEMENTOS
  for (let i = 0; i < filtros.length; i++) {
    const filtro = filtros[i]

    // CREAR EL CONTENEDOR DEL FILTRO
    const filterDiv = document.createElement('div')
    filterDiv.classList.add('filter')

    // CREAR EL TÍTULO DEL FILTRO
    const filterTitle = document.createElement('h3')
    filterTitle.textContent = filtro.nombre
    filterDiv.appendChild(filterTitle)

    // CREAR EL SELECT PARA LAS OPCIONES DEL FILTRO
    const select = document.createElement('select')
    select.id = filtro.id

    // AGREGAR LAS OPCIONES AL SELECT
    for (let j = 0; j < filtro.opciones.length; j++) {
      const option = document.createElement('option')
      option.value = filtro.opciones[j]
      option.textContent = filtro.opciones[j]
      select.appendChild(option)
    }

    // AGREGAR EL SELECT AL CONTENEDOR DEL FILTRO
    filterDiv.appendChild(select)
    // AGREGAR EL FILTRO COMPLETO AL `filters-container`
    filtersContainer.appendChild(filterDiv)
  }

  console.log('✅ Filtros agregados al modal correctamente.')
}

/*AQUI TENGO QUE PONER LA FUNCION APLICAR filtros*/

function aplicarFiltros() {
  console.log('aplicando fltros')

  const categoriaSeleccionada = document.getElementById('categoria').value
  const precioSeleccionado = document.getElementById('precio').value
  const materialSeleccionado = document.getElementById('material').value
  const ocasionSeleccionada = document.getElementById('ocasion').value

  console.log(
    `categoria: ${categoriaSeleccionada}, Precio ${precioSeleccionado}, Material ${materialSeleccionado}, Ocasion ${ocasionSeleccionada}`
  )

  const productosFiltrados = listaProductos.filter((producto) => {
    return (
      (categoriaSeleccionada === '' ||
        producto.categoria === categoriaSeleccionada) &&
      (precioSeleccionado === '' ||
        filtrarPorPrecio(producto.precio, precioSeleccionado)) &&
      (materialSeleccionado === '' ||
        producto.material === materialSeleccionado) &&
      (ocasionSeleccionada === '' || producto.ocasion === ocasionSeleccionada)
    )
  })

  pintarProductos(productosFiltrados)
  console.log(
    `Se han encontrado ${productosFiltrados.length} productosFiltrados. `
  )
}

/*AQUI FILTRAR POR precio*/

function filtrarPorPrecio(precioProducto, precioSeleccionado) {
  if (precioSeleccionado === 'Menos de 50€') {
    return precioProducto < 50
  }
  if (precioSeleccionado === '50€ - 100€') {
    return precioProducto >= 50 && precioProducto <= 100
  }
  if (precioSeleccionado === 'Mas de 100€') {
    return precioProducto < 100
  }
  return true
}
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
    precio: 90,
    material: 'Plata',
    ocasion: 'Especial',
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
    precio: 90,
    material: 'Bañado en Oro',
    ocasion: 'Casual',
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
  },
  {
    id: 7,
    nombre: 'The luck collar',
    categoria: 'Bañado en Oro',
    precio: 55,
    material: 'Oro',
    ocasion: 'Casual',
    imagen: 'assets/Luck collar.jpg'
  },
  {
    id: 8,
    nombre: 'The ligth ring',
    categoria: 'Anillos',
    precio: 70,
    material: 'Bañado en Oro',
    ocasion: 'Especial',
    imagen: 'assets/7BAB544C-1C76-4241-80D7-CB719BC79872.JPG'
  }
]

let contenedorProductos = document.getElementById('productos-container')

function pintarProductos(listaProductos) {
  // ASEGURARSE QUE EL CONTENEDOR EXISTE
  if (!contenedorProductos) {
    console.error(
      "No se encontró el contenedor de productos ('#productos-container')"
    )
    return
  }

  contenedorProductos.innerHTML = '' // LIMPIAR CONTENIDO ANTERIOR

  listaProductos.forEach((producto) => {
    const productoDiv = document.createElement('div')
    productoDiv.classList.add('producto')

    productoDiv.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-img">
      <h3 class="titulo-producto">${producto.nombre}</h3>
      <p><strong>Categoria:</strong> ${producto.categoria}</p>
      <p><strong>Precio:</strong> ${producto.precio}€</p>
      <p><strong>Material:</strong> ${producto.material}</p>
      <p><strong>Ocasion:</strong> ${producto.ocasion}</p>
    `

    contenedorProductos.appendChild(productoDiv)
  })

  console.log('✅ Productos agregados correctamente.')
}

// MOSTRAR LOS PRODUCTOS AL INICIO
pintarProductos(listaProductos)
