const GLOBAL_CONFIG = {                                                         // 
  productsPerPage: 20,                                                          // 
  order: 'asc'                                                                  // 
}




const printeazaUnProdus = function(produs) {                      // 0 functie pentru comportamentul de printare a unui singur produs din lista

  const _listaProduse = document.querySelector(".listaProduse");  // 1 creez o const care face pod intre html si js
  const _unProdus = document.createElement("div");                // 2 cer sa faca un div pentru un singur element din 20 de pe https://fakestoreapi.com/ ce va fi extras cu fetch mai tarziu in cod 
  _unProdus.classList.add('unProdus');
  _listaProduse.appendChild(_unProdus);                           // 3 div ul creat mai devreme este introdus in const _listaProduse si se inchide cercul

  _unProdus.innerHTML =                                         
        `<img src="${produs.image}" alt="${produs.title}" />
        <div class="unProdusInfo">
          <h4>${produs.title}</h4>
          <p>Price: $${produs.price}</p>
          <p>${produs.description}</p>
        </div>
        <button>Adauga in Cos</button>`
        ;                                                         // 4 in expresia de mai sus se creaza html ul din interiorul div ului de la explicatia 2
  
  const butonAdaugare = _unProdus.querySelector('button');         // 5 butonul declarat in innerHTML este selectat
  butonAdaugare.addEventListener('click', function() {             // 6 se adauga un event click ???
  adaugaInCos(produs);                                             // 7 si o functie ce va fi declarata mai tarziu cu function deoarece este apelata inainte
  });
}




//const printeazaToateProdusele = (produseStoc) => produseStoc.forEach((produs) => printeazaUnProdus(produs));
                                                                   // 8 se creeaza o funtie care sa itereze prin un array si sa apeleze funtia de printare a unui singur produs
const printeazaToateProdusele = (produseStoc) => {
  const _listaProduse = document.querySelector(".listaProduse");          //
  _listaProduse.innerHTML = ''; 

  produseStoc.forEach((produs) => printeazaUnProdus(produs))
}




//const arrayCosProduse = [];                                      // 9 array ul pomenit ce va accesa produsele impinse in cos, se declara gol
const arrayCosProduseSalvat = JSON.parse(localStorage.getItem('cart'));      //
const arrayCosProduse = arrayCosProduseSalvat ? arrayCosProduseSalvat : [];  //




function pretFinal(cumparaturi){
  return cumparaturi.reduce((suma, produsCurent)=> suma + produsCurent.price , 0);
}                                                                  // 10 se creeaza o functie care va prelua elementele din cos si va aduna .price la fiecare pornind de la 0




const aduProduseleDeLaServer = async function () {                              // 11 acum ca avem functia de printare un obiect 1 si cea ce va itera prin toate produsele 8 trebuie sa populam lista
  try {
    //const response = await fetch('https://fakestoreapi.com/products'); // 12 const response asteapta sa primeasca raspuns de la API
                                 
    const  url = `https://fakestoreapi.com/products?limit=${GLOBAL_CONFIG.productsPerPage}&sort=${GLOBAL_CONFIG.order}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');  // 13 daca raspunsul nu e conform se arunca o eroare
    const produse = await response.json();                         // 14 const produse este daca raspunsul a trecut de eroare
    printeazaToateProdusele(produse);                              // 15 se apeleaza iterarea pt raspunsul de la API
  } catch (error) {                                                // 16 eroarea este stocata si se afiseaza in consola
    console.error('There has been a problem with your fetch operation:', error);
  }
};
aduProduseleDeLaServer();                                          // 17 se apeleaza popularea listei de produse                                                                           




function produsInCos (produsPrintat) {                             // 18 de aici incepe popularea cosului cu un produs
  const _cosProduse = document.querySelector(".cosProduse");       // 19 se selecteaza divul ce va fi populat
  const _unProdusCos = document.createElement("div");              // 20 se creaza variabila ce va adauga un div/element nou
  _unProdusCos.classList.add('unProdusCos');                       // 21 i se da o clasa elementului
  _cosProduse.appendChild(_unProdusCos);                           // 22 elementul este asociat cu cosul 

  _unProdusCos.innerHTML =                                        
  `<div>
    <img src="${produsPrintat.image}" />
  </div>
  <div>
    <h4>${produsPrintat.title}</h4>
    <p>Price: $${produsPrintat.price}</p>
  </div>`;
}                                                                  // 23 elementul creat trebuie sa aiba un html in interior




function produseInCos (produsePrintate) {                          // 24 aceasta este functia ce va face callback pe 18 produsInCos
  const _cosProduse = document.querySelector(".cosProduse");       // 24 se selecteaza cosul 
  _cosProduse.innerHTML = "";                                      // 25 se goleste pt a nu adauga dubluri

  produsePrintate.forEach(produsInCos);                            // 26 fiecare produs ce trece prin functia asta are un callback pe 18

  const _totalDiv = document.createElement("div");                 // 27 se creeaza un div cu textul pret total ce face callback pe functia pretFinal pentru produsele din cos 
  
  //_totalDiv.textContent = Pret total: $${pretFinal(produsePrintate)};

  _totalDiv.textContent = `Pret total: $${pretFinal(produsePrintate).toFixed(2)}`;   //

  _totalDiv.className = "totalDiv";                                // 28 i se da clasa totalDiv
  _cosProduse.appendChild(_totalDiv);                              // 29 se adauga la cos 

  const _butonAchizitie = document.createElement("button");        // 30 se creaza un buton
  _cosProduse.appendChild(_butonAchizitie);                        // 31 se adauga la cos
  _butonAchizitie.className = "butonAchizitie";                    // 32 i se da o clasa
  _butonAchizitie.innerHTML = "Trimite Comanda";                   // 33 i se adauga un text 
  _butonAchizitie.addEventListener("click", trimiteComanda);       // 34 i se da un event pe click si o functie ce va fi creeata mai tarziu
}




function adaugaInCos (produs) {                                    // 35 aceasta functie a fost lasata in aer de la punctul 7 deoarece fiecare element adaugat la lista produse va avea un buton de adaugare in cos 
  const cosDinLocalStorage = JSON.parse(localStorage.getItem('cart')) || [];   //
  cosDinLocalStorage.push(produs);                                             //
  produseInCos(cosDinLocalStorage);                                            //

  const formatareCos = JSON.stringify(cosDinLocalStorage);                     //
  localStorage.setItem('cart', formatareCos);                                  //

  //arrayCosProduse.push(produs);                                  // 36 se apeleaza array ul declarat la 8 si in ele sunt adaugate produsele selectate
  //produseInCos(arrayCosProduse);                                 // 37 arrayul este trimis in callback pe linia 24
}




produseInCos(arrayCosProduse);                                     // 38 
                                                                   



function trimiteComanda() {                                       // 39 API ul nu are raspuns pe order asa ca am optat pentru o functie dummy care simuleaza un order 
  console.log("TrimiteComanda a fost apasat!");                   // 40 Confirmare in consola
 
  localStorage.removeItem('cart');
  arrayCosProduse.length = 0;                                     // 41 Arrayul va fi golit 
  produseInCos(arrayCosProduse);                                  // 42 Se va goli si interfata

  setTimeout(() => {
    alert('Comanda a fost trimisă cu succes!');                   // 43 Seteaza un mesaj de alerta
  }, 2000);                                                       // 44 acesta va simula un timp de gandire de 2 secunde
} 




const productPerPageElement = document.querySelector('#productPerPage');     //
const orderElement = document.querySelector('#order');                       //




productPerPageElement.addEventListener('change', function (event) {          //
  GLOBAL_CONFIG.productsPerPage = +event.target.value;                       //
  aduProduseleDeLaServer();                                                               //
});




orderElement.addEventListener('change', function (event) {                   //
  GLOBAL_CONFIG.order = event.target.value;                                  //
  aduProduseleDeLaServer();                                                               //
});