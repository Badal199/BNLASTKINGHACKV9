const resultDisplay = document.getElementById('result');
const periodDisplay = document.getElementById('period30s');
const timerDisplay = document.getElementById('timer30s');
const historyTable = document.getElementById('history');

// Pattern of results to display (BIG, SMALL, alternating)
const resultsPattern = ['BIG', 'SMALL', 'BIG', 'SMALL', 'SMALL', 'BIG', 'SMALL', 'BIG', 'BIG', 'SMALL', 'SMALL'];

// To keep track of the current period number
let lastPeriodNumber = '';

// Function to add result to history table
function addToHistory(periodNumber, result) {
    const row = document.createElement('tr');
    const periodCell = document.createElement('td');
    const resultCell = document.createElement('td');

    periodCell.textContent = periodNumber;
    resultCell.textContent = result;

    row.appendChild(periodCell);
    row.appendChild(resultCell);

    // Append the row to the history table
    historyTable.appendChild(row);
}

// Function to update the period and result
function updatePeriodAndResult() {
    const calendar = new Date();
    const seconds = calendar.getUTCSeconds();
    const remainingSeconds = 30 - (seconds % 30);  // Adjust for 30-second interval
    const totalMinutes = calendar.getUTCHours() * 60 + calendar.getUTCMinutes();

    // Update period number for 30-second interval
    const periodNumber = `2024${String(calendar.getUTCMonth() + 1).padStart(2, '0')}${String(calendar.getUTCDate()).padStart(2, '0')}30${String(1 + totalMinutes * 2 + (seconds >= 30 ? 1 : 0))}`;

    // Only update the result if the period number has changed
    if (periodNumber !== lastPeriodNumber) {
        lastPeriodNumber = periodNumber;

        // Display random result from the pattern
        const resultIndex = Math.floor(Math.random() * resultsPattern.length);
        const result = resultsPattern[resultIndex];
        
        // Show result with a slow fade-in effect
        resultDisplay.style.opacity = 0;
        setTimeout(() => {
            resultDisplay.innerText = result;
            resultDisplay.style.opacity = 1;
        }, 200);  // Delay to start fade-in

        // Add the period and result to the history table
        addToHistory(periodNumber, result);
    }

    // Update the period number in the UI
    periodDisplay.innerText = periodNumber;

    // Update timer in format "  x x  :  x x"
    const formattedTime = `  0 0  :  ${String(remainingSeconds).padStart(2, '0')}`.replace(/(?<=\d)(?=\d)/g, " ");
    timerDisplay.innerText = formattedTime;
}

// Update the timer and result every second
setInterval(updatePeriodAndResult, 1000);
