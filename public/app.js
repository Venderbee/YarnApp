document.addEventListener('DOMContentLoaded', () => {
  const yarnForm = document.getElementById('yarn-form');
  const yarnList = document.getElementById('yarn-list');
  const userId = 'unique-user-id'; // Replace with a unique identifier for the user

  // Load yarn data from Cloudflare KV
  fetch(`/load?userId=${userId}`)
    .then(response => response.json())
    .then(savedYarnData => {
      savedYarnData.forEach(yarn => {
        const listItem = document.createElement('li');
        listItem.textContent = `${yarn.name} - ${yarn.color} - ${yarn.quantity} skeins`;
        yarnList.appendChild(listItem);
      });
    });

  yarnForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const yarnName = document.getElementById('yarn-name').value;
    const yarnColor = document.getElementById('yarn-color').value;
    const yarnQuantity = document.getElementById('yarn-quantity').value;

    const listItem = document.createElement('li');
    listItem.textContent = `${yarnName} - ${yarnColor} - ${yarnQuantity} skeins`;
    yarnList.appendChild(listItem);

    // Save yarn data to Cloudflare KV
    const yarnData = {
      name: yarnName,
      color: yarnColor,
      quantity: yarnQuantity
    };
    fetch('/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId, yarnData: [yarnData] })
    });

    yarnForm.reset();
  });
});