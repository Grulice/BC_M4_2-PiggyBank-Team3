let planContainer = document.querySelector('.plan-container');
let popUp = document.querySelector('.pop-up');

let addBtn = document.getElementById('add');
addBtn.addEventListener('click', addNewPlan);

function addNewPlan() {

  // Creation of main plan div:
  let plan = document.createElement('div');
  plan.className = 'plan';
  let editBtn = document.createElement('div');
  editBtn.className = 'edit mini-button';
  let deleteBtn = document.createElement('div');
  deleteBtn.className = 'delete mini-button';
  deleteBtn.innerText = 'X'

  // Creation of content div:
  let itemName = document.createElement('div');
  itemName.classList.add('content-main-focus');
  itemName.innerText = 'ITEM';
  let description = document.createElement('div');
  description.classList.add('content-description');

  // Creation of left content description:

  let deposit = 1000;
  let finalAmount = 5000;
  let time = 12;

  let leftDescription = document.createElement('div');
  leftDescription.classList.add('content-left-description');
  let depositDescription = document.createElement('p');
  depositDescription.innerText = `DEPOSIT: ${deposit} AZN`;
  let finalAmountDescription = document.createElement('p');
  finalAmountDescription.innerText = `FINAL AMOUNT: ${finalAmount} AZN`;
  let timeDecription = document.createElement('p');
  timeDecription.innerText = `TIME: ${time} months`;

  // Creation of righ content description:

  let bankName = 'PASHA BANK';
  let productName = 'POPOLNENIYA';
  let interestRate = 3.5;

  let rightDescription = document.createElement('div');
  rightDescription.classList.add('content-right-description');
  let bankNameDescription = document.createElement('p');
  bankNameDescription.innerText = `BANK NAME: ${bankName}`;
  let productNameDescription = document.createElement('p');
  productNameDescription.innerText = `PRODUCT NAME: ${productName}`;
  let interestRateDecription = document.createElement('p');
  interestRateDecription.innerText = `INTEREST RATE: ${interestRate}%`;

  // Appendings:
  plan.append(editBtn, deleteBtn); // buttons
  planContainer.append(plan);
  editBtn.addEventListener('click', popItUp);
  deleteBtn.addEventListener('click', deleteItem);

  plan.append(itemName, description); // Main contents
  description.append(leftDescription, rightDescription); // Descriptions
  leftDescription.append(depositDescription, finalAmountDescription, timeDecription);
  rightDescription.append(bankNameDescription, productNameDescription, interestRateDecription);
}

function deleteItem(e) {
  e.target.parentElement.remove();
}

function popItUp() {
  popUp.classList.remove('hidden');
}