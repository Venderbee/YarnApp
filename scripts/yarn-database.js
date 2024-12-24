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