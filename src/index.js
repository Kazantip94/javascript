'use strict';

import "@babel/polyfill";
import 'nodelist-foreach-polyfill';
import "es6-promise";
import "fetch-polyfill";
import "formdata-polyfill";
import elementClosest from 'element-closest';
elementClosest(window);

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
import slider from './modules/slider';
import ourTeam from './modules/ourTeam';
import calc from './modules/calc';
import sendForm from './modules/sendForm';


//Timer
countTimer('24 April 2020');
//Menu
toggleMenu();
//popup
togglePopUp();
//табы
tabs();
// Слайдер
slider();
//Наша команда
ourTeam();
//Калькулятор
calc(100);
// send-ajax-form
sendForm();