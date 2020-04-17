// Popup.js, PopUp window logic
//#region
const fetcher = require("./fetcher");
const drawerUI = require("./drawUI");
const calculator = require("./calculator");
const targetNameInp = document.querySelector("#item-name");
const targetSumInp = document.querySelector("#final-amount");
const termInp = document.querySelector("#time");
const startAmountInp = document.querySelector("#deposit");
const errorCaption = document.querySelector("#error-caption");

// get captions from DOM
const captions = {
  depositName: document.getElementById("deposit-name-caption"),
  percent: document.getElementById("percent-caption"),
  monthlyDeposit: document.getElementById("monthly-deposit-caption"),
};

let pigWait = document.querySelector(".pig-wait");
let offer = document.querySelector(".offer");

let findOfferBtn = document.querySelector(".calc-div button");
let closePopUpBtn = document.querySelector(".close span");
findOfferBtn.addEventListener("click", findOfferButtonHandler);
closePopUpBtn.addEventListener("click", closeWindow);

const cancelBtn = document.getElementById("button-cancel");
cancelBtn.addEventListener('click', resetForm);

const loadingIcon = document.getElementById("loading-icon");

function handleConfirm() {
    drawerUI.addNewPlan(
    targetNameInp.value,
    Number(startAmountInp.value),
    curOption.sum,
    curOption.userTerm,
    curOption.deposit,
    curOption.income,
    curOption.monthlyDeposit.toFixed(2)
  );
  closeWindow();
}

function animateCSS(element, animationName, callback) {
  const node = document.querySelector(element);
  node.classList.add("animated", animationName);
  node.classList.add("faster", animationName);

  function handleAnimationEnd() {
    node.classList.remove("animated", animationName);
    node.removeEventListener("animationend", handleAnimationEnd);

    if (typeof callback === "function") callback();
  }

  node.addEventListener("animationend", handleAnimationEnd);
}

let curOption = {};

function findOfferButtonHandler() {
  // здесь будут проверяться инпуты
  checkInputs();

  let userInput = {
    description: targetNameInp.value,
    initSum: Number(startAmountInp.value),
    term: Number(termInp.value),
    desiredSum: Number(targetSumInp.value),
  };

  loadingIcon.classList.remove('hidden');
  fetcher
    .getDeposits()
    .then((result) => {
      return calculator.getBestProduct(result, userInput);
    })
    .then((bestOption) => {
      if (typeof bestOption === "string") {
        errorCaption.innerText =
          "Не найдено ни одного варианта по данным параметрам";
        return;
      }
      console.log(bestOption);
      errorCaption.innerText = "";
      captions.depositName.innerText = "Вклад: " + bestOption.deposit;
      captions.percent.innerText = "Годовая ставка: " + bestOption.income + "%";
      captions.monthlyDeposit.innerText =
        "Ежемесячное пополнение: " + bestOption.monthlyDeposit.toFixed(2);

      curOption = bestOption;

      // deposit, finalAmount, time, bankName, productName, interestRate

      pigWait.style.display = "none";
      offer.style.display = "flex";
    })
    .catch((error) => {
      console.error("Failed to fetch data from API: " + error);
      alert("Произошла ошибка подключения к серверу");
    })
    .finally(_ => {
      loadingIcon.classList.add('hidden');
    });
}

function closeWindow() {
  document.querySelector(".pop-up").classList.add("hidden");
  resetForm();
}

function resetForm() {
  targetNameInp.value = "";
  targetSumInp.value = "";
  termInp.value = "";
  startAmountInp.value = "";
  pigWait.style.display = "block";
  offer.style.display = "none";
}

function checkInputs() {

}

module.exports = {findOfferButtonHandler, handleConfirm};