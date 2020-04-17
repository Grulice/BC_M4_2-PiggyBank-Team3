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
  let blur = document.querySelector('.blur');
  blur.classList.remove('hidden');
  animateCSS('.pop-up', 'bounceInDown');
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
  itemName.innerHTML = `<span class="info-description">${itemDescription}</span>`;
  let description = document.createElement("div");
  description.classList.add("content-description");

  // Creation of left content description:

  let leftDescription = document.createElement("div");
  leftDescription.classList.add("content-left-description");
  let depositDescription = document.createElement("p");
  depositDescription.innerHTML = `Начальный вклад: <span class="info-initsum">${deposit}</span> RUB`;
  let finalAmountDescription = document.createElement("p");
  finalAmountDescription.innerHTML = `Целевая сумма: <span class="info-finalsum">${finalAmount}</span> RUB`;
  let timeDecription = document.createElement("p");
  timeDecription.innerHTML = `Срок вклада: <span class="info-term">${time}</span> месяцев`;

  // Creation of righ content description:

  let rightDescription = document.createElement("div");
  rightDescription.classList.add("content-right-description");

  let productNameDescription = document.createElement("p");
  productNameDescription.innerHTML = `Описание: <span class="info-prodname">${productName}</span>`;
  let interestRateDecription = document.createElement("p");
  interestRateDecription.innerHTML = `Процентная ставка: <span class="info-interestrate">${interestRate}</span>%`;
  let monthlyTopupSum = document.createElement("p");
  monthlyTopupSum.innerHTML = `Ежемесячное пополнение: <span class="info-depsum">${monthlyDepSum}</span>`;

  // Appendings:
  plan.append(editBtn, deleteBtn); // buttons
  planContainer.append(plan);

  editBtn.addEventListener("click", handleTileEditBtn);
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
  if (planContainer.childElementCount === 2) {
    let piggyBoom = document.querySelector(".piggy-boom");
    piggyBoom.classList.remove("hidden");
  }
}

function handleTileEditBtn(e) {
  let currentTile = e.target.closest(".plan");
  prepareEditPopUp(currentTile);
  console.log(currentTile);
}

function prepareEditPopUp(inTile) {
  let userInput = {
    description: targetNameInp,
    initSum: startAmountInp,
    term: termInp,
    desiredSum: targetSumInp,
  };

  let tileinfo = {
    description: inTile.querySelector(".info-description"),
    initSum: inTile.querySelector(".info-initsum"),
    finalSum: inTile.querySelector(".info-finalsum"),
    term: inTile.querySelector(".info-term"),
    prodname: inTile.querySelector(".info-prodname"),
    interestRate: inTile.querySelector(".info-interestrate"),
    depSum: inTile.querySelector(".info-depsum"),
  };

  userInput.description.value = tileinfo.description.innerText;
  userInput.initSum.value = tileinfo.initSum.innerText;
  userInput.term.value = tileinfo.term.innerText;
  userInput.desiredSum.value = tileinfo.finalSum.innerText;

  editMode = true;
  currentlyEdited = inTile;
  showPopUp();
}

function editTileUsingInfo(targetTile, inputInfo) {
  let tileinfo = {
    description: targetTile.querySelector(".info-description"),
    initSum: targetTile.querySelector(".info-initsum"),
    finalSum: targetTile.querySelector(".info-finalsum"),
    term: targetTile.querySelector(".info-term"),
    prodname: targetTile.querySelector(".info-prodname"),
    interestRate: targetTile.querySelector(".info-interestrate"),
    depSum: targetTile.querySelector(".info-depsum"),
  };

  tileinfo.description.innerText = inputInfo.description;
  tileinfo.initSum.innerText = inputInfo.initSum;
  tileinfo.finalSum.innerText = inputInfo.finalSum;
  tileinfo.term.innerText = inputInfo.term;
  tileinfo.prodname.innerText = inputInfo.prodname;
  tileinfo.interestRate.innerText = inputInfo.interestRate;
  tileinfo.depSum.innerText = inputInfo.depSum;
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

// some edit logic
let editMode = false;
let currentlyEdited;

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
  if (editMode) {
    let userInput = {
      description: targetNameInp.value,
      initSum: Number(startAmountInp.value),
      term: Number(termInp.value),
      desiredSum: Number(targetSumInp.value),
    };

    let inpInfo = {
      description: userInput.description,
      initSum: userInput.initSum,
      finalSum: curOption.sum,
      term: curOption.userTerm,
      prodname: curOption.deposit,
      interestRate: curOption.income,
      depSum: curOption.monthlyDeposit.toFixed(2)
    }

    editTileUsingInfo(currentlyEdited, inpInfo);
    editMode = false;
  } else {
    addNewPlan(
      targetNameInp.value,
      Number(startAmountInp.value),
      curOption.sum,
      curOption.userTerm,
      curOption.deposit,
      curOption.income,
      curOption.monthlyDeposit.toFixed(2)
    );
  }

  let piggyBoom = document.querySelector(".piggy-boom");
  piggyBoom.classList.add("hidden");
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

  errorCaption.innerText = "";
  loadingIcon.classList.remove("hidden");
  fetcher
    .getDeposits()
    .then((result) => {
      // console.log(calculator.getAlternativeProduct(result, userInput));
      
      return calculator.getBestProduct(result, userInput);
    })
    .then((bestOption) => {
      if (typeof bestOption === "string") {
        errorCaption.innerText =
          "Не найдено ни одного варианта по данным параметрам";
        return;
      }
      console.log(bestOption);
      captions.depositName.innerText = "Вклад: " + bestOption.deposit;
      captions.percent.innerText = "Годовая ставка: " + bestOption.income + "%";
      captions.monthlyDeposit.innerText =
        "Ежемесячное пополнение: " + bestOption.monthlyDeposit.toFixed(2);

      //draw the table
      drawTable("info-table", bestOption);
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
  let blur = document.querySelector('.blur');
  blur.classList.add('hidden');
  resetForm();
}

function resetForm() {
  targetNameInp.value = "";
  targetSumInp.value = "";
  termInp.value = "";
  startAmountInp.value = "";
  pigWait.style.display = "block";
  offer.style.display = "none";
  clearTable("info-table");
}

function checkInputs() {}

function isValid(checkedinput) {}


function clearTable(tableId) {
  const HTMLtable = document.getElementById(tableId);
  let rows = HTMLtable.rows;
  let i = rows.length;
  while (--i) {
    HTMLtable.deleteRow(i);
  }
}
function drawTable(tableId, optionObj) {

  const HTMLtable = document.getElementById(tableId);
  const monthlyInfo = optionObj.monthlyInfo;
  const monthlyDep = optionObj.monthlyDeposit;
  const incPercent = optionObj.income;

  clearTable(tableId);
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
