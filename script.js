'use strict';

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let start = document.getElementById('start'),
    btnPlus = document.getElementsByTagName('button'),
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1],
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    depositCheck = document.querySelector('#checkbox'),
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    incomeItems = document.querySelectorAll('.income-items'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount');
    
    



    let appData = {
        budget: 0,
        budgetDay: 0,
        budgetMonth: 0,
        expensesMonth: 0,
        income: {},
        incomeMonth: 0,
        addIncome: [],
        expenses: {},
        addExpenses: [],
        deposit: false,
        percentDeposit: 0,
        moneyDeposit: 0,

        start: function() {
    
            appData.budget = +salaryAmount.value;
            appData.getExpenses();
            appData.getIncome();
            appData.getExpensesMonth();
            appData.getAddExpenses();
            appData.getAddIncome();
            appData.getBudget(); 
            appData.showResult();

        },
        showResult: function() {
            budgetMonthValue.value = appData.budgetMonth;
            budgetDayValue.value = appData.budgetDay;
            expensesMonthValue.value = appData.expensesMonth;
            additionalExpensesValue.value = appData.addExpenses.join(', ');
            additionalIncomeValue.value = appData.addIncome.join(', ');
            targetMonthValue.value = Math.ceil(appData.getTargetMonth());
            
            incomePeriodValue.value = appData.calcPeriod();
            periodSelect.addEventListener('input', () =>{
                incomePeriodValue.value = this.calcPeriod();
            });
            
            
   
        },
        
        addExpensesBlock: function() {   
            let cloneExpensesItem = expensesItems[0].cloneNode(true);
            expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
            expensesItems = document.querySelectorAll('.expenses-items');

            if(expensesItems.length === 3) {
                expensesPlus.style.display = 'none';
            }
        },
        addIncomeBlock: function() {
            let cloneIncomeItem = incomeItems[0].cloneNode(true);
            incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
            incomeItems = document.querySelectorAll('.income-items');

            if(incomeItems.length === 3) {
                incomePlus.style.display = 'none';
            }
        },
        getExpenses: function() {
            expensesItems.forEach(function(item){
                let itemExpenses = item.querySelector('.expenses-title').value;
                let cashExpenses = item.querySelector('.expenses-amount').value;

                if(itemExpenses !== '' && cashExpenses !== '') {
                    appData.expenses[itemExpenses] = cashExpenses;
                }
            });
        },
       
        getIncome: function() {
            incomeItems.forEach(function(item) {
                let itemIncome = item.querySelector('.income-title').value;
                let cashIncome = item.querySelector('.income-amount').value;
                
                if(itemIncome !== '' && cashIncome !== '') {
                    appData.income[itemIncome] = cashIncome;
                }
            });
            
            for(let key in appData.income) {
                appData.incomeMonth += +appData.income[key];
            }

        },
        getAddExpenses: function() {
            let addExpenses = additionalExpensesItem.value.split(',');
            addExpenses.forEach(function(item){
                item = item.trim();
                if(item !== '') {
                    appData.addExpenses.push(item);
                }
            });
        },
        getAddIncome: function() {
            additionalIncomeItem.forEach(function(item){
                let itemValue = item.value.trim();
                if(itemValue !== ''){
                    appData.addIncome.push(itemValue);
                }
            });
        },
       
        getExpensesMonth: function() {
            for (let key in appData.expenses) {
                appData.expensesMonth += +appData.expenses[key];
            }
        },
        getBudget: function() {
            appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
            appData.budgetDay = Math.floor(appData.budgetMonth / 30);
        },
        getTargetMonth: function() {
            return targetAmount.value / appData.budgetMonth;
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
        },
        getInfoDeposit: function() {
            if(appData.deposit) {
                do{
                    appData.percentDeposit = prompt('Какой годовой процент?', '10');
                } while(!isNumber(appData.percentDeposit));

                do{
                    appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
                } while(!isNumber(appData.moneyDeposit));
            }
        },

        calcPeriod: function() {
            return appData.budgetMonth * periodSelect.value;

        }
    };


    start.addEventListener('click', appData.start);


    expensesPlus.addEventListener('click', appData.addExpensesBlock);
    incomePlus.addEventListener('click', appData.addIncomeBlock);
   

    periodSelect.addEventListener('input', function(){
        periodAmount.innerHTML = this.value;
    });

    start.disabled = true;
    salaryAmount.addEventListener('input', function() {
        if(isNumber(this.value)){
            start.disabled = false;
        }else{
            start.disabled = true;
        }
    });


    