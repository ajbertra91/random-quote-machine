/*
 * dependencies
 */
import jQuery from 'jquery';
/*
 * stylesheets
 */
require('./timer.styl');
/*
 * module code
 */
const $ = jQuery;
const $categoriesEl = $('[data-categories]');
const $actionNoviceEl = $('[data-action="novice"]');
const $actionSeasonedEl = $('[data-action="seasoned"]');
const $actionWarriorEl = $('[data-action="warrior"]');
const $timerFillEl = $('#timer-fill');
let $timerVal = '';

const categoriesList = [
  'Worship'
  ,'Thanksgiving'

  ,'Confession'
  ,'Armor of God'
  ,'Petitions'

  ,'Intercessions'
  ,'Salvation of Others'
  ,'Saints Strengthened'
  ,'Sick & Suffering of Others'

  ,'Ministries'
  ,'Missionaries'
  ,'Political Leaders'
];

categoriesList
  .map((item) => `<li>${item}</li>`)
  .map((item) => $categoriesEl.append(item));


let getTimeRemaining = (endtime) => {
  let t = Date.parse(endtime) - Date.parse(new Date());
  // let days = Math.floor(t / (1000 * 60 * 60 * 24));
  // let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  let minutes = Math.floor((t / 1000 / 60) % 60);
  let seconds = Math.floor((t / 1000) % 60);
  return {
    'total': t,
    // 'days': days,
    // 'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

let initializeClock = (id, endtime) => {
  let clock = document.getElementById(id);
  //let daysSpan = clock.querySelector('.days');
  //let hoursSpan = clock.querySelector('.hours');
  let minutesSpan = clock.querySelector('.minutes');
  let secondsSpan = clock.querySelector('.seconds');

  let updateClock = () => {
    let t = getTimeRemaining(endtime);
    //daysSpan.innerHTML = t.days;
    //hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateClock();
  let timeinterval = setInterval(updateClock, 1000);
}

let getTimerVal = () => $('[data-timer-input]').val();
//let timerVal = getTimerVal();
// let deadline = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000);
let deadline = (val) => new Date(Date.parse(new Date()) + val * 60 * 1000);

// initializeClock('clockdiv', deadline);
//let catTime = timerVal / categoriesList.length * 60 * 1000
//console.debug('catTime: ', catTime);

$actionNoviceEl.on( 'click', ()=> { initializeClock('clockdiv', deadline(12)); } );
$actionSeasonedEl.on( 'click', ()=> { initializeClock('clockdiv', deadline(30)); } );
$actionWarriorEl.on( 'click', ()=> { initializeClock('clockdiv', deadline(60)); } );
