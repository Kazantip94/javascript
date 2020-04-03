'use strict';

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money; //Доход за месяц
let income = 'Freelance'; //строка с дополнительными доходом (например: фриланс)
let addExpenses = 'Internet, Taxi, Communal'; //строка с перечислением дополнительных расходов через запятую (интернет, такси, коммуналка)
let deposit = true; //любое булево значение
let mission = 1000; //любое число (Какую сумму хотите накопить)
let budgetDay;
let expenses = [];

let start = function() {
    do {
        money = prompt('Ваш месячный доход?');
    }
    while(!isNumber(money));
};
start();

let showTypeOf = function(data) {
    console.log(data, typeof(data));
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
console.log(Array(addExpenses));
deposit = confirm('Есть ли у вас депозит в банке?');
console.log(deposit);

let getExpensesMonth = function() {
    let sum = 0;
    let cost;
   
    for (let i = 0; i < 2; i++) {
        expenses[i] = prompt('Введите обязательную статью расходов:');
        
        do{
            cost = prompt('Во сколько это обойдется?');
        } while(!isNumber(cost));
        sum += +cost;
    }  
         return sum;
};


let expensesAmount = getExpensesMonth();
console.log(expensesAmount);
console.log('Расходы за месяц: ' + expensesAmount);

let getAccumulatedMonth = function() {
    return money - expensesAmount;
};

let accumulatedMonth = getAccumulatedMonth();
console.log(accumulatedMonth);

budgetDay = accumulatedMonth / 30; 
console.log(Math.floor(budgetDay));

let getTargetMonth = function() {
    let period = mission / accumulatedMonth;

    if(period > 0) {
        return('Цель будет достигнута');
    } else {
        return('Цель не будет достигнута');
    }
};
console.log(getTargetMonth());

let getStatusIncome = function (){
    if(budgetDay >= 1200) {
        return ('У вас высокий уровень дохода');
    }else if(budgetDay >= 600 && budgetDay < 1200) {
        return ('У вас средний уровень дохода');
    }else if(budgetDay < 600 && budgetDay >= 0) {
        return ('К сожалению у вас уровень дохода ниже среднего');
    }else {
        return ('Что то пошло не так');
    }
};

console.log(getStatusIncome());