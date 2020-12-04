//- Elements from body:
let username = document.getElementById('username');
let password = document.getElementById('password');
let loginBtn = document.getElementById('loginbutton');
let signUpBtn = document.getElementById('signupbutton');

//- Functions:

//Validates user inputs
function validateUserInput() {
    let message = '';
    let inputError = false;

    if (username.value.length < 1) {
        inputError = true;
    };

    if (password.value.length < 1) {
        inputError = true;
    };

    if (inputError) {
        message = 'Your username or password is missing.';
        alert(message);
        //Should return false
        return inputError;
    } else {
        //Should return true
        return inputError;
    };
};


//- Eventlisteners and requests:

//Eventlistener to redirect users who already are logged in or has a bad token
document.addEventListener('DOMContentLoaded', ()=> {
    //If users has a token, validates if the token is accepted
    if(localStorage.getItem('JWT')) {
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        
        let token = localStorage.getItem('JWT');
        
        xhr.addEventListener('readystatechange', function(){
            if (this.readyState === 4) {
                const res = this.response;
                console.log(res);
                //If user wasn't found, reset token
                if (res.status === 'OK') {
                    localStorage.removeItem('JWT');
                } else {
                    //If token i stored and user was found, go to main
                    location.replace('./main.html');
                };
            };
        });

        xhr.open('GET', 'http://localhost:3800/checkuser', true);
        xhr.setRequestHeader('Authorization', token);
        xhr.send();
    };
});

//Redirect to signup
signUpBtn.addEventListener('click', ()=> {
    window.location.href = './signup.html';
});

loginBtn.addEventListener('click', ()=> {

    //Validates if inputs was succesful or not
    let inputError = validateUserInput();

    if(!inputError) {
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';

        //Gets value from inputs
        let inputsFromLogin = {
            username: username.value,
            password: password.value
        };

        //Request call to server
        xhr.addEventListener('readystatechange', function(){
            if (this.readyState === 4) {
                const res = this.response;
                if (res.status === 'OK') {
                    alert('User or password is wrong');
                } else {
                   //Signs the token to localstorage and redirect if everything went well
                   if (localStorage.getItem('JWT')) {
                        localStorage.removeItem('JWT');
                        localStorage.setItem('JWT', res);
                    } else {
                        localStorage.setItem('JWT', res);
                    };
                    //Replaces the webpage when success
                    location.replace('./main.html');
                };
            };
        });

        xhr.open('POST', 'http://localhost:3800/login', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(inputsFromLogin));

    } else {
        //Remember to remove alert
    };
    
});
