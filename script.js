'use strict';

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money; //Доход за месяц
let start = function() {
    do {
        money = prompt('Ваш месячный доход?');
    }
    while(!isNumber(money));
};
start();

let appData = {
    budget: +money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    income: {},
    addincome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 50000,
    period: 3,

    //Методы
    asking: function() {
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        appData.addExpenses = addExpenses.toLowerCase().split(',');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');

        for (let i = 0; i < 2; i++) {
           let expensesItem = prompt('Введите обязательную статью расходов:');
           let cost;
            do{
                cost = prompt('Во сколько это обойдется?');
            } while(!isNumber(cost));

            appData.expenses[expensesItem] = +cost; 
        }          
    },
    getExpensesMonth: function() {
        for (let key in appData.expenses) {
            appData.expensesMonth += +appData.expenses[key];
        }
    },
    getBudget: function() {
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    getTargetMonth: function() {
        return Math.ceil(appData.mission / appData.budgetMonth);
    },
    getStatusIncome: function() {
        if (appData.budgetDay >= 1200) {
            return ('У вас высокий уровень дохода');
        }else if(appData.budgetDay >= 600 && appData.budgetDay < 1200) {
            return ('У вас средний уровень дохода');
        }else if(appData.budgetDay < 600 && appData.budgetDay >= 0) {
            return ('К сожалению у вас уровень дохода ниже среднего');
        }else if(appData.budgetDay < 0){
            return ('Что то пошло не так');
        }
    }
};



appData.asking();
appData.getExpensesMonth();
appData.getBudget();


let expensesAmount = appData.expensesMonth;
let period = appData.getTargetMonth();

console.log(`Расходы за месяц: ${expensesAmount}` );

if(period > 0) {
    console.log(`Цель будет достигнута за ${period}`);
} else {
    console.log(`Цель не будет достигнута`);
}

console.log(appData.getStatusIncome());

// for (let i in appData) {
//     console.log('Наша программа включает в себя данные: ' + i + ' ' + appData[i]);   
// }
