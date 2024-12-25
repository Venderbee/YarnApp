document.addEventListener('DOMContentLoaded', function() {
  // Fetch yarn data from the server
  async function fetchYarnData() {
    try {
      const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets/16jODbEF0qWJLOgeCXJamc6Bv3HfoP9xevSBNwH-U4_I/values/SSmithYarn?key=AIzaSyCGCJPVfn_TFRd26jxF8K8yKo1C-jVOpH8');
      const data = await response.json();
      populateYarnDropdown(data.values);
    } catch (error) {
      console.error('Error fetching yarn data:', error);
    }
  }

  // Populate the yarn dropdown with data
  function populateYarnDropdown(rows) {
    const yarnDropdown = document.querySelector('#yarn-used');
    rows.slice(1).forEach(row => { // Skip the first row (headers)
      const option = document.createElement('option');
      option.value = row[0]; // Assuming the first column is the yarn ID or name
      option.textContent = `${row[0]} - ${row[1]}`; // Display yarn brand and sub-brand
      yarnDropdown.appendChild(option);
    });
  }

  // Fetch project data from the server
  async function fetchProjectData() {
    try {
      const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets/16jODbEF0qWJLOgeCXJamc6Bv3HfoP9xevSBNwH-U4_I/values/SSmithProjects?key=AIzaSyCGCJPVfn_TFRd26jxF8K8yKo1C-jVOpH8');
      const data = await response.json();
      populateProjectTable(data.values);
    } catch (error) {
      console.error('Error fetching project data:', error);
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
  fetchYarnData();
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

  // Handle form submission
  document.querySelector('#project-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    console.log('Form data:', data); // Debugging: Log form data

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
        alert('Project added successfully');
        fetchProjectData(); // Refresh the project list
        event.target.reset(); // Reset the form
      } else {
        const errorText = await response.text();
        console.error('Error response:', errorText); // Debugging: Log error response
        alert('Error adding project');
      }
    } catch (error) {
      console.error('Error adding project:', error);
      alert('Error adding project');
    }
  });
});