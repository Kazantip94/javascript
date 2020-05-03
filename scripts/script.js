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

    // Слайдер
    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
            btn = document.querySelectorAll('.portfolio-btn'),
            slider = document.querySelector('.portfolio-content');
        let dot;

        const addDot = document.querySelector('.portfolio-dots');

        const addDots = () => {
            for(let i = 0; i < slide.length; i++) {
                let li = document.createElement('li');
                li.classList.add('dot');
                addDot.appendChild(li);  
            }
            dot = document.querySelectorAll('.dot');
            dot[0].classList.add('dot-active');

        };
        addDots();

        let currentSlide = 0,
            interval;

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };
        
        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if(currentSlide >= slide.length){
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };

        const startSlide = (time = 3000000) => {
            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', (event) => {
            event.preventDefault();

            let target = event.target;

            if(!target.matches('.portfolio-btn, .dot')) {
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if(target.matches('#arrow-right')) {
                currentSlide++;
            }else if(target.matches('#arrow-left')) {
                currentSlide--;
            }else if(target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    if(elem === target) {
                        currentSlide = index;
                    }
                });
            }

            if(currentSlide >= slide.length) {
                currentSlide = 0;
            }

            if(currentSlide < 0) {
                currentSlide = slide.length -1;
            }

            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        });

        slider.addEventListener('mouseover', (event) => {
            if(event.target.matches('.portfolio-btn') ||
            event.target.matches('.dot')) {
                stopSlide();
            }
        });

        slider.addEventListener('mouseout', (event) => {
            if(event.target.matches('.portfolio-btn') ||
            event.target.matches('.dot')) {
                startSlide();
            }
        });

        startSlide();
        
    };

    slider();

    //Наша команда
    const ourTeam = () => {
        const commandPhoto = document.querySelectorAll('.command__photo');
        let src;
        commandPhoto.forEach(item => {
            item.addEventListener('mouseover', function() {
                src = this.src;
                this.src = this.dataset.img;
            });
            item.addEventListener('mouseout', function() {
                this.src = src;
            });
        });
    };
    
    ourTeam();
    

    //Калькулятор

    const calc = (price = 100) => {
     
        const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcDay = document.querySelector('.calc-day'),
            calcCount = document.querySelector('.calc-count'),
            totalValue = document.getElementById('total'),
            calcItem = document.querySelectorAll('.calc-item');


        const countSum = () => {
            let total = 0,
                countValue = 1,
                dayValue = 1;

            const typeValue = calcType.options[calcType.selectedIndex].value,
                squareValue = +calcSquare.value;
            
            if((calcCount.value == 0 && calcCount.value !== '' ) || (calcDay.value == 0 && calcDay.value !== '' ) ) {
                totalValue.textContent = "0";
                return;
            }

            if(calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            }

            if(calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            }else if(calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            }
            
            if(typeValue && squareValue) {
                total = price * typeValue * squareValue * countValue * dayValue;
            }

            totalValue.textContent = Math.trunc(total);
        };

        calcItem.forEach(item  => {
            item.addEventListener('input', function () {
                // this.value = this.value.replace(/[^0-9+\.]/, '');
                this.value = this.value.replace(/^\.|[^\d\.]|\.(?=.*\.)|^0+(?=\d)/g, '');
            });
        });

        calcBlock.addEventListener('change', (event) => {
            const target = event.target;

            if(target.matches('select') || target.matches('input')) {

                countSum();

            }
        });
        
    };

    calc(100);

    // send-ajax-form

    const sendForm = () => {
        const errorMessage = 'Что то пошло не так...',
            loadMessage = 'Загрузка...',
            successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

        const form = document.querySelectorAll('form'),
            phone = document.querySelectorAll('.form-phone'),
            name = document.querySelectorAll('.form-name'),
            message = document.getElementById('form2-message');
   
        const statusMessage = document.createElement('div');
        statusMessage.style.cssText = 'font-size: 2rem; color:#fff;';

        form.forEach(item => {

            //Валидация формы
            item.addEventListener('input', function() {
                message.value = message.value.replace(/[^А-ЯЁ\s]/i, '');
                for(let i = 0; i < phone.length; i++) {
                    if(phone !== i){
                        phone[i].value = phone[i].value.replace(/[^0-9+]/, '');
                    }else{
                        console.log('Введите цыфри: ');
                    }
                }
                for(let j = 0; j < name.length; j++) {
                    if(name !== j){
                        name[j].value = name[j].value.replace(/[^А-ЯЁ\s]/i, '');
                    }else{
                        console.log('Введите буквы: ');
                    }
                }
            });
            item.addEventListener('submit', (event) => {
                event.preventDefault();
                item.appendChild(statusMessage);
                statusMessage.textContent = loadMessage;
                const formData = new FormData(item);
                let body = {};
    
                formData.forEach((val, key) => {
                    body[key] = val;
                });
                postData(body,
                    () => {
                        statusMessage.textContent = successMessage;
                        item.reset();
                    },
                    (error) => {
                        statusMessage.textContent = errorMessage;
                        console.log(error);
                    });
    
                });
        });

          const postData = (body, outputData, errorData) => {
            const request = new XMLHttpRequest();
            request.addEventListener('readystatechange', () => {
               
                if(request.readyState !== 4) {
                    return;
                }
                if(request.status === 200) {
                    outputData();
                } else {
                    errorData(request.status);
                }
            });
            request.open('POST', './server.php');
            request.setRequestHeader('Content-Type', 'application/json');
            request.send(JSON.stringify(body));
          };
    };
    sendForm();
});