const formRef = document.querySelector('.form');

formRef.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
  e.preventDefault();

  const delayRef = formRef.delay.value;
  const stepRef = formRef.step.value
  const amountRef = formRef.amount.value;

  let id = 1;

  setTimeout(() => {
    const intervalID = setInterval(() => {
      if (id > amountRef) {
        clearInterval(intervalID);
        return;
      }

      let delay = Number(delayRef) + Number((id - 1) * stepRef);

      createPromise(id, delay)
        .then(({position, delay}) => console.log(`✅ Fulfilled promise ${position} in ${delay}ms`))
        .catch(({position, delay}) => console.log(`❌ Rejected promise ${position} in ${delay}ms`));
      
      id += 1;
    }, stepRef)
  }, delayRef);
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
    return Promise.resolve({ position, delay });
  } else {
    // Reject
    return Promise.reject({ position, delay });
  }
}
