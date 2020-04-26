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
            menu = document.querySelector('menu');
  
        const hendlerMenu = () =>{
            
            menu.classList.toggle('active-menu');
            
        };
    
        btnMenu.addEventListener('click', hendlerMenu);

        menu.addEventListener('click', (event) => {
            let target = event.target;

            if(target.classList.contains('close-btn')) {
                hendlerMenu();
            }else if(target.closest('ul>li')){
                hendlerMenu();
            }
        });    
    };

    toggleMenu();

    //popup
    const togglePopUp = () =>{
        const popUp = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn');
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
                        popUp.style.display = 'block';
                        popUpContent.style.transition = '1s';
                        popUpContent.style.left = left + '%';
                    }
            }else{
                popUp.style.display = 'block';
            }

          
        };
        
        popupBtn.forEach((elem) => elem.addEventListener('click', frame));

        popUp.addEventListener('click', (event) =>{
            let target = event.target;

            if(target.classList.contains('popup-close')) {
                popUp.style.display = 'none';
                togglePopUp();
  
            }else{
                target = target.closest('.popup-content');

                if(!target) {
                    popUp.style.display = 'none';
                    togglePopUp();
                }
            }
        });
    };

    togglePopUp();

    //табы
    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

            const toggleTabContent = (index) => {
                for(let i = 0; i < tabContent.length; i++) {
                    if(index === i) {
                        tab[i].classList.add('active');
                        tabContent[i].classList.remove('d-none');
                    }else{
                        tab[i].classList.remove('active');
                        tabContent[i].classList.add('d-none');
                    }
                }
            };

            tabHeader.addEventListener('click', (event) => {
                let target = event.target;

                    target = target.closest('.service-header-tab');

                    if(target) {
                        tab.forEach((item, i) => {
                            if(item === target) {
                                toggleTabContent(i);                        
                            }
                        }); 
                    }
            });
    };

    tabs();
});