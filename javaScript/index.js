console.clear('');
//exercitiu nr. 1;
let suma = 0;

for (let i = 1; i <= 15; i++) {
  if (i % 2 === 0) {
    suma += i;
  }
}
//acest for loop va declara valorile de la 1 la 15 le va incrementa cu 1 dupa fiecare rotatie pana egaleaza ultimul numar va..
//verifica numerele care au rest 0 deci sunt pare daca nu sare iar la inceputul forului si la fiecare rotatie plecand de la 0(suma)
//va adauga urmatoarea valoare la suma daca codul a trecut de conditia if ului.

console.log("Suma numerelor pare de la 1 la 15 este: " + suma);

//exercitiu nr. 2;
let sirLitere = "Salut sunt Laura";
let numaratoare = 0;

for (let i=0; i<sirLitere.length; i++) {
  if (sirLitere[i]==="a" || sirLitere[i]==="A"){
    numaratoare++;
  }
}

console.log(`Litera a/A se repeta de ${numaratoare} ori in sirul "Salut sunt Laura"`);

//exercitiu nr. 3;
let produs = 1;

for (let i = 1; i <= 5; i++) {
  produs *= i;
}

console.log(`Produsul numerelor de la 1 la 5 este: ${produs}`);

//exercitiu nr. 4;
function calculareCub(number) {
  return number ** 3;
}

let rezultat = calculareCub(7);

console.log(`Cubul lui 7 este: ${rezultat}`);

//exercitiu nr. 5;
function countLetters(text, letter) {
  let count = 0;

  for (let i = 0; i < text.length; i++) {
    if (text[i].toLowerCase() === letter.toLowerCase()) {
      count++;
    }
  }

  return count;
}

let text = "alune uscate";
let letter = "e";

let result = countLetters(text, letter);

console.log(`Litera '${letter}' aapare în textul '${text}' de ${result} ori`);

//exercitiu nr. 6;
function calculateFactorial(n) {
  let result = 1;

  for (let i = 1; i <= n; i++) {
    result *= i;
  }

  return result;
}

let n = 5;
let factorial = calculateFactorial(n);

console.log(`Produsul numerelor de la 1 la ${n} este: ${factorial}`); 

//exercitiu nr. 7;
let sirDate = ['Salut', 2, 'Dacia'];
let sirCautat = 'Salut';
let numarAparitii = 0;

for (let i = 0; i < sirDate.length; i++) {
  if (sirDate[i] === sirCautat) {
    numarAparitii++;
  }
}

console.log(`Numărul de apariții al stringului '${sirCautat}' în array este: ${numarAparitii}`);

//exercitii nr. 8;
let sirNumere = [10, 20, 1, 2];
let produsSirNumere = 1;

for (let i = 0; i < sirNumere.length; i++) {
  produsSirNumere *= sirNumere[i];
}

console.log(`Produsul numerelor din sir este: ${produsSirNumere}`);

//exercitii nr. 9;
let array = ['baobab', 'calculator'];
let count = 0;

for (let i = 0; i < array.length; i++) {
  let characters = array[i].split('');
  //metoda split desparte fiecare string din array in caractere separate deci characters va deveni b a o b a b c a l c u l a t o r ;
  for (let j = 0; j < characters.length; j++) {
    if (characters[j].toLowerCase() === 'a') {
      count++;
    }
  }
  //al doilea for ia characters care este o insiruire de caractere si verifica pe rand litera a ;
}

console.log(`Numărul de apariții ale literei 'a' în array este: ${count}`);

//exercitii nr. 10;
let sirObiecte = ["ALUNA", "PORSCHE"];
let cuvant = "ALUNA";

//metoda includes verifica daca un array contine ceva ();
let gasit = sirObiecte.includes(cuvant);
//gasit va fi returnat ca true sau false prin metona de mai sus;
console.log(gasit);