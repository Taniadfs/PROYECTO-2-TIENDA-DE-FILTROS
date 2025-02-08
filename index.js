document.addEventListener('DOMContentLoaded', iniciarModal)

function iniciarModal() {
  // OBTENER LA IMG QUE ABRIRA EL MODAL
  const openModalButton = document.getElementById('open-modal')

  // SI NO EXISTE EL BOTÓN, MOSTRAR ERROR Y SALIR
  if (!openModalButton) {
    console.error("❌ Error: No se encontró el botón con id 'open-modal'")
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

  // OBTENER EL BOTÓN DE CERRAR DENTRO DEL MODAL
  const closeModalButton = modal.querySelector('.close')

  // EVENTO PARA ABRIR EL MODAL AL HACER CLIC EN LA IMAGEN
  openModalButton.addEventListener('click', function () {
    modal.style.display = 'flex'
    mostrarFiltros() // Muestra los filtros dentro del modal
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
    opciones: ['Oro', 'Plata', 'Bañado en Oro']
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
