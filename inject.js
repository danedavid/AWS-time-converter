(() => {
  const timerID = setInterval(() => {
    let flag = true;

    // if (
    //   document.querySelector('*[data-id="CreatedAt"]') &&
    //   document.querySelector('*[data-id="CreatedAt"]').querySelector('span') &&
    //   document.querySelector('*[data-id="CreatedAt"]').querySelector('span').innerText.includes('IST')
    // ) {
    //   console.log(document.querySelector('*[data-id="CreatedAt"]').querySelector('span').innerText.includes('IST'))
    //   clearInterval(timerID);
    //   return;
    // }
    document.querySelectorAll('*[data-id="CreatedAt"]').forEach(item => {
      const headerElement = item.querySelector('span');
      headerElement.innerText = headerElement.innerText.replace('UTC', 'IST');
    });

    document.querySelectorAll('*[data-binding="CreatedAt"]').forEach(item => {
      if ( item.dataset.timeconverted ) {
        return;
      }
      const textContent = item.innerText;
      try {
        const time = moment.utc(textContent, 'YYYY-MM-DD HH:mm:ss');
        const localTime = time.local();
        item.innerText = localTime.format('YYYY-MM-DD HH:mm:ss');
        item.dataset.timeconverted = true;
        flag = false;
      } catch (err) {
        console.log('error caught', err);
      }
    });

    if ( !flag ) {
      clearInterval(timerID);
    }
  }, 500);
})();