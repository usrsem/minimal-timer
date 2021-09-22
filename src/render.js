// Handler for swithing tmemes
document.getElementById('toggle-dark-mode').addEventListener('click', async () => {
    const isDarkMode = await window.darkMode.toggle();
    document.getElementById('theme-source').innerHTML = isDarkMode ? 'Dark' : 'Light';
})

// Handler for setting theme as in system
document.getElementById('reset-to-system').addEventListener('click', async () => {
    await window.darkMode.system();
    document.getElementById('theme-source').innerHTML = 'System';
})

// Handler for setting timer
const timerForm = document.getElementsByName('timer-data-form')[0];
timerForm.addEventListener('submit', async (event) => {
    event.preventDefault()


    // Timer model with name and time info
    const timer = {
        
        name: document.getElementById('timer-name').value || "null",

        hours: document.getElementById('timer-hours').value || 0, 

        minutes: document.getElementById('timer-minutes').value || 0, 

        seconds: document.getElementById('timer-seconds').value || 0,

        id: Date.now(),


        getTimeInMillis: function() { return (this.hours * 60 * 60 + this.minutes * 60 + this.seconds) * 1000; },
        getName: function() { return this.name; },
        getHours: function() { return pad(this.hours); },
        getMinutes: function() { return pad(this.minutes); },
        getSeconds: function() { return pad(this.seconds); },
        getId: function() { return this.id; }
    }
   
    // Clear form after submiting
    timerForm.reset();

    // Creating new li element for list
    const timerLi = document.createElement('li');
    
    timerLi.setAttribute('id', timer.getId());
    timerLi.innerHTML = getTextForTimer(
        timer.getName(),
        timer.getHours(),
        timer.getMinutes(),
        timer.getSeconds()
    );

    // Adding timer element to queue
    document.getElementById('timers-list').appendChild(timerLi);


    const countDownTime = Date.now() + timer.getTimeInMillis();


    clockInterval(updateClock, countDownTime, timer);

})

function pad(num) {
    return ('0' + num).slice(-2);
}

function getTextForTimer(n, h, m, s) {
    return `Name: ${n}<br>Time: ${pad(h)}:${pad(m)}:${pad(s)}`
}

function updateClock(countDownTime, timer) {
    const nowTime = Date.now();
    const distance = countDownTime - nowTime;

    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById(timer.getId()).innerHTML = getTextForTimer(timer.getName(), hours, minutes, seconds); 
    return distance;
}

function clockInterval(fn, countDownTime, timer) {
    var time = 1000 - (Date.now() % 1000);

    setTimeout(async function() {
        if (fn(countDownTime, timer) > 0) {
            clockInterval(fn, countDownTime, timer);
        } else {
            // Send notification about timer passing
            timerFinishedMessage(timer);
            // Delete timer event from list
            document.getElementById(timer.getId()).remove();
            
        }
    }, time);
}
