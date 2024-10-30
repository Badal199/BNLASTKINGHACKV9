document.addEventListener("DOMContentLoaded", function () {
    let timerElement = document.getElementById("timer30s");
    let periodElement = document.getElementById("period30s");
    let resultElement = document.getElementById("result");
    let historyElement = document.getElementById("history");

    let results = ["BIG", "SMALL", "BIG", "SMALL", "SMALL", "BIG", "SMALL", "BIG", "BIG", "SMALL", "SMALL"];
    let currentResultIndex = 0;

    // Timer setup
    let timer = setInterval(function () {
        let now = new Date();
        let seconds = now.getSeconds();
        let remainingSeconds = 30 - (seconds % 30);
        timerElement.textContent = `00:${String(remainingSeconds).padStart(2, "0")}`;

        if (remainingSeconds === 30) {
            // Update period number
            let minutes = now.getMinutes();
            let totalMinutes = now.getHours() * 60 + minutes;
            let periodNumber = `${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, "0")}${now.getDate().toString().padStart(2, "0")}30${totalMinutes * 2 + (seconds >= 30 ? 1 : 0)}`;
            periodElement.textContent = periodNumber;

            // Show result and update result history
            let result = results[currentResultIndex % results.length];
            currentResultIndex++;

            resultElement.classList.remove("rainbow");  // Reset bling-bling effect
            resultElement.style.opacity = 0;  // Hide result briefly
            setTimeout(() => {
                resultElement.textContent = result;
                resultElement.style.opacity = 1;
                resultElement.classList.add("rainbow");  // Apply bling-bling effect

                // Add to history
                let newRow = document.createElement("tr");
                newRow.innerHTML = `<td>${periodNumber}</td><td>${result}</td>`;
                historyElement.appendChild(newRow);
            }, 500);
        }
    }, 1000);
});
