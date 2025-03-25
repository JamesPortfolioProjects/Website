// Initialize Chart.js
const ctx = document.getElementById('myChart').getContext('2d');
let myChart;

// Function to fetch data based on selection
function fetchData(dataset) {
    let url = '';
    if (dataset === 'weather') {
        url = 'https://api.openweathermap.org/data/2.5/forecast?q=London&appid=2b714eff732577b05675c430ddf8c95d'; // Replace YOUR_API_KEY with your actual key
    } else if (dataset === 'stocks') {
        url = 'https://api.example.com/stocks'; // Placeholder URL for stock data
    }

    // Fetch the data
    fetch(url)
        .then(response => response.json())
        .then(data => {
            updateChart(data); // Update chart with the fetched data
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Function to update the chart with fetched data
function updateChart(data) {
    // Sample: Adjust this according to the dataset structure
    const labels = data.list ? data.list.map(item => item.dt_txt) : ['Stock 1', 'Stock 2', 'Stock 3']; // Example
    const values = data.list ? data.list.map(item => item.main.temp) : [100, 200, 300]; // Example

    if (myChart) {
        myChart.destroy(); // Destroy the old chart
    }

    myChart = new Chart(ctx, {
        type: 'line', // You can change this to 'bar', 'pie', etc.
        data: {
            labels: labels,
            datasets: [{
                label: 'Dataset',
                data: values,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Event listener to update the chart when the dataset is changed
document.getElementById('dataSelector').addEventListener('change', (e) => {
    fetchData(e.target.value);
});

// Load default data on page load
window.onload = () => {
    fetchData('weather');
};
