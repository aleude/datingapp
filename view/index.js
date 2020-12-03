

//Eventlistener to redirect users who already are logged in.
document.addEventListener('DOMContentLoaded', ()=> {
    if(localStorage.getItem('JWT') == true) {
        //TJEK HER
        location.replace('./main.html');
        window.location.href = './main.html';
    };
});