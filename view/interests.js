//- Elements from header
let backBtn = document.getElementById('back-btn');
let logoutBtn = document.getElementById('logout-btn');

//- Elements from body
let interestField = document.getElementById('interests');
let saveBtn = document.getElementById('savebutton');

//- Function


//- Eventlisteners and reqeusts:

//Validates if user exists in database and have correct token
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

                    //Updates textfield with users' interest
                    interestField.value += res.text;
                
                };
            };
        });

        xhr.open('GET', 'http://localhost:3800/interests/get', true);
        xhr.setRequestHeader('Authorization', token);
        xhr.send();

    } else {

        //If users don't have any token. Redirect to login
        location.replace('./index.html');
    };

});

//Updates interests
saveBtn.addEventListener('click', () => {

    const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
    
        let token = localStorage.getItem('JWT');
    
        let data = {
            text: interestField.value
        };
    
        xhr.addEventListener('readystatechange', function(){
            if (this.readyState === 4) {
                let res = this.response;
                if (res === null) {
                    alert(`Something went wrong, couldn't update interests`);
                } else {

                    //Reload site if everything went well
                    location.reload();
                
                };
            };
        });
    
        xhr.open('PUT', 'http://localhost:3800/interests/update', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', token);
        xhr.send(JSON.stringify(data));    

});

backBtn.addEventListener('click', ()=> {

    window.location.href = './settings.html';
});

logoutBtn.addEventListener('click', ()=> {

    if (localStorage.getItem('JWT')) {
        localStorage.removeItem('JWT');
    }
    location.replace('./index.html');
});