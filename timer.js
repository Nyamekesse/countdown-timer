const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
]
const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
]

const giveaway = document.querySelector('h4.giveaway');
const dateInfo = document.querySelector('.date-info');
const items = document.querySelectorAll('.square-boxes .update');

// IN ORDER TO MAKE THIS PROJECT ALWAYS WORK, THE FUTURE IS SET DYNAMICALLY BY GETTING THE CURRENT DATE AND ADDING 10 DAYS TO IT
const tempDate = new Date();        /*THIS FUNCTION GETS THE CURRENT DATE YOU'RE ACCESSING THE PROJECT AND ADDS 0 DAYS TO IT*/
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();

// SETTING AN ACTUAL FUTURE DATE OR THE EXPIRING DATE
let futureDate = new Date(tempYear, tempMonth, tempDay + 10, 13, 30, 0); /*ADDING THE 10 DAYS TO THE CURRENT DATE GOTTEN*/
/*DYNAMICALLY TYPING THE EXPIRING DATE*/
// let futureDate = new Date(2021, 11, 10, 18, 30, 0); 

// GETTING INDIVIDUAL VALUES FROM THE EXPIRING DATE OBJECT
const year = futureDate.getFullYear();
const month = futureDate.getMonth();
const day = futureDate.getDate();
const weekDay = futureDate.getDay();
const hours = futureDate.getHours();
const min = futureDate.getMinutes();
let amORpm = "";


const futureTime = futureDate.getTime();    /*GETTING FUTURE TIME IN MILLISECONDS*/

function calcRemainingTime() {
    // CURRENT DAY IN MILLISECONDS
    let today = new Date().getTime();
    const calc = futureTime - today;
    
    // CALCULATE SECONDS, MINS, HOUR & DAY IN MILLISECONDS
    /* 1s => 1000ms 1min => 60s 1hr => 60min 1d => 24hr */
    
    const oneDay = 24 * 60 * 60 * 1000;
    const oneHour = 60 * 60 * 1000;
    const oneMinute = 60 * 1000;
    // CALCULATING REMAINING VALUES
    let days = Math.floor(calc / oneDay);      /* WE USE THE MATH.FLOOR TO ROUND THE GIVING DAYS LEFT T A WHOLE NUMBER*/
    let hours = Math.floor((calc % oneDay) / oneHour);  /*HERE WE FIND THE MODULUS DIVISION IN ORDER TO GET THE REMAINDER WHICH WILL BE THE HOURS AND THEN DIVIDE BY THE HOURS TO GET IT IN HOURS*/
    let minutes = Math.floor((calc % oneHour) / oneMinute); /* WE FIND THE REMAINDER WHEN WE DO MODULUS DIVISION OF THE CALCULATED TIME LEFT BY THE ONE HOUR, AFTER THAT WE DIVIDE BY THE ONE MINUTE TO GET IT IN MINUTE*/
    let seconds = Math.floor((calc % oneMinute) / 1000); /* THE SAME THING DONE TO THE ABOVE VARIABLES WAS APPLIED TO HERE IN GETTING THE SECONDS LEFT*/
    
    // THIS FUNCTION MAKES SURE THAT WHEN THE NUMBER RETURNED IS LESS THAN 10 WE ADD A ZERO IN FRONT TO GET A DOUBLE NUMBER eg. 04,06 etc. TO MAKE IT LOOK NICE
    function formatter(val){
        if(val < 10) {
            return `0${val}`; 
        }
        return val;
    }
    
    const values = [days, hours, minutes, seconds];
    items.forEach((item,index)=> {
        item.innerHTML = formatter(values[index]);  /*AFTER HERE WE PASS THE VALUE[INDEX] AS AN ARGUMENT TO RUN THROUGH HTE CHECK STATEMENT*/
    })

    if (calc < 0){
        clearInterval(countdown);   // THIS MAKES SURE THE COUNT DOWN STOPS WHEN THE DAYS REACHES 0 TO AVOID NEGATIVE RESULTS
    }
}

// COUNTDOWN FUNCTION TO AUTO UPDATE THE TIME EVERY SECOND 
let countdown = setInterval(calcRemainingTime, 1000);
calcRemainingTime();

function showText(min, hours, amORpm) {
    min < 10 ? min = '0' + min : min;   /*DYNAMICALLY INSERTING 0 IN FRONT INCASE MINUTES IS LESS THAN 10 TO IMPROVE FORMATTING*/
    hours < 12 ? amORpm='am' : amORpm='pm'; /*DYNAMICALLY CHOOSING WHETHER AM OR PM DEPENDING ON THE HOURS*/
    // SETTING UP A STRING TEMPLATE AND INSERTING THE VARIOUS VALUES GOTTEN IN IT
    giveaway.innerHTML = `Giveaway ends on ${weekdays[weekDay]}, ${day} ${months[month]} ${year}, exactly ${hours}:${min} ${amORpm}.`;
}
showText(min, hours, amORpm);   /*CALLING THE FUNCTION AND PASSING THE IN THE ARGUMENTS*/