const fetcher = require("./fetcher");
const calculator = require("./calculator");

//Кнопка создания цели
const createButton = document.querySelector('');
//Кнопка удаления цели
const deleteButton = document.querySelector('');
//Кнопка редактирования цели
const editButton = document.querySelector('');
//Данные с инпутов
const targetName = document.querySelector('#item-name').value;
const needToReach = document.querySelector('#final-amount').value;
const term = document.querySelector('#time').value;
const startAmount = document.querySelector('#deposit').value;

// // FETCHER DEMO
// const goBtn = document.getElementById("goFetch");

// goBtn.addEventListener("click", () => {
//   fetcher.getDeposits().then((result) => console.log(result));
// });

// Calculator DEMO
fetcher.getDeposits().then((result) => {
  let myUserInput = {
    initSum: 100000,
    term: 12,
    desiredSum: 1000200,
  };

  let finalOption = calculator.getBestProduct(result, myUserInput);

  console.log(finalOption);
});
