document.addEventListener('DOMContentLoaded', () => {
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
});