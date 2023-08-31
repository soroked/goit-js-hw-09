const startBtnRef = document.querySelector('button[data-start]');
const stopBtnRef = document.querySelector('button[data-stop]');
let changeColorInterval = null;

startBtnRef.addEventListener('click', () => {

  startBtnRef.disabled = true;
  stopBtnRef.disabled = false;
  document.body.style.backgroundColor = getRandomHexColor();

  changeColorInterval = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000)
});

stopBtnRef.addEventListener('click', () => {
  
  startBtnRef.disabled = false;
  stopBtnRef.disabled = true;

  clearInterval(changeColorInterval);
})

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
