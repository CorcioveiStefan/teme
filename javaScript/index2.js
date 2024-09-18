function filtreazaDivizibile(array, numar) {
  let rezultat = [];
  for (let i = 0; i < array.length; i++) {
      if (array[i] % numar === 0) {
          rezultat.push(array[i]);
      }
  }
  return rezultat;
}

console.log(filtreazaDivizibile([1, 2, 3, 4, 5, 6, 7, 8], 2));

//versiunea asta am construit o cu helperul .push

function verificaIncluziuneArray(mare, mic) {
  for (let i = 0; i < mic.length; i++) {
    if (!mare.includes(mic[i])) {
      return false;
    }
  }
  return true;
}

console.log(verificaIncluziuneArray([1, 2, 3, 4, 5, 6, 7, 8], [1, 2, 3])); 
console.log(verificaIncluziuneArray([1, 2, 3, 4, 5, 6, 7, 8], [1, 2, 13]));
console.log(verificaIncluziuneArray([1, 2, 3, 4, 5, 6, 7, 8], [10, 13])); 