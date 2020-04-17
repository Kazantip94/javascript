'use strict';

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let start = document.getElementById('start'),
    cancel = document.getElementById('cancel'),
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
    inputBlock = document.querySelectorAll('input[type="text"]'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    incomeItems = document.querySelectorAll('.income-items'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount');
    
    
    const AppData = function() {

        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMont = 0;
        this.expensesMonth = 0;
        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0 ;
    };

    AppData.prototype.start = function() {
        this.budget = +salaryAmount.value;
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget(); 
        this.showResult();
    };
    AppData.prototype.reset = function() {
       cancel.style.display = 'none';
       start.style.display = 'block';
       this.budget = 0;
       this.budgetDay = 0;
       this.budgetMonth = 0;
       this.expensesMonth = 0;
       this.income = {};
       this.incomeMonth = 0;
       this.addIncome = [];
       this.expenses = {};
       this.addExpenses = [];
       this.deposit = false;
       this.percentDeposit = 0;
       this.moneyDeposit = 0;
       let input = document.querySelectorAll('input');
       input.forEach(item =>{
        item.value = '';
        item.removeAttribute('readOnly');
       });

    };
    
    AppData.prototype.showResult = function() {

        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        
        incomePeriodValue.value = this.calcPeriod();
        periodSelect.addEventListener('input', () =>{
            incomePeriodValue.value = this.calcPeriod();
        },this);
        
        
    };
    
    AppData.prototype.addExpensesBlock = function() {   
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');

        if(expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    };
    AppData.prototype.addIncomeBlock = function() {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');

        if(incomeItems.length === 3) {
            incomePlus.style.display = 'none';
        }
    };
    AppData.prototype.getExpenses = function() {
        expensesItems.forEach(function(item){
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;

            if(itemExpenses !== '' && cashExpenses !== '') {
                this.expenses[itemExpenses] = cashExpenses;
            }
        },this);
    };
   
    AppData.prototype.getIncome = function() {
        incomeItems.forEach(function(item) {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            
            if(itemIncome !== '' && cashIncome !== '') {
                this.income[itemIncome] = cashIncome;
            }
        },this);
        
        for(let key in this.income) {
            this.incomeMonth += +this.income[key];
        }

    };
    AppData.prototype.getAddExpenses = function() {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item){
            item = item.trim();
            if(item !== '') {
                this.addExpenses.push(item);
            }
        },this);
    };
    AppData.prototype.getAddIncome = function() {
        additionalIncomeItem.forEach(function(item){
            let itemValue = item.value.trim();
            if(itemValue !== ''){
                this.addIncome.push(itemValue);
            }
        },this);
    };
   
    AppData.prototype.getExpensesMonth = function() {
        for (let key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }
    };
    AppData.prototype.getBudget = function() {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    };
    AppData.prototype.getTargetMonth = function() {
        return targetAmount.value / this.budgetMonth;
    };
    AppData.prototype.getStatusIncome = function() {
        if (this.budgetDay >= 1200) {
            return ('У вас высокий уровень дохода');
        }else if(this.budgetDay >= 600 && this.budgetDay < 1200) {
            return ('У вас средний уровень дохода');
        }else if(this.budgetDay < 600 && this.budgetDay >= 0) {
            return ('К сожалению у вас уровень дохода ниже среднего');
        }else if(this.budgetDay < 0){
            return ('Что то пошло не так');
        }
    };
    AppData.prototype.getInfoDeposit = function() {
        if(this.deposit) {
            do{
                this.percentDeposit = prompt('Какой годовой процент?', '10');
            } while(!isNumber(this.percentDeposit));

            do{
                this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            } while(!isNumber(this.moneyDeposit));
        }
    };

    AppData.prototype.calcPeriod = function() {
        return this.budgetMonth * periodSelect.value;

    };


    AppData.prototype.eventlistener = function() {
        start.addEventListener('click', appData.start.bind(appData));
        cancel.addEventListener('click', appData.reset.bind(appData));
    
    
        expensesPlus.addEventListener('click', appData.addExpensesBlock.bind(appData));
        incomePlus.addEventListener('click', appData.addIncomeBlock.bind(appData));

        // start.addEventListener('click', function() {
        //     const _this = this;
        //     _this.start.bind(_this);
        // });
        // cancel.addEventListener('click', function() {
        //     const _this = this;
        //     _this.reset.bind(_this);
        // });
        // expensesPlus.addEventListener('click', function() {
        //     const _this = this;
        //     _this.addExpensesBlock.bind(_this);
        // });
        // incomePlus.addEventListener('click', function() {
        //     const _this = this;
        //     _this.addIncomeBlock.bind(_this);
        // });
    
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
    
        start.addEventListener('click', () =>{
            start.style.display = 'none'; 
            for(let i = 0; i < inputBlock.length; i++) {
                inputBlock[i].readOnly = !inputBlock[i].readOnly;
            }
            if(start.style.display === 'none'){
                cancel.style.display = 'block'; 
            }
        });
    };

    const appData = new AppData();
    
    appData.eventlistener();
    
    
    


   
       

   
    


   