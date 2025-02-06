document.addEventListener('DOMContentLoaded', iniciarModal)
function iniciarModal() {
  //VOY A OBTENER LA IMG QUE ABRIRA EL MODAL//
  const openModalButton = document.getElementById('open-modal')

  if (!openModalButton) {
    console.error("Error: No se encontró el botón con id 'open-modal'")
    return
  }

  //creo el modal dinamicamente//
  const modal = document.createElement('div')
  modal.id = 'filter-modal'
  modal.className = 'modal'
  modal.innerHTML = `
    <div class='modal-content'>
        <span class='close'>&times;</span>
        <h2>Filtros</h2>
        <p>Selecciona un filtro</p>
        <button id='apply-filters'>Aplicar</button>
    </div>
`
  // Inserto el modal en el body//
  document.body.appendChild(modal)

  //obtengo el boton de cerrar dentro del modal
  const closeModalButton = modal.querySelector('.close')

  // Evento para abrir el modal al hacer clic en la imagen

  openModalButton.addEventListener('click', function () {
    modal.style.display = 'flex'
  })

  // Evento para cerrar el modal al hacer clic en "X"
  closeModalButton.addEventListener('click', function () {
    modal.style.display = 'none'
  })

  // Evento para cerrar el modal si el usuario hace clic fuera de él

  window.addEventListener('click', function (event) {
    if (event.target === modal) {
      modal.style.display = 'none'
    }
  })
}
