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
    for (let i=0; i<radiobutton.length; i++) {
        if (radiobutton[i].checked) {
            return radiobutton[i].value;
        };
    };

};

//- Eventlisteners and API-calls

//Check if user is already logged in
document.addEventListener('DOMContentLoaded', ()=> {
    if(localStorage.getItem('JWT') == true) {
        location.replace('./main.html');
    };
});

//Validate password when typing
password.addEventListener('keyup', ()=> {
    //Length of password
    let x = 8;
    let input = password.value;

    if (input.length < x) {
        passValidate.innerHTML = `Password must be longer than ${x} characters`
    } else {
        passValidate.innerHTML = '';
    };
});

//Back button redirect
backBtn.addEventListener('click', ()=> {
    location.replace('./index.html');
})




//Just to test.
signUp.addEventListener('click', ()=> {

    console.log(checkRadioBtn(gender));
});


//Sign up part:

/*
1) Tag alt data fra HTML og lav det til JSON
2) Send alt data til serveren
3) Serveren validere, om useren eksisterer eller ej
4) Eksisterer useren ikke skrives denne user i alle 3 json-filer
5) Når useren er skrevet signes og sendes
en JWT-token retur med username som payload til klienten.
6) I klienten (efter if-statement) gemmes denne JWT token i localStroage
7) Lige efter redirectes useren til main.html

4a) Eksisterer useren sendes en boolean tilbage like (req.fejl === true)
5a) I klineten håndteres dette med if-statement, og hvis boolean er true,
så gives en fejlbesked til gennem innerHTML til p-tagget

MÅSKE return null i stedet for bool

*/
