const fetcher = require("./fetcher");
const calculator = require("./calculator");

// DYNAMIC JS, Tile Logic
//#region
let planContainer = document.querySelector(".plan-container");
let popUp = document.querySelector(".pop-up");

let addBtn = document.getElementById("add");
addBtn.addEventListener("click", showPopUp);

function showPopUp() {
  // showing popup
  popUp.classList.remove("hidden");
}

function addNewPlan(
  itemDescription,
  deposit,
  finalAmount,
  time,
  productName,
  interestRate,
  monthlyDepSum
) {
  // Creation of main plan div:
  let plan = document.createElement("div");
  plan.className = "plan";
  let editBtn = document.createElement("div");
  editBtn.className = "edit mini-button";
  let deleteBtn = document.createElement("div");
  deleteBtn.className = "delete mini-button";
  deleteBtn.innerText = "X";

  // Creation of content div:
  let itemName = document.createElement("div");
  itemName.classList.add("content-main-focus");
  itemName.innerText = itemDescription;
  let description = document.createElement("div");
  description.classList.add("content-description");

  // Creation of left content description:

  // let deposit = 1000;
  // let finalAmount = 5000;
  // let time = 12;

  let leftDescription = document.createElement("div");
  leftDescription.classList.add("content-left-description");
  let depositDescription = document.createElement("p");
  depositDescription.innerText = `Начальный вклад: ${deposit} RUB`;
  let finalAmountDescription = document.createElement("p");
  finalAmountDescription.innerText = `Целевая сумма: ${finalAmount} RUB`;
  let timeDecription = document.createElement("p");
  timeDecription.innerText = `Срок вклада: ${time} месяцев`;

  // Creation of righ content description:

  // let bankName = "PASHA BANK";
  // let productName = "POPOLNENIYA";
  // let interestRate = 3.5;

  let rightDescription = document.createElement("div");
  rightDescription.classList.add("content-right-description");

  let productNameDescription = document.createElement("p");
  productNameDescription.innerText = `Описание: ${productName}`;
  let interestRateDecription = document.createElement("p");
  interestRateDecription.innerText = `Процентная ставка: ${interestRate}%`;
  let monthlyTopupSum = document.createElement("p");
  monthlyTopupSum.innerText = `Ежемесячное пополнение: ${monthlyDepSum}`;

  // Appendings:
  plan.append(editBtn, deleteBtn); // buttons
  planContainer.append(plan);

  editBtn.addEventListener("click", popItUp);
  deleteBtn.addEventListener("click", deleteItem);

  plan.append(itemName, description); // Main contents
  description.append(leftDescription, rightDescription); // Descriptions
  leftDescription.append(
    depositDescription,
    finalAmountDescription,
    timeDecription
  );
  rightDescription.append(
    productNameDescription,
    interestRateDecription,
    monthlyTopupSum
  );
}

function deleteItem(e) {
  e.target.parentElement.remove();
}

function popItUp() {
  popUp.classList.remove("hidden");
}

// DYNAMIC JS, Tile logic END ---------------------------------------------------
//#endregion

// Popup.js, PopUp window logic
//#region
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

const confirmBtn = document.getElementById("button-confirm");
confirmBtn.addEventListener("click", handleConfirm);
const cancelBtn = document.getElementById("button-cancel");
cancelBtn.addEventListener("click", resetForm);

const loadingIcon = document.getElementById("loading-icon");

function handleConfirm() {
  addNewPlan(
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

  loadingIcon.classList.remove("hidden");
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

        //draw the table
        // drawTable("main-table", bestOption);
      curOption = bestOption;

      // deposit, finalAmount, time, bankName, productName, interestRate

      pigWait.style.display = "none";
      offer.style.display = "flex";
    })
    .catch((error) => {
      console.error("Failed to fetch data from API: " + error);
      alert("Произошла ошибка подключения к серверу");
    })
    .finally((_) => {
      loadingIcon.classList.add("hidden");
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

function checkInputs() {}

function isValid(checkedinput) {}

function drawTable(tableId, optionObj) {
  function clearTable(in_table) {
    let rows = in_table.rows;
    let i = rows.length;
    while (--i) {
      in_table.deleteRow(i);
    }
  }

  const HTMLtable = document.getElementById(tableId);
  const monthlyInfo = optionObj.monthlyInfo;
  const monthlyDep = optionObj.monthlyDeposit;
  const incPercent = optionObj.income;

  clearTable(HTMLtable);
  // Draw the table
  for (let month = 0; month < monthlyInfo.length; month++) {
    const curInfo = monthlyInfo[month];
    let row = HTMLtable.insertRow(-1);

    // Insert new cells (<td> elements)
    let cell0 = row.insertCell(0);
    let cell1 = row.insertCell(1);
    let cell2 = row.insertCell(2);
    let cell3 = row.insertCell(3);
    let cell4 = row.insertCell(4);
    let cell5 = row.insertCell(5);

    // Add some text to the new cells:
    cell0.innerHTML = month + 1;
    cell1.innerHTML = curInfo.startBalance.toFixed(2);
    cell2.innerHTML = monthlyDep.toFixed(2);
    cell3.innerHTML = incPercent + "%";
    cell4.innerHTML = curInfo.monthlyInterest.toFixed(2);
    cell5.innerHTML = curInfo.endBalance.toFixed(2);
  }
}

//#endregion
