// Update temperature value
function updateTemperature(newTemp) {
    document.getElementById('temperatureValue').textContent = newTemp;
}

// Draw temperature graph
function drawGraph(dataPoints) {
    var ctx = document.getElementById('temperatureGraph').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dataPoints.map(dp => dp.time), // Assuming each data point has a 'time' property
            datasets: [{
                label: 'Temperature',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                data: dataPoints.map(dp => dp.temperature), // Assuming each data point has a 'temperature' property
                fill: false,
                pointRadius: 5,
                pointHoverRadius: 7,
                pointHitRadius: 10,
                pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                pointBorderColor: '#fff',
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: false,
                        suggestedMax: 30 // This should be dynamic based on data
                    }
                }]
            },
            legend: {
                display: false
            }
        }
    });
}

// Dummy data for the graph
const dummyData = [
    { time: '0h', temperature: 21 },
    { time: '4h', temperature: 18 },
    { time: '8h', temperature: 22 },
    { time: '12h', temperature: 27 },
    { time: '16h', temperature: 24 },
    { time: '20h', temperature: 20 },
    { time: '24h', temperature: 21 }
];

// Initial graph drawing
drawGraph(dummyData);
