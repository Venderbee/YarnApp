document.addEventListener('DOMContentLoaded', () => {
  const yarnForm = document.getElementById('yarn-form');
  const yarnList = document.getElementById('yarn-list');

  yarnForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const yarnName = document.getElementById('yarn-name').value;
    const yarnColor = document.getElementById('yarn-color').value;
    const yarnQuantity = document.getElementById('yarn-quantity').value;

    const listItem = document.createElement('li');
    listItem.textContent = `${yarnName} - ${yarnColor} - ${yarnQuantity} skeins`;

    yarnList.appendChild(listItem);

    yarnForm.reset();
  });
});