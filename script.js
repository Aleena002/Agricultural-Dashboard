// Sidebar active link highlight
const sidebarLinks = document.querySelectorAll('#mySidebar a');
const currentPage = window.location.pathname.split("/").pop();
sidebarLinks.forEach(link => {
  if(link.getAttribute('href')===currentPage) link.classList.add('active');
  else link.classList.remove('active');
});

// Load crops from localStorage
let crops = JSON.parse(localStorage.getItem('cropsData')) || [];
let editCropIndex=null;

function saveCropsToStorage(){
  localStorage.setItem('cropsData',JSON.stringify(crops));
}

// Open modal
function openAddCrop(){
  editCropIndex=null;
  document.getElementById('modalTitle').innerText='Add New Crop';
  document.getElementById('cropName').value='';
  document.getElementById('cropType').value='';
  document.getElementById('addCropModal').style.display='flex';
}

// Close modal
function closeAddCrop(){
  document.getElementById('addCropModal').style.display='none';
}

// Save crop
// Save crop
function saveCrop(event){
  event.preventDefault();
  const name = document.getElementById('cropName').value.trim();
  const type = document.getElementById('cropType').value.trim();

  const count = 1; // default count for dashboard calculation

  if(editCropIndex !== null){
    crops[editCropIndex] = { name, type, count };
  } else {
    crops.push({ name, type, count });
  }

  saveCropsToStorage();
  renderCrops();
  closeAddCrop();
}


// Render table
function renderCrops(){
  const tbody=document.getElementById('cropsTableBody');
  tbody.innerHTML='';
  crops.forEach((crop,index)=>{
    const tr=document.createElement('tr');
    tr.innerHTML=`
      <td>${crop.name}</td>
      <td>${crop.type}</td>
      <td>
        <button class="btn btn-sm btn-warning me-1" onclick="editCrop(${index})">Edit</button>
        <button class="btn btn-sm btn-danger" onclick="deleteCrop(${index})">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Edit crop
function editCrop(index){
  editCropIndex=index;
  document.getElementById('modalTitle').innerText='Edit Crop';
  document.getElementById('cropName').value=crops[index].name;
  document.getElementById('cropType').value=crops[index].type;
  document.getElementById('addCropModal').style.display='flex';
}

// Delete crop
function deleteCrop(index){
  if(confirm('Are you sure you want to delete this crop?')){
    crops.splice(index,1);
    saveCropsToStorage();
    renderCrops();
  }
}

// Search crops
function searchCrops(){
  const input=document.getElementById('searchInput').value.toLowerCase();
  const tbody=document.getElementById('cropsTableBody');
  const rows=tbody.getElementsByTagName('tr');
  for(let i=0;i<rows.length;i++){
    const name=rows[i].cells[0].innerText.toLowerCase();
    const type=rows[i].cells[1].innerText.toLowerCase();
    rows[i].style.display=(name.includes(input)||type.includes(input))?'':'none';
  }
}

// Initial render
renderCrops();
