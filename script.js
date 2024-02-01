document.addEventListener('DOMContentLoaded', function() {
    // Pomodoro Timer
    var pomodoroInterval;
    var pomodoroSeconds = 0;
    var pomodoroRunning = false;
    var pomodoroSessions = 0;
    var pomodoroTotalSeconds = 0;

    document.getElementById('start-pomodoro').addEventListener('click', startPomodoroTimer);
    document.getElementById('stop-pomodoro').addEventListener('click', stopPomodoroTimer);

    function startPomodoroTimer() {
        if (!pomodoroRunning) {
            clearInterval(pomodoroInterval);
            var pomodoroLength = parseInt(document.getElementById('pomodoro-length').value) || 25;
            var breakLength = parseInt(document.getElementById('break-length').value) || 5;
            pomodoroInterval = setInterval(function() {
                pomodoroSeconds++;
                pomodoroTotalSeconds++;
                updateTimerDisplay(pomodoroSeconds, 'pomodoro-timer');
                if (pomodoroSeconds >= pomodoroLength * 60) {
                    clearInterval(pomodoroInterval);
                    pomodoroSessions++;
                    pomodoroSeconds = 0;
                    updateTimerDisplay(pomodoroSeconds, 'pomodoro-timer');
                    setTimeout(function() {
                        startPomodoroTimer();
                    }, breakLength * 60000);
                }
            }, 1000);
            pomodoroRunning = true;
        }
    }

    function stopPomodoroTimer() {
        clearInterval(pomodoroInterval);
        pomodoroRunning = false;
    }

    // Stopwatch
    var stopwatchInterval;
    var stopwatchSeconds = 0;
    var stopwatchRunning = false;
    var stopwatchSessions = 0;
    var stopwatchTotalSeconds = 0;

    document.getElementById('start-stopwatch').addEventListener('click', startStopwatch);
    document.getElementById('stop-stopwatch').addEventListener('click', stopStopwatch);
    document.getElementById('reset-stopwatch').addEventListener('click', resetStopwatch);

    function startStopwatch() {
        if (!stopwatchRunning) {
            clearInterval(stopwatchInterval);
            stopwatchInterval = setInterval(function() {
                stopwatchSeconds++;
                stopwatchTotalSeconds++;
                updateTimerDisplay(stopwatchSeconds, 'stopwatch-timer');
            }, 1000);
            stopwatchRunning = true;
        }
    }

    function stopStopwatch() {
        clearInterval(stopwatchInterval);
        stopwatchRunning = false;
    }

    function resetStopwatch() {
        clearInterval(stopwatchInterval);
        stopwatchSeconds = 0;
        updateTimerDisplay(stopwatchSeconds, 'stopwatch-timer');
        stopwatchRunning = false;
    }

    // Update timer display
    function updateTimerDisplay(seconds, timerId) {
        var hours = Math.floor(seconds / 3600);
        var minutes = Math.floor((seconds % 3600) / 60);
        var remainingSeconds = seconds % 60;
        document.getElementById(timerId).innerText = formatTime(hours) + ":" + formatTime(minutes) + ":" + formatTime(remainingSeconds);
    }

    // Format time to add leading zero if less than 10
    function formatTime(time) {
        return time < 10 ? "0" + time : time;
    }

    // To-Do List
    document.getElementById('add-task').addEventListener('click', function() {
        addTask();
    });

    function addTask() {
        var taskInput = document.getElementById('task-input');
        var taskList = document.getElementById('task-list');
        var taskText = taskInput.value.trim();
        if (taskText !== '') {
            var listItem = document.createElement('li');
            listItem.textContent = taskText;
            taskList.appendChild(listItem);
            taskInput.value = '';
        } else {
            alert('Please enter a task.');
        }
    }
});
