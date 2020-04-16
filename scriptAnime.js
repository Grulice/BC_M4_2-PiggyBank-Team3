let activateButton = document.querySelector('.activate');
let child = document.querySelector('.child');
let submitButton = document.querySelector('.submit');
let input = document.querySelector('input');
// let labelSum = document.querySelector('label');

// activateButton.addEventListener('click', activate);
submitButton.addEventListener('click', submitInfo)

function submitInfo() {
    if(isNaN(input.value)) {
        console.log('here')
        animateCSS('.labelSum', 'shake');
    }
}


// function activate() {
//     console.log(child.classList.contains('shake'));
//     animateCSS('.child', 'shake');
//     console.log(child.classList.contains('shake'));
// }

function animateCSS(element, animationName, callback) {
    const node = document.querySelector(element)
    node.classList.add('animated', animationName);
    console.log(1010)

    function handleAnimationEnd() {
        node.classList.remove('animated', animationName)
        node.removeEventListener('animationend', handleAnimationEnd)

        if (typeof callback === 'function') callback()
    }

    node.addEventListener('animationend', handleAnimationEnd)
}