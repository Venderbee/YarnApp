document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM fully loaded and parsed');

  // Load the Google API client library
  gapi.load('client:auth2', initClient);

  function initClient() {
    gapi.client.init({
      apiKey: 'AIzaSyCGCJPVfn_TFRd26jxF8K8yKo1C-jVOpH8',
      clientId: '1058604367745-v8mu9pbdpicgn5m20rqho8si5n1qof9n.apps.googleusercontent.com',
      discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
      scope: 'https://www.googleapis.com/auth/spreadsheets',
    }).then(function () {
      // Listen for sign-in state changes.
      gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

      // Handle the initial sign-in state.
      updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    }, function(error) {
      console.error('Error initializing Google API client:', error);
    });
  }

  function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
      console.log('User is signed in');
      fetchYarnData();
      fetchProjectData();
    } else {
      console.log('User is not signed in');
      gapi.auth2.getAuthInstance().signIn();
    }
  }

  // Fetch yarn data from the server
  async function fetchYarnData() {
    try {
      console.log('Fetching yarn data...');
      const response = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: '16jODbEF0qWJLOgeCXJamc6Bv3HfoP9xevSBNwH-U4_I',
        range: 'SSmithYarn',
      });
      const data = response.result;
      console.log('Yarn data fetched:', data);
      populateYarnDropdown(data.values);
    } catch (error) {
      console.error('Error fetching yarn data:', error);
    }
  }

  // Populate the yarn dropdown with data
  function populateYarnDropdown(rows) {
    console.log('Populating yarn dropdown...');
    const yarnDropdown = document.querySelector('#yarn-used');
    rows.slice(1).forEach(row => { // Skip the first row (headers)
      const option = document.createElement('option');
      option.value = row[0]; // Assuming the first column is the yarn ID or name
      option.textContent = `${row[0]} - ${row[1]}`; // Display yarn brand and sub-brand
      yarnDropdown.appendChild(option);
    });
    console.log('Yarn dropdown populated.');
  }

  // Fetch project data from the server
  async function fetchProjectData() {
    try {
      console.log('Fetching project data...');
      const response = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: '16jODbEF0qWJLOgeCXJamc6Bv3HfoP9xevSBNwH-U4_I',
        range: 'SSmithProjects',
      });
      const data = response.result;
      console.log('Project data fetched:', data);
      populateProjectTable(data.values);
    } catch (error) {
      console.error('Error fetching project data:', error);
    }
  }

  // Populate the project table with data
  function populateProjectTable(rows) {
    console.log('Populating project table...');
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
    console.log('Project table populated.');
  }

  // Toggle form visibility
  const formToggleButton = document.querySelector('.collapsible');
  if (formToggleButton) {
    formToggleButton.addEventListener('click', function() {
      const formContainer = document.querySelector('.form-container');
      formContainer.style.display = formContainer.style.display === 'none' ? 'block' : 'none';
    });
  } else {
    console.error('Form toggle button not found');
  }

  // Toggle table visibility
  const tableToggleButton = document.querySelectorAll('.collapsible')[1];
  if (tableToggleButton) {
    tableToggleButton.addEventListener('click', function() {
      const tableContainer = document.querySelector('.table-container');
      tableContainer.style.display = tableContainer.style.display === 'none' ? 'block' : 'none';
    });
  } else {
    console.error('Table toggle button not found');
  }

  // Handle form submission
  const projectForm = document.querySelector('#project-form');
  if (projectForm) {
    projectForm.addEventListener('submit', async function(event) {
      event.preventDefault();
      console.log('Form submission prevented');
      const formData = new FormData(event.target);
      const data = Object.fromEntries(formData.entries());

      console.log('Form data:', data); // Debugging: Log form data

      try {
        console.log('Submitting form data...');
        const response = await gapi.client.sheets.spreadsheets.values.append({
          spreadsheetId: '16jODbEF0qWJLOgeCXJamc6Bv3HfoP9xevSBNwH-U4_I',
          range: 'SSmithProjects',
          valueInputOption: 'RAW',
          resource: {
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
          },
        });

        if (response.status === 200) {
          console.log('Form data submitted successfully.');
          alert('Project added successfully');
          fetchProjectData(); // Refresh the project list
          event.target.reset(); // Reset the form
        } else {
          console.error('Error response:', response); // Debugging: Log error response
          alert('Error adding project');
        }
      } catch (error) {
        console.error('Error adding project:', error);
        alert('Error adding project');
      }
    });
  } else {
    console.error('Project form not found');
  }
});