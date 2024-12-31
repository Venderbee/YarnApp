// Fetch data from the server
async function fetchProjectData() {
  try {
    const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets/16jODbEF0qWJLOgeCXJamc6Bv3HfoP9xevSBNwH-U4_I/values/SSmithProjects?key=AIzaSyCGCJPVfn_TFRd26jxF8K8yKo1C-jVOpH8');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (!data.values) {
      throw new Error('No data found in the response');
    }
    populateProjectTable(data.values);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Fetch data from the server
async function fetchYarnData() {
  try {
    const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets/16jODbEF0qWJLOgeCXJamc6Bv3HfoP9xevSBNwH-U4_I/values/SSmithYarn?key=AIzaSyCGCJPVfn_TFRd26jxF8K8yKo1C-jVOpH8');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (!data.values) {
      throw new Error('No data found in the response');
    }
    populateYarnDropdown(data.values);
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
    row.slice(1).forEach(cell => { // Skip the first cell (ID)
      const tableCell = document.createElement('td');
      tableCell.textContent = cell || 'N/A'; // Handle empty cells
      tableRow.appendChild(tableCell);
    });
    projectTableBody.appendChild(tableRow);
  });
}

// Fetch and display data on load
fetchProjectData();

function populateYarnDropdown(rows) {
  console.log('Populating yarn dropdown...');
  const yarnDropdown = document.querySelector('#yarn-used');
  yarnDropdown.innerHTML = ''; // Clear existing options
  rows.slice(1).forEach(row => { // Skip the first row (headers)
    const option = document.createElement('option');
    option.value = row[0]; // Assuming the first column is the yarn ID or name
    option.textContent = `${row[0]} - ${row[1]}`; // Display yarn brand and sub-brand
    yarnDropdown.appendChild(option);
  });
  console.log('Yarn dropdown populated.');
}

// Toggle form visibility
document.querySelector('.collapsible').addEventListener('click', function() {
  const formContainer = document.querySelector('.form-container');
  formContainer.style.display = formContainer.style.display === 'none' ? 'block' : 'none';
});


// Handle form submission
document.querySelector('#project-form').addEventListener('submit', async function(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());

  try {
    const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets/16jODbEF0qWJLOgeCXJamc6Bv3HfoP9xevSBNwH-U4_I/values/SSmithProjects:append?valueInputOption=RAW&key=AIzaSyCGCJPVfn_TFRd26jxF8K8yKo1C-jVOpH8', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: [
          [
            data['project-name'],
            data['project-type'],
            data['start-date'],
            data['completion-date'],
            data['status'],
            data['deadline'],
            data['pattern-name'],
            data['pattern-source'],
            data['pattern-designer'],
            data['pattern-notes'],
            data['yarn-used'],
            data['hook-size'],
            data['other-tools'],
            data['rows-completed'],
            data['time-spent'],
            data['photo-gallery'],
            data['step-notes'],
            data['color-palette'],
            data['gauge-swatch-info'],
            data['custom-modifications'],
            data['recipient'],
            data['budget'],
            data['difficulty-level'],
            data['tags'],
          ],
        ],
      }),
    });

    if (response.ok) {
      alert('Projects added successfully');
      fetchProjectData(); // Refresh the table data
      event.target.reset(); // Reset the form
    } else {
      alert('Error adding projects');
    }
  } catch (error) {
    console.error('Error adding projects:', error);
    alert('Error adding projects');
  }
});

