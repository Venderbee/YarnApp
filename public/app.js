document.addEventListener('DOMContentLoaded', () => {
  const yarnForm = document.getElementById('yarn-form');
  const yarnList = document.getElementById('yarn-list');

  // Load yarn data from localStorage
  const savedYarnData = JSON.parse(localStorage.getItem('yarnData')) || [];
  savedYarnData.forEach(yarn => {
    const listItem = document.createElement('li');
    listItem.textContent = `${yarn.name} - ${yarn.color} - ${yarn.quantity} skeins`;
    yarnList.appendChild(listItem);
  });

  yarnForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const yarnName = document.getElementById('yarn-name').value;
    const yarnColor = document.getElementById('yarn-color').value;
    const yarnQuantity = document.getElementById('yarn-quantity').value;

    const listItem = document.createElement('li');
    listItem.textContent = `${yarnName} - ${yarnColor} - ${yarnQuantity} skeins`;
    yarnList.appendChild(listItem);

    // Save yarn data to localStorage
    const yarnData = {
      name: yarnName,
      color: yarnColor,
      quantity: yarnQuantity
    };
    savedYarnData.push(yarnData);
    localStorage.setItem('yarnData', JSON.stringify(savedYarnData));

    yarnForm.reset();
  });
});