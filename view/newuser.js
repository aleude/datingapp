//-Elements from body:
let text = document.getElementById('interests');
let saveBtn = document.getElementById('savebutton');
let welcomeHeadline = document.getElementById('welcome-headline');


//- Eventlisteners:

//Validates if user exists in database and have correct token
document.addEventListener('DOMContentLoaded', ()=> {
    //If users has a token, validates if the token is accepted
    if(localStorage.getItem('JWT')) {

        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        //Gets token
        let token = localStorage.getItem('JWT');

        xhr.addEventListener('readystatechange', function(){
            if (this.readyState === 4) {
                const res = this.response;
                //If user wasn't found, redirect to login

                if (res.status === 404) {
                    location.replace('./index.html');

                } else {                   
                    //If everything is fine. Show username in welcome headline
                    welcomeHeadline.innerText = `Welcome to the site, ${res.firstname}`;

                };
            };
        });

        xhr.open('GET', 'http://localhost:3800/checkuser', true);
        xhr.setRequestHeader('Authorization', token);
        xhr.send();

    } else {
        //If users don't have any token. Redirect to login
        location.replace('./index.html');
    };

});


//Saving data from interests
saveBtn.addEventListener('click', ()=> {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    //Gets token from localstroage
    let token = localStorage.getItem('JWT');

    //Gets value from textfield
    let data = {
        interests: text.value
    };

    xhr.addEventListener('readystatechange', function(){
        if (this.readyState === 4) {
            const res = this.response;

            if (res.status === 404) {
                //If something went wrong, alert user and go back to login. 
                alert(`Something went wrong`);
                //Relocates to the login page
                location.replace('./index.html');

            } else {
                //If everything went fine, go to main page
                location.replace('./main.html');

            };
        };
    });
    
    xhr.open('POST', 'http://localhost:3800/interests/post', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', token);
    xhr.send(JSON.stringify(data));
});


