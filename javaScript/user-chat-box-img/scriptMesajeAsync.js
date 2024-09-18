//1
const _listaMesaje = document.querySelector("#lista-mesaje");                //Selectează containerul pentru lista de mesaje (#lista-mesaje).
const _textarea = document.querySelector("#newMessage");                     //Selectează câmpul de text pentru mesajele noi (#newMessage).
const _submit = document.querySelector("#post");                             //Selectează butonul pentru postarea unui nou mesaj (#post).
const _submitAuthenticated = document.querySelector("#post-authenticated");  //Selectează butonul pentru postarea unui mesaj autentificat (#post-authenticated).
const _submitLogin = document.querySelector("#submit-login");                //Selectează butonul pentru trimiterea formularului de login (#submit-login).
const _userInput = document.querySelector("#user");                          //Selectează câmpurile de input pentru numele de utilizator (#user).
const _passwordInput = document.querySelector("#password");                  //Selectează câmpurile de input pentru numele de parolă (#password).



//2
var userKeyGlobal;                                                           //Declară o variabilă globală userKeyGlobal pentru a stoca cheia utilizatorului autentificat.



//3  a.
function printMessages(array) {                                              //Funcții pentru Afișarea Mesajelor
    _listaMesaje.innerHTML = '';                                             //Creează o funcție pentru a curăța lista curentă de mesaje.
    array.forEach(printMessage);                                             //Iterează printr-un array de mesaje și apelează printMessage pentru fiecare.
}



//3  b.
function printMessage(messageObject) {                                       //Functii pentru Afisarea Mesajelor
    const _messageElement = document.createElement('div');                   //Creeaza un nou element 'div' pentru a contine mesajul
    const _authorElement = document.createElement('h5');                     //Creează un nou element h5 pentru numele autorului.
    const _messageTextElement = document.createElement('p');                 //Creează un nou element p pentru textul mesajului.


    _messageElement.appendChild(_authorElement);                             //Anexează elementul autor la containerul mesajului.
    _messageElement.appendChild(_messageTextElement);                        //Anexează elementul mesaj la containerul mesajului.


    _authorElement.innerText = messageObject.author;                         //Setează numele autorului.
    _authorElement.innerHTML += `<span> @ ${messageObject.time}</span>`;     //Adaugă timpul mesajului.


    _messageTextElement.innerText = messageObject.message;                   //Setează textul mesajului.


    if (messageObject.image) {                                               //Dacă există un URL pentru imagine. 
        const _imageElement = document.createElement('img');                 //Creează un element img.
        _imageElement.src = messageObject.image;                             //Setează-i src.
        _imageElement.style.maxWidth = '30%';                                //Seteaza dimensiune imagine fata de parinte.
        _messageElement.appendChild(_imageElement);                          //Anexează-l la containerul mesajului.
    }


    if (messageObject.authenticated != "0") {                                //Daca mesajul este autentificat.
        _authorElement.style.color = 'darkblue';                             //Stilizeaza elementul de autor pe color.
        _authorElement.style.fontSize = '1.1em';                             //Stilizeaza elementul de autor pe font.
    }


    _listaMesaje.appendChild(_messageElement);                               //Anexează containerul complet al mesajului la lista de mesaje.
}



//4
const fetchMessagesFromServer = async () => {                                //Obținerea Mesajelor de la Server                         //
    const raspunsRequest = await fetch('https://paulghiran.com/messages/');  //Creează o funcție pentru a obține mesajele de la server printr-un apel API.


    const arrayDeMesaje = await raspunsRequest.json();                       //Parsează răspunsul ca JSON.


    printMessages(arrayDeMesaje)                                             //Apelează printMessages cu array-ul de mesaje.
}

setInterval(fetchMessagesFromServer, 5000)                                   //Setează un interval pentru a apela această funcție la fiecare 5 secunde.



//5 
async function fetchPostMessage(mesaj, userKey) {                            //Blocul de cod trimite un mesaj (și, opțional, un URL de imagine) către server folosind metoda POST, alegând endpoint-ul și includând cheia de utilizator dacă utilizatorul este autentificat, apoi așteaptă și procesează răspunsul serverului în format JSON.
    let raspunsJSON;                                                         //Declară o variabilă pentru a stoca răspunsul serverului.
    const imageURL = document.querySelector('#imageURL').value;              //Obține URL-ul imaginii din câmpul de input.


    if (userKey) {                                                           //Verifică dacă utilizatorul este autentificat.
        const promise = await fetch('https://paulghiran.com/messages/authenticated_message.php', {
                                                                             //Trimite cererea POST către endpoint-ul pentru mesaje autentificate, cu cheia utilizatorului.  
                                
            headers: {                                                       //Setează anteturile cererii pentru a specifica tipul de conținut și cheia utilizatorului.    
                'Content-Type': 'application/json',
                userKey: userKey
            },
            method: "POST",                                                  //Folosește metoda POST pentru a trimite date către server.
            body: JSON.stringify({                                           //Creează corpul cererii ca un obiect JSON, inclusiv mesajul și URL-ul imaginii.
                message: mesaj,
                image: imageURL
            })
        });


        raspunsJSON = await promise.json();                                 //Așteaptă răspunsul serverului și îl parsează în JSON.


    } else {                                                                //Dacă utilizatorul nu este autentificat.
        const promise = await fetch('https://paulghiran.com/messages/', {   //Trimite cererea POST către endpoint-ul standard pentru mesaje publice, fără cheie.
            headers: {
                'Content-Type': 'application/json',
            },
            method: "POST",
            body: JSON.stringify({
                author: 'necunoscut',
                message: mesaj
            })
        });

        raspunsJSON = await promise.json();                                // Așteaptă răspunsul serverului și îl parsează în JSON.
    }
}



//6                                                                        //Postarea Mesajelor de Utilizatori Anonimi si apoi autentificati.
_submit.addEventListener('click', () => {                                  //Adaugă un event listener de tip click pe butonul de postare.
    const textMesaj = _textarea.value;                                     //La click, obține textul mesajului din textarea.
 
    fetchPostMessage(textMesaj);                                           //Apelează fetchPostMessage cu textul mesajului.

    _textarea.value = '';                                                  // Curăță textarea după postare.
});




//7  a.
_submitLogin.addEventListener('click', fetchLogin);                        //Adaugă un event listener de tip click pe butonul de postare autentificată. Când butonul este apăsat, va fi apelată funcția fetchLogin.



//7  b.
async function fetchLogin() {                                              //Declara o funcție asincronă numită fetchLogin, care permite utilizarea await pentru a aștepta răspunsurile asincrone.
    const user = _userInput.value;                                         // Obține valorile introduse de utilizator în câmpurile de input pentru nume de utilizator.
    const password = _passwordInput.value;                                 // Obține valorile introduse de utilizator în câmpurile de input pentru parolă.

    try {                                                                  //Începe un bloc try pentru a captura orice erori care ar putea apărea în timpul execuției cererii de login.

        const raspunsServer = await fetch('https://paulghiran.com/messages/login.php', 
            {                                                              //await așteaptă ca cererea să fie finalizată.
                headers: {
                    'Content-Type': 'application/json',                    
                },
                method: "POST",                                            //Trimite o cerere POST către serverul de login (login.php),
                body: JSON.stringify({                                     //specificând că datele sunt în format JSON,
                    user: user,                                            //și include numele de utilizator
                    password: password                                     //și parola în corpul cererii.
                })
            })

        const userGasit = await raspunsServer.json();                      //Așteaptă și parsează răspunsul serverului în format JSON, care conține informațiile despre utilizator.
        const obiectUser = userGasit.user;                                 //Extrage obiectul utilizatorului din răspunsul JSON  

        const { userKey } = obiectUser;                                    //și obține cheia utilizatorului (userKey),
        userKeyGlobal = userKey;                                           //pe care o stochează în variabila globală userKeyGlobal.

        const _loginModal = document.querySelector('.login.modal');        //Găsește elementul modal de login
 
        _loginModal.style.display = 'none'                                 //îi setează stilul de afișare la 'none', ascunzând astfel modalul de login.

    } 
    catch (eroare) {                                                       //Dacă apare o eroare în timpul cererii de login,
        console.log(eroare);                                               //aceasta este capturată și afișată în consolă
        alert("User sau parola gresit/a")                                  //iar utilizatorul este informat printr-un mesaj de alertă că numele de utilizator sau parola sunt greșite.
    }

}



//8
_submitAuthenticated.addEventListener('click', () => {                     //Adaugă un "event listener" pe butonul de postare autentificată (_submitAuthenticated).
    const textMesaj = _textarea.value;                                     //Când butonul este apăsat: Obține textul mesajului din textarea.

    fetchPostMessage(textMesaj, userKeyGlobal);                            //Apelează funcția fetchPostMessage cu mesajul și userKeyGlobal pentru a trimite mesajul către server.

    _textarea.value = '';                                                  //Curăță textarea
    document.querySelector('#imageURL').value = '';                        //și câmpul URL al imaginii pentru a pregăti formularul pentru următorul mesaj.
});