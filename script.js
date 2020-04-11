'use strict';

const book = document.querySelectorAll('.book');
const adv = document.querySelector('.adv');
const title = document.querySelectorAll('a');
const link = document.querySelectorAll('li');
const newElement = document.createElement('li');

// Порядок книг
book[1].after(book[0]);
book[2].before(book[4]);
book[2].before(book[3]);
book[2].before(book[5]);

// Порядок глав книга №2
link[3].after(link[6]);
link[6].after(link[8]);
link[9].after(link[2]);

// Порядок глав книга №5
link[47].after(link[55]);
link[55].after(link[49]);
link[49].after(link[50]);
link[53].after(link[51]);

// Создание новой главы в книге №6
newElement.textContent = 'Глава 8: За пределами ES6';
book[2].append(newElement);
(link[25]).after(newElement);

// Исправление заголовка в книги №3
title[4].innerHTML = 'Книга 3. this и Прототипы Объектов';

// Замена картинки заднего фона
document.body.style.backgroundImage = "url('./image/you-dont-know-js.jpg')";

// Удаление рекламы
adv.remove();

