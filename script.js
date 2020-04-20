'use strict';

const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let start = document.getElementById('start'),
    cancel = document.getElementById('cancel'),
    btnPlus = document.getElementsByTagName('button'),
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1],
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    depositCheck = document.getElementById('deposit-check'),
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
    periodAmount = document.querySelector('.period-amount'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    depositBank = document.querySelector('.deposit-bank');
    
    
    class AppData {
       constructor() {
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
       }
    
    
    start () {
        this.budget = +salaryAmount.value;
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getInfoDeposit();
        this.getBudget(); 
        this.showResult();
    }
    reset () {
       cancel.style.display = 'none';
       start.style.display = 'block';
       depositCheck.checked = false;
       depositBank.style.display = 'none';
       depositAmount.style.display = 'none';
       depositPercent.style.display = 'none';
       depositBank.value = '';
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
    //    this.periodSelect.step = 1;
      
       let input = document.querySelectorAll('input');
       input.forEach(item =>{
        item.value = '';
        item.removeAttribute('readOnly');
       });

    }
    
    showResult () {

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
        
        
    }
    
    addExpensesBlock () {   
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');

        if(expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    }
    addIncomeBlock () {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');

        if(incomeItems.length === 3) {
            incomePlus.style.display = 'none';
        }
    }
    getExpenses () {
        expensesItems.forEach((item) => {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;

            if(itemExpenses !== '' && cashExpenses !== '') {
                this.expenses[itemExpenses] = cashExpenses;
            }
        });
    }
   
    getIncome () {
        incomeItems.forEach((item) => {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            
            if(itemIncome !== '' && cashIncome !== '') {
                this.income[itemIncome] = cashIncome;
            }
        });
        
        for(let key in this.income) {
            this.incomeMonth += +this.income[key];
        }

    }
    getAddExpenses () {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach((item) =>{
            item = item.trim();
            if(item !== '') {
                this.addExpenses.push(item);
            }
        });
    }
    getAddIncome () {
        additionalIncomeItem.forEach((item) => {
            let itemValue = item.value.trim();
            if(itemValue !== ''){
                this.addIncome.push(itemValue);
            }
        });
    }
   
    getExpensesMonth () {
        for (let key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }
    }
    getBudget () {
        const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    }
    getTargetMonth () {
        return targetAmount.value / this.budgetMonth;
    }
    getStatusIncome () {
        if (this.budgetDay >= 1200) {
            return ('У вас высокий уровень дохода');
        }else if(this.budgetDay >= 600 && this.budgetDay < 1200) {
            return ('У вас средний уровень дохода');
        }else if(this.budgetDay < 600 && this.budgetDay >= 0) {
            return ('К сожалению у вас уровень дохода ниже среднего');
        }else if(this.budgetDay < 0){
            return ('Что то пошло не так');
        }
    }
    getInfoDeposit() {
        if(this.deposit) {
            do{
                this.percentDeposit = depositPercent.value;
            } while(!isNumber(this.percentDeposit));

            do{
                this.moneyDeposit = depositAmount.value;
            } while(!isNumber(this.moneyDeposit));
        }
    }

    calcPeriod() {
        return this.budgetMonth * periodSelect.value;

    }

    changePercent() {
        const valueSelect = this.value;
        if(valueSelect === 'other') {
            depositPercent.style.display = 'inline-block';
            depositPercent.value = '';
            
            depositPercent.addEventListener('change', this.changePercent);
            
        }else{
            depositPercent.value = valueSelect;
            depositPercent.style.display = 'none';
            depositPercent.removeEventListener('change', this.changePercent);
            
        }
    }

    depositHandler() {
        if(depositCheck.checked) {
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            this.deposit = true;
            depositBank.addEventListener('change', this.changePercent);
        }else{
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositBank.value = '';
            depositAmount.value = '';
            this.deposit = false;
            depositBank.removeEventListener('change', this.changePercent);
        }
    }


    eventlistener () {
       

        start.addEventListener('click', this.start.bind(this));
        cancel.addEventListener('click', this.reset.bind(this));
        depositCheck.addEventListener('change', this.depositHandler.bind(this));
        
        expensesPlus.addEventListener('click', this.addExpensesBlock.bind(this));
        incomePlus.addEventListener('click', this.addIncomeBlock.bind(this));
       
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
        
        depositPercent.addEventListener('input', function() {
            if(!isNumber(this.value) || this.value > 100 || this.value < 1){
                start.disabled = true;
                this.value = '';
                alert('Введите корректное значение в поле проценты');
                 
            }else{
                start.disabled = false;
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

       
    }
}

    const appData = new AppData();
    
    appData.eventlistener();
    
    
    


   
       

   
    


   