let planContainer = document.querySelector('.plan-container');
let popUp = document.querySelector('.pop-up');

let addBtn = document.getElementById('add');
addBtn.addEventListener('click', addNewPlan);

function addNewPlan() {
  let plan = document.createElement('div');
  plan.className = 'plan';
  let editBtn = document.createElement('div');
  editBtn.className = 'edit mini-button';
  let deleteBtn = document.createElement('div');
  deleteBtn.className = 'delete mini-button';
  plan.append(editBtn, deleteBtn);
  planContainer.append(plan);
  editBtn.addEventListener('click', popItUp);
  deleteBtn.addEventListener('click', deleteItem);
}

function deleteItem(e) {
  e.target.parentElement.remove();
}

function popItUp() {
  popUp.classList.remove('hidden');
}