const targetName = document.querySelector('#item-name');
const needToReach = document.querySelector('#final-amount');
const term = document.querySelector('#time');
const startAmount = document.querySelector('#deposit');


let pigWait = document.querySelector('.pig-wait');
let offer  = document.querySelector('.offer');
let findOffer = document.querySelector('.calc-div button');
let closePopUp = document.querySelector('.close span');

const addButton = document.querySelector('.add-button');

let pigAnime = document.querySelector('.pig-anime');

const editButton = document.querySelector('.sections-of-header:first-child');
const popUpWindow = document.querySelector('.pop-up');
console.log(editButton);


addButton.addEventListener('click', hidePig);
editButton.addEventListener('click', showWindow);

findOffer.addEventListener('click', findOfferButtonHandler)
closePopUp.addEventListener('click', closeWindow);

function showWindow() {
    animateCSS('.pop-up', 'bounceInDown')
    popUpWindow.style.display = 'flex';
}

function hidePig() {
    pigAnime.classList.add('slow');
    animateCSS('.pig-anime', 'bounceOutRight');

    setTimeout(() => {
        pigAnime.style.display = 'none'
    }, 2000)
}

function animateCSS(element, animationName, callback) {
    const node = document.querySelector(element);
    node.classList.add('animated', animationName);
    node.classList.add('faster', animationName);

    function handleAnimationEnd() {
        node.classList.remove('animated', animationName)
        node.removeEventListener('animationend', handleAnimationEnd)

        if (typeof callback === 'function') callback()
    }

    node.addEventListener('animationend', handleAnimationEnd)
}

function findOfferButtonHandler() {
    if(startAmount.value <= 0) {
        animateCSS('.div-label-deposit', 'shake');
    }

    if(term.value <= 0) {
        animateCSS('.div-label-time', 'shake');
    }

    if(needToReach.value <= 0) {
        animateCSS('.div-label-cost', 'shake');
    }
    pigWait.style.display = 'none';
    offer.style.display = 'flex';
}

function closeWindow() {
    document.querySelector('.pop-up').style.display = 'none';
    pigWait.style.display = 'block';
    offer.style.display = 'none';
}