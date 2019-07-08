const FIRST_NAME = 'First name';
const LAST_NAME = 'Last name';
const EMAIL = 'Email address';
const PASSWORD = 'Password';

function isInvalidEmail(string) {

    if (string.trim().length === 0) {
        return false;
    }
    return string.indexOf('@') === -1 && string.indexOf('.') === -1;
}

function createErrorMessage(message) {

    let errorMessage = document.createElement('span');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    return errorMessage;
}

function getInputTypeText(input) {

    switch(input.getAttribute('name')) {
        case 'first-name': return FIRST_NAME;
        case 'last-name': return LAST_NAME;
        case 'email': return EMAIL;
        case 'password': return PASSWORD;
        default: throw 'Invalid input name attribute.';
    }
}

function validateSignUpInfo() {

    const invalidClass = 'invalid';
    const inputs = document.querySelectorAll('input');

    for (let i = 0; i < inputs.length; ++i) {

        const content = inputs[i].value;
        const isEmailFieldInvalid = inputs[i].getAttribute('name') === "email" && isInvalidEmail(content);

        if (isEmailFieldInvalid || inputs[i].value.trim().length == 0) {

            const message = isEmailFieldInvalid ? 'Looks like this is not an email' : getInputTypeText(inputs[i]) + ' cannot be empty';
            inputs[i].placeholder = '';
            
            if (!inputs[i].className.includes(invalidClass)) {

                if (isEmailFieldInvalid) {
                    inputs[i].classList.add('email');
                }

                inputs[i].parentNode.insertBefore(createErrorMessage(message), inputs[i].nextSibling);
                inputs[i].classList.add(invalidClass);
            } else {
                
                if (inputs[i].getAttribute('name') === "email") {
                    inputs[i].parentNode.removeChild(inputs[i].nextSibling); //remove error message
                    inputs[i].parentNode.insertBefore(createErrorMessage(message), inputs[i].nextSibling);
                }
            }
        } else {

            inputs[i].classList.remove(invalidClass);
            if (inputs[i].nextSibling.tagName === 'SPAN') {
                inputs[i].parentNode.removeChild(inputs[i].nextSibling); //remove error message
            }
        }
    }
}

const claimTrialButton = document.querySelector('.claim-trial-button');
claimTrialButton.addEventListener('click', function(event) {
    validateSignUpInfo();
})