// Fetch data from the server
async function fetchProjectData() {
  try {
    const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets/16jODbEF0qWJLOgeCXJamc6Bv3HfoP9xevSBNwH-U4_I/values/SSmithProjects?key=AIzaSyCGCJPVfn_TFRd26jxF8K8yKo1C-jVOpH8');
    const data = await response.json();
    populateProjectTable(data.values);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Populate the project table with data
function populateProjectTable(rows) {
  const projectTableBody = document.querySelector('#projectTable tbody');
  projectTableBody.innerHTML = ''; // Clear existing table
  rows.slice(1).forEach(row => { // Skip the first row (headers)
    const tableRow = document.createElement('tr');
    row.forEach(cell => {
      const tableCell = document.createElement('td');
      tableCell.textContent = cell || 'N/A'; // Handle empty cells
      tableRow.appendChild(tableCell);
    });
    projectTableBody.appendChild(tableRow);
  });
}

// Fetch and display data on load
fetchProjectData();

// Toggle form visibility
document.querySelector('.collapsible').addEventListener('click', function() {
  const formContainer = document.querySelector('.form-container');
  formContainer.style.display = formContainer.style.display === 'none' ? 'block' : 'none';
});

// Toggle table visibility
document.querySelectorAll('.collapsible')[1].addEventListener('click', function() {
  const tableContainer = document.querySelector('.table-container');
  tableContainer.style.display = tableContainer.style.display === 'none' ? 'block' : 'none';
});