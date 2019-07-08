function isInvalidEmail(string) {
    if (string.trim().length === 0) {
        return false;
    }
    return string.indexOf('@') === -1 && string.indexOf('.') === -1;
}

function validateSignUpInfo() {
    const inputs = document.querySelectorAll('input');
    for (let i = 0; i < inputs.length; ++i) {
        const content = inputs[i].value;
        const isEmailFieldInvalid = inputs[i].getAttribute('name') === "email" && isInvalidEmail(content);
        if (isEmailFieldInvalid || inputs[i].value.trim().length == 0) {
            let errorMessage = document.createElement('span');
            errorMessage.className = 'error-message';
            errorMessage.textContent = isEmailFieldInvalid ? 'Looks like this is not an email' : inputs[i].placeholder + ' cannot be empty';
            
            inputs[i].style.backgroundImage = 'url(./images/icon-error.svg)';
            inputs[i].style.border = '2px solid #fa8688';
            inputs[i].placeholder = '';
            
            if (!inputs[i].className.includes('invalid')) {
                inputs[i].style.marginBottom = '5px';
                inputs[i].parentNode.insertBefore(errorMessage, inputs[i].nextSibling);
                inputs[i].className += ' invalid';
            }
        }
    }
}

const claimTrialButton = document.querySelector('.claim-trial-button');
claimTrialButton.addEventListener('click', function(event) {
    validateSignUpInfo();
})