window.addEventListener('DOMContentLoaded', function() {
    'use strict';


    //Timer
    function countTimer(deadline) {
        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');
        function leadZero(n) {return(n < 10 ? '0' : '') + n; }
        
    function getTimeRemaining() {
        let dateStop = new Date(deadline).getTime(),
            dateNow = new Date().getTime(),
            timeRemaining = (dateStop - dateNow) / 1000,
            seconds = Math.floor(timeRemaining % 60),
            minutes = Math.floor((timeRemaining / 60) % 60),
            hours = Math.floor(timeRemaining / 60 / 60);
            return {timeRemaining, hours, minutes, seconds};
        
    }
    
    let interval = setInterval(updateClock, 1000);


    function updateClock() {
        let timer = getTimeRemaining();

        timerHours.textContent = leadZero(timer.hours);
        timerMinutes.textContent = leadZero(timer.minutes);
        timerSeconds.textContent = leadZero(timer.seconds);

        if(timer.timeRemaining < 0){
           clearInterval(interval);  
        }
    }
    updateClock();
    }

    countTimer('23 April 2020');
});