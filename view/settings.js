//- Elements from header
let homeBtn = document.getElementById('home-btn');
let logoutBtn = document.getElementById('logout-btn');

//- Elements from body
let interestsBtn = document.getElementById('interests-btn');
let firstNameInput = document.getElementById('firstname');
let lastNameInput = document.getElementById('lastname');
let passwordInput = document.getElementById('password');
let saveBtn = document.getElementById('save-btn');
let deleteUserBtn = document.getElementById('deleteuser-btn');
let errorMessageTag = document.getElementById('errormessage');

//- Functions & Variables
let noError = true;
let errorMessage = '';


//- Eventlisteners and requests:

//Validates if user exists in database, have correct token and puts information ind input-fields
document.addEventListener('DOMContentLoaded', ()=> {

    //If users has a token, validates if the token is accepted
    if(localStorage.getItem('JWT')) {

        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        
        let token = localStorage.getItem('JWT');
        console.log(token);
        xhr.addEventListener('readystatechange', function(){
            if (this.readyState === 4) {
                const res = this.response;
                //If user wasn't found, redirect to login
                if (res === null) {
                    location.replace('./index.html');
                } else {

                    //Add user information to input fields
                    firstNameInput.value += res.firstname;
                    lastNameInput.value += res.lastname;
                    passwordInput.value += res.password;
                
                };
            };
        });

        xhr.open('GET', 'http://localhost:3800/user/info', true);
        xhr.setRequestHeader('Authorization', token);
        xhr.send();

    } else {

        //If users don't have any token. Redirect to login
        location.replace('./index.html');
    };

});

homeBtn.addEventListener('click', () => {

    window.location.href = './main.html';
});

logoutBtn.addEventListener('click', () => {

    if (localStorage.getItem('JWT')) {
        localStorage.removeItem('JWT');
    }
    location.replace('./index.html');
});

interestsBtn.addEventListener('click', () => {

    window.location.href = './interests.html';

})

saveBtn.addEventListener('click', () => {

    //Validates if password is ok
    if (passwordInput.value.length < 8) {
        noError = false;
        errorMessage += 'Your password must be longer than 8 characters. ';
    };

    //Validates if firstname is missing
    if (firstNameInput.value.length < 1) {
        noError = false;
        errorMessage += 'Your first name is missing. ';
    };

    //Validates if lastname is missing
    if (lastNameInput.value.length < 1) {
        noError = false;
        errorMessage += 'Your last name is missing. ';
    };

    if(noError) {
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
    
        let token = localStorage.getItem('JWT');
    
        let data = {
            firstname: firstNameInput.value,
            lastname: lastNameInput.value,
            password: passwordInput.value
        };
    
        xhr.addEventListener('readystatechange', function(){
            if (this.readyState === 4) {
                let res = this.response;
                if (res === null) {
                    alert(`Something went wrong, couldn't update profile`);
                } else {

                    //Reload site if everything went well
                    location.reload();
                
                };
            };
        });
    
        xhr.open('PUT', 'http://localhost:3800/user/update', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', token);
        xhr.send(JSON.stringify(data));            

    } else {
        //If something went wrong. Show error message
        errorMessageTag.innerText = errorMessage;
        errorMessage = '';
    };

});

deleteUserBtn.addEventListener('click', () => {

    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    
    let token = localStorage.getItem('JWT');
    
    xhr.addEventListener('readystatechange', function(){
        if (this.readyState === 4) {
            let res = this.response;
            if (res === null) {
                alert(`Something went wrong, couldn't delete profile`);
            } else {

                alert('Your user is now deleted');
                location.replace('./index.html');

            };
        };
    });
    
    xhr.open('DELETE', 'http://localhost:3800/user/delete', true);
    xhr.setRequestHeader('Authorization', token);
    xhr.send();            

});

