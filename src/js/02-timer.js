import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const refs = {
  inputRef: document.querySelector('input#datetime-picker'),
	startBtnRef: document.querySelector('button[data-start]'),

	daysSpan: document.querySelector('span[data-days]'),
	hoursSpan: document.querySelector('span[data-hours]'),
	minutesSpan: document.querySelector('span[data-minutes]'),
	secondsSpan: document.querySelector('span[data-seconds]'),
};

// initial state of the start button
refs.startBtnRef.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
		
		// ?? як отримати доступ до властивості defaultDate через ключове слово this ??
		if (selectedDates[0].valueOf() < options.defaultDate.valueOf()) {
			refs.startBtnRef.disabled = true;
			alert("Please choose a date in the future");
			return;
		}

		refs.startBtnRef.disabled = false;

		let delta = selectedDates[0].valueOf() - options.defaultDate.valueOf();

		// ?? як правильно передати значення параметра delta в колбек, для того щоб після натискання на кнопку, зняти з неї слухач ?? ПРОМІСИ ??
		refs.startBtnRef.addEventListener('click', () => onClick(delta));

  },
};

flatpickr(refs.inputRef, options);

function onClick(delta) {
	refs.startBtnRef.disabled = true;

	// Виконую розрахунок та відмалювання відразу після кліку...
	onClickIntervalHelper(delta)

	const id = setInterval(() => {
		// .. а також в інтервалі кожну секунду
		onClickIntervalHelper(delta);
	}, 1000);
};

// ця логіка потрібра в функції onClick вдічі, тому винесена в окрему функцію. 
function onClickIntervalHelper(delta) {
	if (delta <= 0) {
			clearInterval(id);
			return;
		}

	const timeObj = convertMs(delta);
	render(timeObj);
	delta -= 1000;
}

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