//- Elements from body:
let username = document.getElementById('username');
let password = document.getElementById('password');
let loginBtn = document.getElementById('loginbutton');
let signUpBtn = document.getElementById('signupbutton');
let numOfUserText = document.getElementById('user-number-text');

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
        message = 'Username or password is missing.';
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

    //If a token was found, validate token
    if(localStorage.getItem('JWT')) {
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        
        let token = localStorage.getItem('JWT');
        
        xhr.addEventListener('readystatechange', function(){
            if (this.readyState === 4) {
                const res = this.response;

                //If user wasn't found, reset token
                if (res.status === 404) {
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

    } else {
        //If there is no users. Show how many is in the app already
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';

        xhr.addEventListener('readystatechange', function(){
            if (this.readyState === 4) {
                const res = this.response;
                console.log('h')
                //If everything went fine
                if (res.status === 200) {
                    //Show the number of total user to new user
                    numOfUserText.innerText = `Haven't found love yet? Join with more than ${res.num} other singles!`;
                    
                }; 
            };
        });

        xhr.open('GET', 'http://localhost:3800/usernumber', true);
        xhr.send();


    }
});

//Redirect to signup
signUpBtn.addEventListener('click', ()=> {

    window.location.href = './signup.html';

});

//Login user
loginBtn.addEventListener('click', ()=> {

    //Validates if inputs was succesful or not
    let inputError = validateUserInput();

    if(!inputError) {

        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';

        //Gets value from inputs
        let data = {
            username: username.value,
            password: password.value
        };

        //Request call to server
        xhr.addEventListener('readystatechange', function(){
            if (this.readyState === 4) {

                const res = this.response;

                if (res.status === 404) {

                    alert('User or password is wrong, try again');

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
        xhr.send(JSON.stringify(data));

    };

});
