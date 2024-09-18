// === configuratii globale si interactiuni cu local storage ===
const GLOBAL_CONFIG = {
  productsPerPage: 20,
  order: 'asc'
};

let useLocalStorage = false;

const arrayCosProduseSalvat = JSON.parse(localStorage.getItem('cart')) || [];
const arrayCosProduse = arrayCosProduseSalvat;


// === functii care descriu cum se printeaza produsele in lista de produse===
const printeazaUnProdus = function (produs) {
  const _listaProduse = document.querySelector(".listaProduse");
  const _unProdus = document.createElement("div");
  _unProdus.classList.add('unProdus');
  _listaProduse.appendChild(_unProdus);

  _unProdus.innerHTML =
    `<img src="${produs.image}" alt="${produs.title}" />
     <h4>${produs.title}</h4>
     <p>Price: $${produs.price}</p>
     <div class="unProdusInfo">
       <p>${produs.description}</p>
     </div>
    <button>Adauga in Cos</button>`;

  const butonAdaugare = _unProdus.querySelector('button');
  butonAdaugare.addEventListener('click', function () {
    adaugaInCos(produs);
  });
};

const printeazaToateProdusele = (produseStoc) => {
  const _listaProduse = document.querySelector(".listaProduse");
  _listaProduse.innerHTML = '';

  produseStoc.forEach((produs) => printeazaUnProdus(produs));
};


// === functie pod intre lista de produse ui, cos produse ui si local storage ===
function adaugaInCos(produs) {
  const cosDinLocalStorage = JSON.parse(localStorage.getItem('cart')) || [];
  const index = cosDinLocalStorage.findIndex(item => item.id === produs.id);
  
  if (index > -1) { 
    cosDinLocalStorage[index].count = (cosDinLocalStorage[index].count || 1) + 1;
  } else {
    produs.count = 1;
    cosDinLocalStorage.push(produs);
  }
  
  localStorage.setItem('cart', JSON.stringify(cosDinLocalStorage));
  produseInCos(cosDinLocalStorage);
}


// === functiipentru cart ===
function produsInCos(produsPrintat) {
  const _cosProduse = document.querySelector(".cosProduse");
  const _unProdusCos = document.createElement("div");
  _unProdusCos.classList.add('unProdusCos');
  _cosProduse.appendChild(_unProdusCos);

  _unProdusCos.innerHTML =                                        
  `<div>
    <img src="${produsPrintat.image}" />
  </div>
  <div>
    <h4>${produsPrintat.title}</h4>
    <div class="modificariInCos">
      <button class="buttonMinus">-</button>
      <span>${produsPrintat.count}</span>
      <button class="buttonPlus">+</button>
    </div>
    <span>Pret: $${produsPrintat.count * produsPrintat.price}</span> </br>
    <button class="stergeProdus">Sterge</button>
  </div>`;

  const _buttonMinus = _unProdusCos.querySelector('.buttonMinus');
  const _buttonPlus = _unProdusCos.querySelector('.buttonPlus');
  const _buttonSterge = _unProdusCos.querySelector('.stergeProdus');

  _buttonSterge.addEventListener('click', function (){
  const cosDinLocalStorage = JSON.parse(localStorage.getItem('cart')) || [];
  const cosActualizat = cosDinLocalStorage.filter(item => item.id !== produsPrintat.id);

  localStorage.setItem('cart', JSON.stringify(cosActualizat));
  produseInCos(cosActualizat);;
  })

  _buttonMinus.addEventListener('click', function () {
    if(produsPrintat.count == 1) {
      _buttonMinus.style.backgroundColor = 'rgb(207, 207, 207)';
    }
    else if (produsPrintat.count > 1) {
      eliminareCantitateProdus(produsPrintat);
    }
  });

  _buttonPlus.addEventListener('click', function () {
    adaugareCantitateProdus(produsPrintat);
  });
}


function eliminareCantitateProdus (produs) {
  const cosDinLocalStorage = JSON.parse(localStorage.getItem('cart'));
  cosDinLocalStorage.forEach(item => {
    if (item.id === produs.id) {
      item.count--;
    }
  });
  localStorage.setItem('cart', JSON.stringify(cosDinLocalStorage));
  produseInCos(cosDinLocalStorage);
}


function adaugareCantitateProdus(produs) {
  const cosDinLocalStorage = JSON.parse(localStorage.getItem('cart')) || [];  
  cosDinLocalStorage.forEach(item => {
    if (item.id === produs.id) {
      item.count++;
    }
  });
  localStorage.setItem('cart', JSON.stringify(cosDinLocalStorage));
  produseInCos(cosDinLocalStorage);
}

function produseInCos(produsePrintate) {                          
  const _cosProduse = document.querySelector(".cosProduse");       
  _cosProduse.innerHTML = "";                                     

  produsePrintate.forEach(produsInCos);                            

  const _totalDiv = document.createElement("div");                 
  _totalDiv.textContent = `Pret total: $${pretFinal(produsePrintate).toFixed(2)}`;   
  _totalDiv.className = "totalDiv";                                
  _cosProduse.appendChild(_totalDiv);                              

  const _butonAchizitie = document.createElement("button");        
  _butonAchizitie.className = "butonAchizitie";                    
  _butonAchizitie.innerHTML = "Trimite Comanda";                   
  _butonAchizitie.addEventListener("click", trimiteComanda);       
  _cosProduse.appendChild(_butonAchizitie);  
}

function pretFinal(cumparaturi) {
  return cumparaturi.reduce((suma, produsCurent) => suma + (produsCurent.price * (produsCurent.count || 1)), 0);
}

function trimiteComanda() {                                       
  console.log("TrimiteComanda a fost apasat!");                   

  localStorage.removeItem('cart');
  arrayCosProduse.length = 0;                                     
  produseInCos(arrayCosProduse);                                  

  setTimeout(() => {
    alert('Comanda a fost trimisă cu succes!');                   
  }, 2000);                                                      
} 


// === functii de chemare a datelor ===
const aduProduseleDeLaServer = async function () {
  try {
    const url = `https://fakestoreapi.com/products`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const produse = await response.json();
    localStorage.setItem('products', JSON.stringify(produse));
    printeazaToateProdusele(produse);
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
};

const aduProduseleDeLaServerSortate = async function () {
  try {
    const url = `https://fakestoreapi.com/products?limit=${GLOBAL_CONFIG.productsPerPage}&sort=${GLOBAL_CONFIG.order}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const produse = await response.json();
    printeazaToateProdusele(produse);
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
};

function loadProductsFromLocalStorage() {
  const products = JSON.parse(localStorage.getItem('products')) || [];
  const sortedProducts = products.sort((a, b) => {
    if (GLOBAL_CONFIG.order === 'asc') {
      return a.id - b.id;
    } else {
      return b.id - a.id;
    }
  });
  const startIndex = 0;
  const endIndex = GLOBAL_CONFIG.productsPerPage;
  const limitedProducts = sortedProducts.slice(startIndex, endIndex);
  printeazaToateProdusele(limitedProducts);
}


// === pod intre buton sursa produselor si functiile ce decid metoda 
function loadProducts() {
  if (useLocalStorage) {
    loadProductsFromLocalStorage();
  } else {
    aduProduseleDeLaServer();
  }
}


// === buton care schimba sursa produselor ===
function updateToggleButtonText() {
  const toggleButton = document.getElementById('toggleSource');
  toggleButton.textContent = useLocalStorage ? 'API' : 'locS';
}
updateToggleButtonText();

document.getElementById('toggleSource').addEventListener('click', () => {
  useLocalStorage = !useLocalStorage;
  document.getElementById('toggleSource').classList.toggle('active', useLocalStorage);
  updateToggleButtonText();
  loadProducts();
});


// === butoanele de sortare a listei de produse ===
document.getElementById('productPerPage').addEventListener('change', function (event) {
  GLOBAL_CONFIG.productsPerPage = +event.target.value;
  if (!useLocalStorage) aduProduseleDeLaServerSortate();
  else loadProductsFromLocalStorage();
});

document.getElementById('order').addEventListener('change', function (event) {
  GLOBAL_CONFIG.order = event.target.value;
  if (!useLocalStorage) aduProduseleDeLaServerSortate();
  else loadProductsFromLocalStorage();
});

aduProduseleDeLaServer();




