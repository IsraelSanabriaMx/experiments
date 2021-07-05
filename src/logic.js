// Esté objeto almacenara los parametros de busqueda
const options = {
  category: '',
  level: '',
  price: '',
  product: '',
};

// define el minimo de caracteres en el input para buscar
const MIN_LENGTH = 5;
// el valor de la tecla ENTER
const ENTER_KEY = 13;

const buildProducts = (results) => {
  let row = [];

  if (results.length > 0) {
    row = results.map((item) => (
      `<div class="product" onclick="showPanel('product', '` + item.name + `')">
         <img src="` + item.image + `" class="card_image_small"/>
         <label>` + item.name + `</label>
      </div>`
    ));
  }

  return row.join('');
};

const searchProducts = (type, params) => {
  showElement('results');
  showElement('products');

  // LLAMAR API
  // params: {
  //   type: type,
  //   category: params.category,
  //   level: params.level,
  //   price: params.price,
  // }
  // fetch('/mi-api/search', params).then((products) => {
  //    const build = buildRow(products);
  //    document.getElementById('products').innerHTML = build;
  //  });

  const products = [
    {
      id: 1,
      image: 'https://dictionary.cambridge.org/es/images/full/mobile_noun_002_23642.jpg?version=5.0.177',
      name: 'iphone'
    },
    {
      id: 2,
      image: 'https://dictionary.cambridge.org/es/images/full/mobile_noun_002_23642.jpg?version=5.0.177',
      name: 'samsung'
    },
    {
      id: 3,
      image: 'https://dictionary.cambridge.org/es/images/full/mobile_noun_002_23642.jpg?version=5.0.177',
      name: 'huawei'
    },
  ];

  const build = buildProducts(products);
  document.getElementById('products').innerHTML = build;
};

const buildRow = (results) => {
  let row = [];

  if (results.length > 0) {
    row = results.map((item) => (
      `<div class="card">
         <img src="` + item.image + `" class="card_image"/>
         <label>` + item.name + `</label>
         <label>` + item.storeName + `</label>
         <label>` + item.brandName + `</label>
         <a href="` + item.link + `" target="_blank">Link</a>
         <label>$` + item.price + `</label>
      </div>`
    ));
  }

  return row.join('');
};

// llamado al api para buscar
const search = (type, params) => {
  console.log(type, params);
  hideElement('products');
  // LLAMAR API
  // params: {
  //   type: type,
  //   product: params.product,
  // }
  // fetch('/mi-api/search', params).then((results) => {
  //    const build = buildRow(results);
  //    document.getElementById('comparator').innerHTML = build;
  //  });

  const results = [
    {
      id: 1,
      name: 'foo',
      image: 'https://dictionary.cambridge.org/es/images/full/mobile_noun_002_23642.jpg?version=5.0.177',
      storeName: 'WALMART',
      brandName: 'Iphone',
      link: 'https://dictionary.cambridge.org/es/diccionario/ingles/cell-phone',
      price: '250.00',
    },
    {
      id: 2,
      name: 'foo',
      image: 'https://dictionary.cambridge.org/es/images/full/mobile_noun_002_23642.jpg?version=5.0.177',
      storeName: 'COPPEL',
      brandName: 'Iphone',
      link: 'https://dictionary.cambridge.org/es/diccionario/ingles/cell-phone',
      price: '251.00',
    },
    {
      id: 3,
      name: 'foo',
      image: 'https://dictionary.cambridge.org/es/images/full/mobile_noun_002_23642.jpg?version=5.0.177',
      storeName: 'LA COMER',
      brandName: 'Iphone',
      link: 'https://dictionary.cambridge.org/es/diccionario/ingles/cell-phone',
      price: '252.00',
    },
  ];

  const build = buildRow(results);
  document.getElementById('comparator').innerHTML = build;
};

// agrega el estilo para mostrar
const showElement = (id) => {
  const e = document.getElementById(id);
  e.style.display = 'block';
};

// agrega el estilo para ocultar
const hideElement = (id) => {
  const e = document.getElementById(id);
  e.style.display = 'none';
};

// función para setear los parametros y mostrar el siguiente panel
const showPanel = (type, opt) => {
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
    searchProducts('options', options);
  }

  if (type === 'product') {
    hideElement('prices');
    search('options', options);
  }
};

// regresa a su valor inicial los parametros y comienza de nuevo
const resetSearch = () => {
  options.category = '';
  options.level = '';
  options.price = '';
  options.product = '';

  showElement('categories');
  hideElement('results');
  document.getElementById('comparator').innerHTML = '';
};

const getInputValue = () => {
  const param = document.getElementById('search_text').value;

  return param.trim();
};

// obtine el valor del input y si cumple la longitud minima llama la busqueda
const callSearchFn = (type) => {
  const param = getInputValue();
  if (param.length >= MIN_LENGTH) {
    showElement('results');
    search(type, param);
  } else {
    alert('Agrega más caracteres y vuelve a intentarlo');
  }
};

// cada que teclea en el input valida si da enter y llama a la busqueda si cumple con la longitud minima
const callSearch = (e) => {
  if (e.keyCode === ENTER_KEY) {
    callSearchFn('text')
  }
};
