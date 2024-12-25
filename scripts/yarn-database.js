document.addEventListener('DOMContentLoaded', () => {
  const yarnForm = document.getElementById('yarn-form');
  const yarnDatabaseTableBody = document.querySelector('#yarn-database-table tbody');
  const filterNameInput = document.getElementById('filter-name');
  const filterColorInput = document.getElementById('filter-color');
  const filterQuantityInput = document.getElementById('filter-quantity');
  const searchYarnInput = document.getElementById('search-yarn');
  const userId = 'unique-user-id'; // Replace with a unique identifier for the user

  // Load yarn data from Cloudflare KV
  fetch(`https://yarnworker.workers.dev/load?userId=${userId}`)
    .then(response => response.json())
    .then(savedYarnData => {
      savedYarnData.forEach(yarn => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${yarn.name}</td>
          <td>${yarn.color}</td>
          <td>${yarn.quantity}</td>
        `;
        yarnDatabaseTableBody.appendChild(row);
      });
    });

  yarnForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const yarnName = document.getElementById('yarn-name').value;
    const yarnColor = document.getElementById('yarn-color').value;
    const yarnQuantity = document.getElementById('yarn-quantity').value;

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${yarnName}</td>
      <td>${yarnColor}</td>
      <td>${yarnQuantity}</td>
    `;
    yarnDatabaseTableBody.appendChild(row);

    // Save yarn data to Cloudflare KV
    const yarnData = {
      name: yarnName,
      color: yarnColor,
      quantity: yarnQuantity
    };
    fetch(`https://yarnworker.workers.dev/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId, yarnData })
    });

    yarnForm.reset();
  });

  // Filter function
  function filterTable() {
    const filterName = filterNameInput.value.toLowerCase();
    const filterColor = filterColorInput.value.toLowerCase();
    const filterQuantity = filterQuantityInput.value;
    const searchYarn = searchYarnInput.value.toLowerCase();

    const rows = yarnDatabaseTableBody.getElementsByTagName('tr');
    Array.from(rows).forEach(row => {
      const nameCell = row.cells[0].textContent.toLowerCase();
      const colorCell = row.cells[1].textContent.toLowerCase();
      const quantityCell = row.cells[2].textContent;

      const matchesName = nameCell.includes(filterName);
      const matchesColor = colorCell.includes(filterColor);
      const matchesQuantity = filterQuantity === '' || quantityCell === filterQuantity;
      const matchesSearch = nameCell.includes(searchYarn) || colorCell.includes(searchYarn) || quantityCell.includes(searchYarn);

      if (matchesName && matchesColor && matchesQuantity && matchesSearch) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  }

  // Add event listeners for filter inputs
  filterNameInput.addEventListener('input', filterTable);
  filterColorInput.addEventListener('input', filterTable);
  filterQuantityInput.addEventListener('input', filterTable);
  searchYarnInput.addEventListener('input', filterTable);
});

// Fetch data from the server
async function fetchYarnData() {
  try {
    const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets/YOUR_SPREADSHEET_ID/values/SSmithYarn?key=YOUR_API_KEY');
    const data = await response.json();
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
    const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets/YOUR_SPREADSHEET_ID/values/SSmithYarn:append?valueInputOption=RAW&key=YOUR_API_KEY', {
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