const GLOBAL_CONFIG = {
  productPerPage : 20,
  order : 'asc',
};

let useLocalStorage = false;

function updateToggleButtonText () {
  const toggleButton = document.getElementById("toggleSource");
  toggleButton.textContent = useLocalStorage ? 'use local' : 'use API';
}

updateToggleButtonText ();

document.getElementById("toggleSource").addEventListener('click', ()=> {
  useLocalStorage = !useLocalStorage;
  document.getElementById("toggleSource").classList.toggle('active', useLocalStorage);
  updateToggleButtonText();
  loadProducts();
});



