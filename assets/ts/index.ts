import * as es6Promise from 'es6-promise';

//Types
type cityData = {
    weather: [{
        main: string,
        description: string,
        icon: string
    }
    ],
    main: {
        temp: number,
        feels_like: number,
        humidity: number,
    },
    wind: {
        speed: number
    },
    name: string
}

//Initial Data
greeting();


//Events
document.querySelector<Element>('.input-button')?.addEventListener('click', makeRequisition);
document.querySelector<Element>('.data-page-top')!.addEventListener('click', hiddenData);


//Functions
function greeting() {
    let date: Date = new Date;
    let hours: number = date.getHours();
    let greetingMessage: string = '';
    let greetingElement = document.querySelector<Element>('.input-page .bottom-headline')!;
    let bodyElement = document.querySelector<Element>('body')!;

    if(hours >= 5 && hours <= 11) {
        greetingMessage = 'Good Morning!';

        bodyElement.classList.remove('afternoon');
        bodyElement.classList.remove('evening');
        bodyElement.classList.add('morning');

    } else if(hours >= 12 && hours <= 17) {
        greetingMessage = 'Good Afternoon!';

        bodyElement.classList.remove('morning');
        bodyElement.classList.remove('evening');
        bodyElement.classList.add('afternoon');
    } else {
        greetingMessage = 'Good Evening!';

        bodyElement.classList.remove('morning');
        bodyElement.classList.remove('afternoon');
        bodyElement.classList.add('evening');
    }

    
    greetingElement.innerHTML = greetingMessage;
    
}

async function makeRequisition() {
    
    let city = document.querySelector<HTMLInputElement>('.input-box input')!.value;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(city)}&appid=6e54b5964edaaa003cfd7b8ca2105137&units=metric`;
    

    try {
        let response = await fetch(url);

        if(!response.ok) {
            showWarning();
            throw new Error();
        } else {
            hiddenWarning();
        }
        let data: cityData = await response.json();

        showInfo(data);

    } catch(error) {
        console.log(`Erro ao realizar a requisição`, error);
    }

}

function showInfo(data: cityData) {
    let titleElement = document.querySelector<Element>('.data-page .headline-title')!;
    let descriptionElement = document.querySelector<Element>('.data-page .headline-description')!;
    let iconElement = document.querySelector<Element>('.data-page .main-icon-box img')!;
    let iconUrl = 'https://openweathermap.org/img/wn/';
    let temperatureElement = document.querySelector<Element>('.data-page .main-title')!;
    let mainDescriptionElement = document.querySelector<Element>('.data-page .main-description')!;
    let windElement = document.querySelector<Element>("div[data-type='wind'] .bottom-data-content")!;
    let humidityElement = document.querySelector<Element>("div[data-type='humidity'] .bottom-data-content")!;
    let feelsElement = document.querySelector<Element>("div[data-type='feels'] .bottom-data-content")!;
    let inputPage = document.querySelector<Element>('.input-page')!;
    let dataPage = document.querySelector<Element>('.data-page')!;
    
    


    
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

function formatDate(): string {
    let date: Date = new Date;
    let dayWeek = date.getDay();
    let dayMonth = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    let dateString: string = '';

    let dayWeekString: string = '';
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
    
    let dayMonthString: string = '';
    if(dayMonth < 10) {
        dayMonthString = '0' + dayMonth;
    } else {
        dayMonthString = dayMonth.toString();
    }

    let monthString: string = '';
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
    let warningElement = document.querySelector<Element>('.warning')!;
    let inputBox = document.querySelector<Element>('.input-box')!

    warningElement.classList.remove('hidden');
    inputBox.classList.add('invalid');
}

function hiddenWarning() {
    let warningElement = document.querySelector<Element>('.warning')!;
    let inputBox = document.querySelector<Element>('.input-box')!

    warningElement.classList.add('hidden');
    inputBox.classList.remove('invalid');
}

function hiddenData() {
    let inputPage = document.querySelector<Element>('.input-page')!;
    let dataPage = document.querySelector<Element>('.data-page')!;

    dataPage.classList.add('hidden');
    inputPage.classList.remove('hidden');
}


