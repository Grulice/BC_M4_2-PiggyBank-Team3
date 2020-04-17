let planContainer = document.querySelector(".plan-container");
let popUp = document.querySelector(".pop-up");

let addBtn = document.getElementById("add");
addBtn.addEventListener("click", showPopUp);


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
function showPopUp() {
  // showing popup
  popUp.classList.remove("hidden");
}

function popItUp() {
  popUp.classList.remove("hidden");
}

module.exports = { addNewPlan };