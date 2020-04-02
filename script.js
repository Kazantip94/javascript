'use strict';

let money = 700; //Доход за месяц
let income = 'Freelance'; //строка с дополнительными доходом (например: фриланс)
let addExpenses = 'Internet, Taxi, Communal'; //строка с перечислением дополнительных расходов через запятую (интернет, такси, коммуналка)
let deposit = true; //любое булево значение
let mission = 1000; //любое число (Какую сумму хотите накопить)
let period; //число от 1 до 12 (месяцев)
let budgetDay;
let expenses1;
let expenses2;
let amount1;
let amount2;

let showTypeOf = function(data) {
    console.log(data, typeof(data));
}
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log(income.length);


money = +prompt('Ваш месячный доход?');
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
console.log(Array(addExpenses));
deposit = confirm('Есть ли у вас депозит в банке?');
expenses1 = prompt('Введите обязательную статью расходов:');
amount1 = +prompt('Во сколько это обойдется?');
expenses2 = prompt('Введите обязательную статью расходов:');
amount2 = +prompt('Во сколько это обойдется?');

function getExpensesMonth(a, b) {
    return a + b;  
}
let sum = getExpensesMonth(amount1, amount2);
console.log(sum);

function getAccumulatedMonth(a, b) {
    return a - b;
}

getAccumulatedMonth(money, sum);

let accumulatedMonth = getAccumulatedMonth(money, sum);

budgetDay = accumulatedMonth / 30; 
console.log(Math.floor(budgetDay));



function getTargetMonth(a, b) {
    return a / b;
}

getTargetMonth(accumulatedMonth, mission);

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