'use strict';

let btnCalculate = document.getElementById('start');
console.log(btnCalculate);

let btnIncome = document.getElementsByTagName('button')[0];
console.log(btnIncome);

let btnExpenses = document.getElementsByTagName('button')[1];
console.log(btnExpenses);

let checkbox = document.querySelector('#checkbox');
console.log(checkbox);

let additionalIncomeItem = document.querySelectorAll('.additional_income-item');
console.log(additionalIncomeItem);

// let budgetMonth = document.getElementsByClassName('budget_month-value');
// console.log(budgetMonth);

let budgetDay = document.getElementsByClassName('budget_day-value');
console.log(budgetDay);

let expensesMonth = document.getElementsByClassName('expenses_month-value');
console.log(expensesMonth);

let additionalIncome = document.getElementsByClassName('additional_income-value');
console.log(additionalIncome);

let additionalExpenses = document.getElementsByClassName('additional_expenses-value');
console.log(additionalExpenses);

let incomePeriod = document.getElementsByClassName('income_period-value');
console.log(incomePeriod);

let targetMonth = document.getElementsByClassName('target_month-value');
console.log(targetMonth);

let salaryAmount = document.querySelector('.salary-amount');
console.log(salaryAmount);

let incomeTitle = document.querySelector('.income-title');
console.log(incomeTitle);

let incomeAmount = document.querySelector('.income-amount');
console.log(incomeAmount);

let expensesTitle = document.querySelector('.expenses-title');
console.log(expensesTitle);

let expensesAmount = document.querySelector('.expenses-amount');
console.log(expensesAmount);

let additionalExpensesItem = document.querySelector('.additional_expenses-item');
console.log(additionalExpensesItem);

let targetAmount = document.querySelector('.target-amount');
console.log(targetAmount);

let periodSelect = document.querySelector('.period-select');
console.log(periodSelect);
