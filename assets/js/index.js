"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
greeting();
(_a = document.querySelector('.input-button')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', makeRequisition);
document.querySelector('.data-page-top').addEventListener('click', hiddenData);
function greeting() {
    let date = new Date;
    let hours = date.getHours();
    let greetingMessage = '';
    let greetingElement = document.querySelector('.input-page .bottom-headline');
    let bodyElement = document.querySelector('body');
    if (hours >= 5 && hours <= 11) {
        greetingMessage = 'Good Morning!';
        bodyElement.classList.remove('afternoon');
        bodyElement.classList.remove('evening');
        bodyElement.classList.add('morning');
    }
    else if (hours >= 12 && hours <= 17) {
        greetingMessage = 'Good Afternoon!';
        bodyElement.classList.remove('morning');
        bodyElement.classList.remove('evening');
        bodyElement.classList.add('afternoon');
    }
    else {
        greetingMessage = 'Good Evening!';
        bodyElement.classList.remove('morning');
        bodyElement.classList.remove('afternoon');
        bodyElement.classList.add('evening');
    }
    greetingElement.innerHTML = greetingMessage;
}
function makeRequisition() {
    return __awaiter(this, void 0, void 0, function* () {
        let city = document.querySelector('.input-box input').value;
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(city)}&appid=6e54b5964edaaa003cfd7b8ca2105137&units=metric`;
        try {
            let response = yield fetch(url);
            if (!response.ok) {
                showWarning();
                throw new Error();
            }
            else {
                hiddenWarning();
            }
            let data = yield response.json();
            showInfo(data);
        }
        catch (error) {
            console.log(`Erro ao realizar a requisição`, error);
        }
    });
}
function showInfo(data) {
    let titleElement = document.querySelector('.data-page .headline-title');
    let descriptionElement = document.querySelector('.data-page .headline-description');
    let iconElement = document.querySelector('.data-page .main-icon-box img');
    let iconUrl = 'https://openweathermap.org/img/wn/';
    let temperatureElement = document.querySelector('.data-page .main-title');
    let mainDescriptionElement = document.querySelector('.data-page .main-description');
    let windElement = document.querySelector("div[data-type='wind'] .bottom-data-content");
    let humidityElement = document.querySelector("div[data-type='humidity'] .bottom-data-content");
    let feelsElement = document.querySelector("div[data-type='feels'] .bottom-data-content");
    let inputPage = document.querySelector('.input-page');
    let dataPage = document.querySelector('.data-page');
    titleElement.innerHTML = data.name;
    descriptionElement.innerHTML = formatDate();
    iconElement.setAttribute('src', `${iconUrl}${data.weather[0].icon}.png`);
    temperatureElement.innerHTML = `${data.main.temp} <span>°</span>`;
    mainDescriptionElement.innerHTML = data.weather[0].description;
    windElement.innerHTML = `${data.wind.speed} <span>Km</span>`;
    humidityElement.innerHTML = `${data.main.humidity} <span>%</span>`;
    feelsElement.innerHTML = `${data.main.feels_like} <span>°</span>`;
    inputPage.classList.add('hidden');
    dataPage.classList.remove('hidden');
}
function formatDate() {
    let date = new Date;
    let dayWeek = date.getDay();
    let dayMonth = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    let dateString = '';
    let dayWeekString = '';
    switch (dayWeek) {
        case 0:
            dayWeekString = "Sun";
            break;
        case 1:
            dayWeekString = "Mon";
            break;
        case 2:
            dayWeekString = "Tue";
            break;
        case 3:
            dayWeekString = "Wed";
            break;
        case 4:
            dayWeekString = "Thu";
            break;
        case 5:
            dayWeekString = "Fri";
            break;
        case 6:
            dayWeekString = "Sat";
            break;
        default:
            dayWeekString = "Invalid day";
    }
    let dayMonthString = '';
    if (dayMonth < 10) {
        dayMonthString = '0' + dayMonth;
    }
    else {
        dayMonthString = dayMonth.toString();
    }
    let monthString = '';
    switch (month) {
        case 0:
            monthString = "Jan";
            break;
        case 1:
            monthString = "Feb";
            break;
        case 2:
            monthString = "Mar";
            break;
        case 3:
            monthString = "Apr";
            break;
        case 4:
            monthString = "May";
            break;
        case 5:
            monthString = "Jun";
            break;
        case 6:
            monthString = "Jul";
            break;
        case 7:
            monthString = "Aug";
            break;
        case 8:
            monthString = "Sep";
            break;
        case 9:
            monthString = "Oct";
            break;
        case 10:
            monthString = "Nov";
            break;
        case 11:
            monthString = "Dec";
            break;
        default:
            monthString = "Invalid month";
    }
    dateString = `${dayWeekString}, ${dayMonthString} ${monthString}, ${year}`;
    return dateString;
}
function showWarning() {
    let warningElement = document.querySelector('.warning');
    let inputBox = document.querySelector('.input-box');
    warningElement.classList.remove('hidden');
    inputBox.classList.add('invalid');
}
function hiddenWarning() {
    let warningElement = document.querySelector('.warning');
    let inputBox = document.querySelector('.input-box');
    warningElement.classList.add('hidden');
    inputBox.classList.remove('invalid');
}
function hiddenData() {
    let inputPage = document.querySelector('.input-page');
    let dataPage = document.querySelector('.data-page');
    dataPage.classList.add('hidden');
    inputPage.classList.remove('hidden');
}
