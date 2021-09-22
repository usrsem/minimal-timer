const successMessage = () => {
    const NOTIFICATION_TITLE = 'Success'
    const NOTIFICATION_BODY = 'Notification from the timer form. Click to log to console.'

    new Notification(NOTIFICATION_TITLE, { body: NOTIFICATION_BODY })
};

const failMessage = () => {
    const NOTIFICATION_TITLE = 'Failed'
    const NOTIFICATION_BODY = 'Notification from the timer form. Click to log to console.'

    new Notification(NOTIFICATION_TITLE, { body: NOTIFICATION_BODY })

}

const timerFinishedMessage = (timer) => {
    const NOTIFICATION_TITLE = `Timer ${timer.getName()} finished`;
    const NOTIFICATION_BODY = `Time passed: ${timer.getHours()}:${timer.getMinutes()}:${timer.getSeconds()}`;

    new Notification(NOTIFICATION_TITLE, { body: NOTIFICATION_BODY })
};

const timerCanceledMessage = (timer) => {
    const NOTIFICATION_TITLE = `Timer ${timer.getName()} canceled`;

    new Notification(NOTIFICATION_TITLE)
};
