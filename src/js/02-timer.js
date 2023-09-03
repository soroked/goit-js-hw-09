import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  inputRef: document.querySelector('input#datetime-picker'),
	startBtnRef: document.querySelector('button[data-start]'),

	daysSpan: document.querySelector('span[data-days]'),
	hoursSpan: document.querySelector('span[data-hours]'),
	minutesSpan: document.querySelector('span[data-minutes]'),
	secondsSpan: document.querySelector('span[data-seconds]'),
};

let diff = 0;

// initial state of the start button
refs.startBtnRef.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
		
		if (selectedDates[0].valueOf() < options.defaultDate.valueOf()) {
			refs.startBtnRef.disabled = true;
			Notify.failure("Please choose a date in the future");
			return;
		}

		refs.startBtnRef.disabled = false;

		diff = selectedDates[0].valueOf() - options.defaultDate.valueOf();
  },
};

flatpickr(refs.inputRef, options);

refs.startBtnRef.addEventListener('click', onClick);

function onClick() {

	refs.startBtnRef.disabled = true;

	if (diff <= 0) {
			clearInterval(id);
			return;
		}
		const timeObj = convertMs(diff);
		render(timeObj);
		diff -= 1000;

	const id = setInterval(() => {

		if (diff <= 0) {
			clearInterval(id);
			return;
		}
		const timeObj = convertMs(diff);
		render(timeObj);
		diff -= 1000;
	}, 1000);
};

function render({ days, hours, minutes, seconds }) {
	refs.daysSpan.innerHTML = addLeadingZero(days);
	refs.hoursSpan.innerHTML = addLeadingZero(hours);
	refs.minutesSpan.innerHTML = addLeadingZero(minutes);
	refs.secondsSpan.innerHTML = addLeadingZero(seconds);
};

function addLeadingZero(value) {
	return value.toString().padStart(2, '0');
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}