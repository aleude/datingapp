//-Elements from body:
let text = document.getElementById('interests');
let saveBtn = document.getElementById('savebutton');


//- Eventlisteners:

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


