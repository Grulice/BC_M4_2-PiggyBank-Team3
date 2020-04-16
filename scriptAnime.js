
function animateCSS(element, animationName, callback) {
    const node = document.querySelector(element)
    node.classList.add('animated', animationName);

    function handleAnimationEnd() {
        node.classList.remove('animated', animationName)
        node.removeEventListener('animationend', handleAnimationEnd)

        if (typeof callback === 'function') callback()
    }

    node.addEventListener('animationend', handleAnimationEnd)
}

let findOffer = document.querySelector('.calc-div button');
let closePopUp = document.querySelector('.close span')

const targetName = document.querySelector('#item-name').value;
const needToReach = document.querySelector('#final-amount').value;
const term = document.querySelector('#time').value;
const startAmount = document.querySelector('#deposit').value;

findOffer.addEventListener('click', findOfferButtonHandler)
closePopUp.addEventListener('click', closeWindow);

function findOfferButtonHandler() {
    let pigWait = document.querySelector('.pig-wait');
    let offer  = document.querySelector('.offer');

    if(startAmount.value < 0) {
        animateCSS('#deposit', 'shake');
    }
    pigWait.style.display = 'none';
    offer.style.display = 'flex';
}

function closeWindow() {
    document.querySelector('.pop-up').style.display = 'none';
    pigWait.style.display = 'block';
    offer.style.display = 'none';

}