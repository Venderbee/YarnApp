document.addEventListener('DOMContentLoaded', () => {
  const yarnForm = document.getElementById('yarn-form');
  const yarnDatabaseTableBody = document.querySelector('#yarn-database-table tbody');
  const userId = 'unique-user-id'; // Replace with a unique identifier for the user

  // Load yarn data from Cloudflare KV
  fetch(`https://<your-worker-subdomain>.workers.dev/load?userId=${userId}`)
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
    fetch(`https://<your-worker-subdomain>.workers.dev/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId, yarnData })
    });

    yarnForm.reset();
  });
});