// Sidebar active link highlight
const sidebarLinks = document.querySelectorAll('#mySidebar a');
const currentPage = window.location.pathname.split("/").pop();
sidebarLinks.forEach(link => {
  if(link.getAttribute('href')===currentPage) link.classList.add('active');
  else link.classList.remove('active');
});
// Load data from localStorage
let crops = JSON.parse(localStorage.getItem('cropsData')) || [];
let farmers = JSON.parse(localStorage.getItem('farmersData')) || [];
let yields = JSON.parse(localStorage.getItem('yieldsData')) || [
  { month: 'Jan', value: 120 },
  { month: 'Feb', value: 150 },
  { month: 'Mar', value: 180 },
  { month: 'Apr', value: 200 }
];

// Charts
const barCtx = document.getElementById('barChart').getContext('2d');
const pieCtx = document.getElementById('pieChart').getContext('2d');
const lineCtx = document.getElementById('lineChart').getContext('2d');

let barChart = new Chart(barCtx,{
  type:'bar',
  data:{
    labels:crops.map(c=>c.name),
    datasets:[{
      label:'Total Crops',
      data:crops.map(c=>c.count||0),
      backgroundColor:['#36A2EB','#FF6384','#FFCE56']
    }]
  },
  options:{responsive:true}
});

let pieChart = new Chart(pieCtx,{
  type:'pie',
  data:{
    labels:farmers.map(f=>f.type+' Farmers'),
    datasets:[{
      data:farmers.map(f=>f.count||0),
      backgroundColor:['#FF6384','#36A2EB','#FFCE56']
    }]
  },
  options:{responsive:true}
});

let lineChart = new Chart(lineCtx,{
  type:'line',
  data:{
    labels:yields.map(y=>y.month),
    datasets:[{
      label:'Yield',
      data:yields.map(y=>y.value),
      fill:false,
      borderColor:'#36A2EB',
      tension:0.1
    }]
  },
  options:{responsive:true}
});

// Update charts dynamically
function updateCharts(){
  barChart.data.labels=crops.map(c=>c.name);
  barChart.data.datasets[0].data=crops.map(c=>c.count||0);
  barChart.update();

  pieChart.data.labels=farmers.map(f=>f.type+' Farmers');
  pieChart.data.datasets[0].data=farmers.map(f=>f.count||0);
  pieChart.update();

  lineChart.data.labels=yields.map(y=>y.month);
  lineChart.data.datasets[0].data=yields.map(y=>y.value);
  lineChart.update();
}

// Run update once
updateCharts();
