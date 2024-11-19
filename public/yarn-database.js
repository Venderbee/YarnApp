document.addEventListener('DOMContentLoaded', () => {
  const yarnDatabaseList = document.getElementById('yarn-database-list');
  const userId = 'unique-user-id'; // Replace with a unique identifier for the user

  // Load yarn data from Cloudflare KV
  fetch(`https://<your-worker-subdomain>.workers.dev/load?userId=${userId}`)
    .then(response => response.json())
    .then(savedYarnData => {
      savedYarnData.forEach(yarn => {
        const listItem = document.createElement('li');
        listItem.textContent = `${yarn.name} - ${yarn.color} - ${yarn.quantity} skeins`;
        yarnDatabaseList.appendChild(listItem);
      });
    });
});