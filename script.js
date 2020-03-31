'use strict';

let money = 700; //Доход за месяц
let income = 'Freelance'; //строка с дополнительными доходом (например: фриланс)
let addExpenses = 'Internet, Taxi, Communal'; //строка с перечислением дополнительных расходов через запятую (интернет, такси, коммуналка)
let deposit = true; //любое булево значение
let mission = 1000; //любое число (Какую сумму хотите накопить)
let period; //число от 1 до 12 (месяцев)
let budgetDay;
let budgetMonth;
let expenses1;
let expenses2;
let amount1;
let amount2;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' долларов');
console.log(addExpenses.toLowerCase());
console.log(addExpenses.split(', '));

money = +prompt('Ваш месячный доход?');
console.log(money);
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
console.log(addExpenses);
deposit = confirm('Есть ли у вас депозит в банке?');
console.log(deposit);

expenses1 = prompt('Введите обязательную статью расходов:');
console.log(expenses1);
amount1 = +prompt('Во сколько это обойдется?');
console.log(amount1);
expenses2 = prompt('Введите обязательную статью расходов:');
console.log(expenses2);
amount2 = +prompt('Во сколько это обойдется?');
console.log(amount2);
budgetMonth = money - (amount1 + amount2); //бюджет на месяц
console.log('Бюджет на месяц ' + budgetMonth);
period = budgetMonth / mission;
console.log(Math.ceil(period)); 
budgetDay = budgetMonth / 30; //дневной бюджет1500
console.log(Math.floor(budgetDay));


if(budgetDay >= 1200) {
    console.log('У вас высокий уровень дохода');
}else if(budgetDay >= 600 && budgetDay < 1200) {
    console.log('У вас средний уровень дохода');
}else if(budgetDay < 600 && budgetDay >= 0) {
    console.log('К сожалению у вас уровень дохода ниже среднего');
}else {
    console.log('Что то пошло не так');
}


