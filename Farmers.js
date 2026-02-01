// Sidebar active link highlight
const sidebarLinks = document.querySelectorAll('#mySidebar a');
const currentPage = window.location.pathname.split("/").pop();
sidebarLinks.forEach(link => {
  if(link.getAttribute('href')===currentPage) link.classList.add('active');
  else link.classList.remove('active');
});

// Toggle sidebar
function toggleSidebar() {
  const sidebar = document.getElementById('mySidebar');
  sidebar.style.display = sidebar.style.display === 'block' ? 'none' : 'block';
}

// Load farmers from localStorage
let farmers = JSON.parse(localStorage.getItem('farmersData')) || [];
let editFarmerIndex = null;

function saveFarmersToStorage(){
  localStorage.setItem('farmersData', JSON.stringify(farmers));
}

// Open modal
function openAddFarmer(){
  editFarmerIndex=null;
  document.getElementById('farmerModalTitle').innerText='Add New Farmer';
  document.getElementById('farmerName').value='';
  document.getElementById('farmerType').value='';
  document.getElementById('addFarmerModal').style.display='flex';
}

// Close modal
function closeAddFarmer(){
  document.getElementById('addFarmerModal').style.display='none';
}

// Save farmer
// Save farmer
function saveFarmer(event){
  event.preventDefault();
  const name = document.getElementById('farmerName').value.trim();
  const type = document.getElementById('farmerType').value.trim();

  const count = 1; // default count for dashboard cards

  if(editFarmerIndex !== null){
    farmers[editFarmerIndex] = { name, type, count };
  } else {
    farmers.push({ name, type, count });
  }

  saveFarmersToStorage();
  renderFarmers();
  closeAddFarmer();
}


// Render table
function renderFarmers(){
  const tbody=document.getElementById('farmersTableBody');
  tbody.innerHTML='';
  farmers.forEach((farmer,index)=>{
    const tr=document.createElement('tr');
    tr.innerHTML=`
      <td>${farmer.name}</td>
      <td>${farmer.type}</td>
      <td>
        <button class="btn btn-sm btn-warning me-1" onclick="editFarmer(${index})">Edit</button>
        <button class="btn btn-sm btn-danger" onclick="deleteFarmer(${index})">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Edit farmer
function editFarmer(index){
  editFarmerIndex=index;
  document.getElementById('farmerModalTitle').innerText='Edit Farmer';
  document.getElementById('farmerName').value=farmers[index].name;
  document.getElementById('farmerType').value=farmers[index].type;
  document.getElementById('addFarmerModal').style.display='flex';
}

// Delete farmer
function deleteFarmer(index){
  if(confirm('Are you sure you want to delete this farmer?')){
    farmers.splice(index,1);
    saveFarmersToStorage();
    renderFarmers();
  }
}

// Search farmers
function searchFarmers(){
  const input=document.getElementById('searchFarmerInput').value.toLowerCase();
  const tbody=document.getElementById('farmersTableBody');
  const rows=tbody.getElementsByTagName('tr');
  for(let i=0;i<rows.length;i++){
    const name=rows[i].cells[0].innerText.toLowerCase();
    const type=rows[i].cells[1].innerText.toLowerCase();
    rows[i].style.display=(name.includes(input)||type.includes(input))?'':'none';
  }
}

// Initial render
renderFarmers();
