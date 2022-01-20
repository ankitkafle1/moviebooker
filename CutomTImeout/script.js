const countdownForm = document.getElementById('countdownForm');
const inputContainer = document.getElementById('input-container');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeElInfo= document.getElementById('conplete-info');
const completeBtn = document.getElementById('complete-button');

let countdownTitle = '';
let countdownDate='';
let countdownValue ='';
let countdownActive;
let savedCountdown;

const second=1000;
const minute= second *60;
const hour = minute *60;
const day = hout *24;

// Set Date Input Min and Value with Today's Date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min',today);

//Populate Coundtodowm/ complete UI
function updateDOM() {
    countdownActive = setInterval(()=>{
        const now= new Date().getTime();
        const distance = countdownValue -now;
        const days = Math.floor(distance/day);
        const hours = Math.floor((distance%day)/hour);
        const minutes = Math.floor((distance%minute)/second);
        //Hide Input
        inputContainer.hidden = true;
        //If the countdown has ended, show final state
        if(distance<0) {
            countdownEl.hidden= true;
            clearInterval(countdownActive);
            completeElInfo.textContent=`${countdownTitle} finished on ${countdownDate}`;
            completeEl.hidden= false;
        }else {
            //else, show the countdown in progress
            countdownTitle.textContent=`${countdownTitle}`;
            timeElements[0].textContent=`${days}`;
            timeElements[1].textContent=`${hours}`;
            timeElements[2].textContent=`${minutes}`;
            timeElements[3].textContent=`${seconds}`;
            completeEl.hidden= true;
            countdownEl.hidden = false;
        }
    },second);
}

function updateCountDown(e) {
    e.preventDefault();
    //SEt title and date, save to local storeage
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    savedCountdown ={
        title: countdownTitle,
        Date: countdownDate,

    };
    localStorage.setItem('countdown', JSON.stringify(savedCountdown));

    if(countdownDate===''){
        alert("please select a date for the countdown.");

    }else{
        //GEt number version of current Date,
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }

}
function reset(){
    //hide countdown, show input form
    countdownEl.hidden = true;
    completeEl.hidden = true;
    inputContainer.hidden= false;
    //stop the countdown
    clearInterval(countdownActive);
    //Reset values, remove localStorage item
    countdownTitle='';
    countdownDate='';
    localStorage.removeItem('countdown');
}

function restorePreviousCountdown(){
    //Get countdown form local Storeage if available
    if(localStorage.getItem('countdown')) {
        inputContainer.hidden=true;
        savedCountdown= JSON.parse(localStorage.getItem('countdown'));
        countdownTitle= savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}

//Event Listener
countdownForm.addEventListener('submit',updateCountDown);
countdownBtn.addEventListener('click',reset);
completeBtn.addEventListener('click',reset);
//On load, check localStorage
restorePreviousCountdown();