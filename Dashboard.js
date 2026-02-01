// Toggle sidebar
function toggleSidebar() {
  const sidebar = document.getElementById('mySidebar');
  sidebar.style.display = sidebar.style.display === 'block' ? 'none' : 'block';
}

// Sidebar active link highlight
const sidebarLinks = document.querySelectorAll('#mySidebar a');
const currentPage = window.location.pathname.split("/").pop();
sidebarLinks.forEach(link => {
  if(link.getAttribute('href')===currentPage) link.classList.add('active');
  else link.classList.remove('active');
});

// Load from localStorage or default data
let crops = JSON.parse(localStorage.getItem('cropsData')) || [
  { name: 'Wheat', count: 12 },
  { name: 'Rice', count: 19 },
  { name: 'Maize', count: 7 }
];

let farmers = JSON.parse(localStorage.getItem('farmersData')) || [
  { type: 'Small', count: 40 },
  { type: 'Medium', count: 35 },
  { type: 'Large', count: 25 }
];

let yields = JSON.parse(localStorage.getItem('yieldsData')) || [
  { month: 'Jan', value: 120 },
  { month: 'Feb', value: 150 },
  { month: 'Mar', value: 180 },
  { month: 'Apr', value: 200 }
];

// Save data to localStorage
function saveData() {
  localStorage.setItem('cropsData', JSON.stringify(crops));
  localStorage.setItem('farmersData', JSON.stringify(farmers));
  localStorage.setItem('yieldsData', JSON.stringify(yields));
}



// Initialize Charts
const barCtx = document.getElementById('barChart').getContext('2d');
const pieCtx = document.getElementById('pieChart').getContext('2d');
const lineCtx = document.getElementById('lineChart').getContext('2d');

let barChart = new Chart(barCtx, {
  type: 'bar',
  data: {
    labels: crops.map(c => c.name),
    datasets: [{
      label: 'Total Crops',
      data: crops.map(c => c.count),
      backgroundColor: ['#36A2EB','#FF6384','#FFCE56']
    }]
  },
  options: { responsive: true }
});

let pieChart = new Chart(pieCtx, {
  type: 'pie',
  data: {
    labels: farmers.map(f => f.type + ' Farmers'),
    datasets: [{
      data: farmers.map(f => f.count),
      backgroundColor: ['#FF6384','#36A2EB','#FFCE56']
    }]
  },
  options: { responsive: true }
});

let lineChart = new Chart(lineCtx, {
  type: 'line',
  data: {
    labels: yields.map(y => y.month),
    datasets: [{
      label: 'Yield',
      data: yields.map(y => y.value),
      fill: false,
      borderColor: '#36A2EB',
      tension: 0.1
    }]
  },
  options: { responsive: true }
});

// Update charts and summary cards
function updateCharts() {
  barChart.data.labels = crops.map(c => c.name);
  barChart.data.datasets[0].data = crops.map(c => c.count);
  barChart.update();

  pieChart.data.labels = farmers.map(f => f.type + ' Farmers');
  pieChart.data.datasets[0].data = farmers.map(f => f.count);
  pieChart.update();

  lineChart.data.labels = yields.map(y => y.month);
  lineChart.data.datasets[0].data = yields.map(y => y.value);
  lineChart.update();

  document.getElementById('totalCrops').innerText = crops.reduce((a,b)=>a+b.count,0);
  document.getElementById('totalFarmers').innerText = farmers.reduce((a,b)=>a+b.count,0);
  document.getElementById('totalYields').innerText = yields.reduce((a,b)=>a+b.value,0);

  saveData();
}

// Add / Delete / Edit functions
function addCrop(name, count) {
  const existing = crops.find(c => c.name === name);
  if(existing) existing.count += count;
  else crops.push({name,count});
  updateCharts();
}
function deleteCrop(name){
  crops = crops.filter(c => c.name !== name);
  updateCharts();
}

function addFarmer(type,count){
  const existing = farmers.find(f=>f.type===type);
  if(existing) existing.count+=count;
  else farmers.push({type,count});
  updateCharts();
}
function deleteFarmer(type){
  farmers = farmers.filter(f=>f.type!==type);
  updateCharts();
}

function addYield(month,value){
  const existing = yields.find(y=>y.month===month);
  if(existing) existing.value=value;
  else yields.push({month,value});
  updateCharts();
}
function deleteYield(month){
  yields = yields.filter(y=>y.month!==month);
  updateCharts();
}

// Initial render
updateCharts();
