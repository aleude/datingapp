//- Elements from header part:
let backBtn = document.getElementById('back-btn');

//- Elements from body part:
let username = document.getElementById('username');
let firstName = document.getElementById('firstname');
let lastName = document.getElementById('lastname');
let birthday = document.getElementById('birthday');
let gender = document.getElementsByName('gender');
let password = document.getElementById('password');
let passValidate = document.getElementById('passwordvalidate');
let signUp = document.getElementById('signupbutton');
let errorMessage = document.getElementById('errormessage');

//- Functions:

//Checking radiobuttons value
function checkRadioBtn(radiobutton) {

    //Loops through radio buttons
    for (let i=0; i<radiobutton.length; i++) {

        if (radiobutton[i].checked) {
            return radiobutton[i].value;
        };
    };

};

//This function validates user-inputs when submitted.
function validateUserInput() {

    //Defines message and sets errors to false.
    let message = '';
    let inputError = false;

    //Validates all inputs
    if (username.value.length < 1) {
        message += 'Username is missing. ';
        inputError = true;
    };

    if (firstName.value.length < 1) {
        message += 'First name is missing. ';
        inputError = true;
    };

    if (lastName.value.length < 1) {
        message += 'Last name is missing. ';
        inputError = true;
    };

    if (birthday.value.length < 1) {
        message += 'Your birthday are not picked. ';
        inputError = true;
    };

    if (checkRadioBtn(gender) === undefined) {
        message += 'You need to choose a gender. ';
        inputError = true;
    };

    if (password.value.length < 8) {
        message += 'Password is too short. ';
        inputError = true;
    };

    //Conditional statement to handle success or error
    if (inputError) {

        errorMessage.innerHTML = message;
        return inputError;

    } else {

        errorMessage.innerHTML = '';
        return inputError;

    };
};


//- Eventlisteners and requests

//Check if user is already logged in
document.addEventListener('DOMContentLoaded', ()=> {

    if(localStorage.getItem('JWT')) {
        location.replace('./main.html');
    };

});

//Validate password when typing
password.addEventListener('keyup', ()=> {
    //Length of password
    let minChar = 8;
    let input = password.value;

    if (input.length < minChar) {

        passValidate.innerHTML = `Password must be longer than ${minChar} characters`;
    } else {

        passValidate.innerHTML = '';
    };

});

//Back button redirect
backBtn.addEventListener('click', ()=> {
    window.location.href = './index.html';
})


//Sign up a new user
signUp.addEventListener('click', ()=> {

    //Validates user inputs
    let inputError = validateUserInput();

    //If validation went well
    if(!inputError) {
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';

        //Gets the value from input
        let data = {
            username: username.value,
            password: password.value,
            firstname: firstName.value,
            lastname: lastName.value,
            birthday: birthday.value,
            gender: checkRadioBtn(gender)
        };

        //Request call to server
        xhr.addEventListener('readystatechange', function() {

            if (this.readyState === 4) {

                const res = this.response;

                if (res.status === 403) {
                    errorMessage.innerHTML = 'Username already exists!';
                } else {

                    errorMessage.innerHTML = 'User has been created!'

                    //Signs the token to localstorage and redirect if everything went well
                    if (localStorage.getItem('JWT')) {
                        localStorage.removeItem('JWT');
                        localStorage.setItem('JWT', res);
                    } else {
                        localStorage.setItem('JWT', res);
                    };
                    //Replaces the webpage when success
                    location.replace('./newuser.html');
                };
            };
        });

        xhr.open('POST', 'http://localhost:3800/signup', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
    };
});