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
    populateYarnTable(data.values);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Populate the yarn table with data
function populateYarnTable(rows) {
  const yarnTableBody = document.querySelector('#yarnTable tbody');
  yarnTableBody.innerHTML = ''; // Clear existing table
  rows.slice(1).forEach(row => { // Skip the first row (headers)
    const tableRow = document.createElement('tr');
    row.slice(1).forEach(cell => { // Skip the first cell (ID)
      const tableCell = document.createElement('td');
      tableCell.textContent = cell || 'N/A'; // Handle empty cells
      tableRow.appendChild(tableCell);
    });
    yarnTableBody.appendChild(tableRow);
  });
}

// Fetch and display data on load
fetchYarnData();

// Toggle form visibility
document.querySelector('.collapsible').addEventListener('click', function() {
  const formContainer = document.querySelector('.form-container');
  formContainer.style.display = formContainer.style.display === 'none' ? 'block' : 'none';
});


// Handle form submission
document.querySelector('#yarn-form').addEventListener('submit', async function(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());

  try {
    const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets/16jODbEF0qWJLOgeCXJamc6Bv3HfoP9xevSBNwH-U4_I/values/SSmithYarn:append?valueInputOption=RAW&key=AIzaSyCGCJPVfn_TFRd26jxF8K8yKo1C-jVOpH8', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: [
          [
            data['yarn-brand'],
            data['yarn-sub-brand'],
            data['yarn-material'],
            data['yarn-weight'],
            data['yarn-color'],
            data['yarn-dye-lot'],
            data['yarn-partial-balls'],
            data['yarn-full-skeins'],
            data['yarn-length'],
            data['yarn-hook-size'],
            data['yarn-needle-size'],
            data['yarn-projects'],
            data['yarn-mom-like'],
            data['yarn-store'],
          ],
        ],
      }),
    });

    if (response.ok) {
      alert('Yarn added successfully');
      fetchYarnData(); // Refresh the table data
      event.target.reset(); // Reset the form
    } else {
      alert('Error adding yarn');
    }
  } catch (error) {
    console.error('Error adding yarn:', error);
    alert('Error adding yarn');
  }
});

