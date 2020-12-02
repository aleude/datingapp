
//Testing a calcAge function

let t = '1999-3-4';


function calcAge(birthday) {
    let arr = birthday.split('-');
    let year = parseInt(arr[0]);
    let month = parseInt(arr[1]);
    let date = parseInt(arr[2]);


    var birth = new Date(year,month,date);
    var difference = Date.now() - birth.getTime();
    var agediff = new Date(difference);
    var fullAge = Math.abs(agediff.getUTCFullYear() - 1970);
    return fullAge;
}


//console.log(calcAgee(1999,4,3))
console.log(calcAge(t));