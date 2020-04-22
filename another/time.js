'use strict';

let date = new Date();

function formatDate () {
    let day = document.querySelector('#one'),
        week = document.querySelector('#two'),
        timeNow = document.querySelector('#three'),
        nY = document.querySelector('#four');

function goodDay() {
    let hour = date.getHours(),
        dayname = '';

    if(hour >= 5 && hour < 12) {
        dayname = 'Доброе утро';
    }else if(hour>=12 && hour<18) {
        dayname = 'Доброе день';
    }else if(hour>=18 && hour<24) {
        dayname = 'Доброе вечер';
    }else if(hour>=0 && hour<5){
        dayname = 'Доброе ночи';
    }

    day.innerHTML += dayname; 
            
}

function weeks() {
    let weekArr = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Субота"],
        weekDay = date.getDay();

    week.innerHTML += 'Сегодня: ' + weekArr[weekDay];
}

function timeNows() {
    let time = date.toLocaleString([], {hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit'});

    timeNow.innerHTML += 'Текущее время: ' + time;
}

function daysLeftNewYear(){
    let ny = new Date(date.getFullYear() + 1, 0, 1, 0, 0, 0),
        msPerDay = 24*60*60*1000,
        daysLeft =  Math.floor((ny.getTime() - date.getTime()) / msPerDay),
        dayname = '',
        ds = '' + daysLeft,
        dd = parseInt(ds.substr(ds.length - 1));

        if(daysLeft > 4 && daysLeft < 21){
            dayname = " дней";
        }else if(dd === 1) {
            dayname= " день";
        }else if(dd === 2||dd === 3||dd === 4) {
            dayname= " дня";
        }else{
            dayname = " дней";
        }
    nY.innerHTML += 'До нового года осталось: ' + daysLeft + dayname;
}

goodDay();
weeks();
timeNows();
daysLeftNewYear();

}
formatDate();