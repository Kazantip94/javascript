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

           timerHours.textContent = '00';
           timerMinutes.textContent = '00';
           timerSeconds.textContent = '00';
           
        }
    }

    
    updateClock();
    }

    countTimer('24 April 2020');


    //Menu

    const toggleMenu = () =>{

        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItems = menu.querySelectorAll('ul>li');
        
        
        const hendlerMenu = () =>{
            
            menu.classList.toggle('active-menu');
            
        };
        btnMenu.addEventListener('click', hendlerMenu);
        closeBtn.addEventListener('click', hendlerMenu);
        menuItems.forEach((elem) => elem.addEventListener('click', hendlerMenu));

    };

    toggleMenu();


    const togglePopUp = () =>{
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popUpClose = document.querySelector('.popup-close');
        let popUpContent = document.querySelector('.popup-content'),
            left = 0;
        let id;
        

        const frame = () => {

            if(screen.width > 768){
                id = setInterval(frame, 1);
                if(left === 38) {
                        clearInterval(id);
                    }else{
                        left++;
                        popup.style.display = 'block';
                        popUpContent.style.transition = '1s';
                        popUpContent.style.left = left + '%';
                    }
            }else{
                popup.style.display = 'block';
            }

          
        };
        
        popupBtn.forEach((elem) => elem.addEventListener('click', frame));

        popUpClose.addEventListener('click', () =>{
            popup.style.display = 'none';  
            togglePopUp();
  
        });

    };

    togglePopUp();
});