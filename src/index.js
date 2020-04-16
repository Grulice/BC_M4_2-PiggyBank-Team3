const fetcher = require("./fetcher");

//Кнопка создания цели
const createButton = document.querySelector('');
//Кнопка удаления цели
const deleteButton = document.querySelector('');
//Кнопка редактирования цели
const editButton = document.querySelector('');
//Данные с инпутов
const targetName = document.querySelector('').value;
const needToReach = document.querySelector('').value;
const term = document.querySelector('').value;
const startAmount = document.querySelector('').value;


// FETCHER DEMO
const goBtn = document.getElementById("goFetch");

goBtn.addEventListener("click", () => {
  fetcher.getDeposits().then((result) => console.log(result));
});
