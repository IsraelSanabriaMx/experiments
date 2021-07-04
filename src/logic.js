// Esté objeto almacenara los parametros de busqueda
const options = {
  category: '',
  level: '',
  price: '',
};

// define el minimo de caracteres en el input para buscar
const MIN_LENGTH = 5;
// el valor de la tecla ENTER
const ENTER_KEY = 13;

// TODO:
// llamado al api para buscar
function search(type, params) {
  console.log(type, params);
  showElement('results');
}

// agrega el estilo para mostrar
function showElement(id) {
  const e = document.getElementById(id);
  e.style.display = 'block';
}

// agrega el estilo para ocultar
function hideElement(id) {
  const e = document.getElementById(id);
  e.style.display = 'none';
}

// función para setear los parametros y mostrar el siguiente panel
function showPanel(type, opt) {
  // asigna el valor en su indice correspondiente
  // ejemplo: donde type es igual a 'category'
  // hace esto options['category'] = 'celular'
  options[type] = opt;

  // cuando se le da clic desde el panel de categories
  if (type === 'category') {
    hideElement('categories');

    if (opt === 'celular') {
      // debe mostrar el panel de levels
      showElement('levels');
    } else {
      // debe mostrar el panel de prices
      showElement('prices');
    }
  }

  // cuando se le da clic desde el panel de levels
  if (type === 'level') {
    // debe mostrar el panel de prices
    showElement('prices');
    hideElement('levels');
  }

  // cuando se le da clic desde el panel de prices
  if (type === 'price') {
    // llama al api para consultar con los parametros
    hideElement('prices');
    search('options', options);
  }
}

// regresa a su valor inicial los parametros y comienza de nuevo
function resetSearch() {
  options.category = '';
  options.level = '';
  options.price = '';

  showElement('categories');
  hideElement('results');
}

function getInputValue() {
  const param = document.getElementById('search_text').value;

  return param.trim();
}

// obtine el valor del input y si cumple la longitud minima llama la busqueda
function callSearchFn(type) {
  const param = getInputValue();
  if (param.length >= MIN_LENGTH) {
    search(type, param);
  } else {
    alert('Agrega más caracteres y vuelve a intentarlo');
  }
}

// cada que teclea en el input valida si da enter y llama a la busqueda si cumple con la longitud minima
function callSearch(e) {
  if (e.keyCode === 13) {
    callSearchFn('text')
  }
}
