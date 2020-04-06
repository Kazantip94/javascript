'use strict';

const isNum = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

const getRandomNum = function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
};

const getCounter = function() {
    let counter = 0;
    return function() {
        return ++counter;
    }
};

const gameRandom = function(attemps) {
    const randomNum = getRandomNum(1, 100);
    const counter = getCounter();

    return (function checkNumber() {
        const count = counter();
        const userNumber = prompt('Попробуй угадать число?');

        if(isNum(userNumber)) {
            let repeat = false;
            if(count < attemps) {
                const num = +userNumber;
                if(num > randomNum) {
                    alert('Загаданое число меньше');
                    return checkNumber();
                }
                if(num < randomNum) {
                    alert('Загаданое число больше');
                    return checkNumber();
                }
                repeat = confirm('Вы угадали, молодец! Хотите сыграть еще?');

            }   else {
                repeat = confirm('Количество попыток закончилось! Хотите сыграть еще?');
            }
            if(repeat) gameRandom(attemps);

        }   else {
            if(userNumber !== null){
                alert('Введи число');
                checkNumber();
            }
        }
        alert('Пока друг!');
    }());
};

gameRandom(10);



