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

    // Adding timer element to queue
    document.getElementById('timers-list').appendChild(createTimerListElement(timer));

    const countDownTime = Date.now() + timer.getTimeInMillis();

    clockInterval(updateClock, countDownTime, timer);

})

function createTimerListElement(timer) {
    const li = document.createElement('li');
    li.setAttribute('id', timer.getId());

    const name = document.createElement('h4');
    name.innerHTML = timer.getName();

    const time = document.createElement('p');
    time.innerHTML = getTextForTimer(timer.getHours(), timer.getMinutes(), timer.getSeconds());
    const btn = document.createElement('button');
    btn.innerHTML = `Cancel`;

    btn.addEventListener('click', () => li.remove());

    li.appendChild(name);
    li.appendChild(time);
    li.appendChild(btn);

    return li;
}

function pad(num) {
    return ('0' + num).slice(-2);
}

function getTextForTimer(h, m, s) {
    return `${pad(h)}:${pad(m)}:${pad(s)}`
}

function updateClock(countDownTime, timer) {
    const nowTime = Date.now();
    const distance = countDownTime - nowTime;

    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const timerElement = document.getElementById(timer.getId()); 

    if (timerElement === null) {
        return -1;
    }
    timerElement.getElementsByTagName('p')[0].innerHTML = getTextForTimer(hours, minutes, seconds); 
    return distance;
}

function clockInterval(fn, countDownTime, timer) {
    var time = 1000 - (Date.now() % 1000);

    setTimeout(async function() {
        if (fn(countDownTime, timer) > 0) {
            clockInterval(fn, countDownTime, timer);
        } else {
            try {
                // Delete timer event from list
                document.getElementById(timer.getId()).remove();
                // Send notification about timer passing
                timerFinishedMessage(timer);
            } catch(e) {
                timerCanceledMessage(timer);
            }
            
        }
    }, time);
}


// TODO: Cancel timer
// TODO: Add shortcuts
// TODO: Add regular timers
// TODO: Pomodorro mode
// TODO: Import timetable
