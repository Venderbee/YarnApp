document.addEventListener('DOMContentLoaded', () => {
  const projectForm = document.getElementById('project-form');
  const projectList = document.getElementById('project-list');
  const projectModal = document.getElementById('project-modal');
  const modalClose = document.querySelector('.close');
  const modalProjectName = document.getElementById('modal-project-name');
  const modalProjectPattern = document.getElementById('modal-project-pattern');
  const modalProjectYarn = document.getElementById('modal-project-yarn');
  const userId = 'unique-user-id'; // Replace with a unique identifier for the user

  // Load project data from Cloudflare KV
  fetch(`https://<your-worker-subdomain>.workers.dev/load-projects?userId=${userId}`)
    .then(response => response.json())
    .then(savedProjectData => {
      savedProjectData.forEach(project => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
          <h3>${project.name}</h3>
          <button class="open-project" data-name="${project.name}" data-pattern="${project.pattern}" data-yarn="${project.yarn}">Open Project</button>
        `;
        projectList.appendChild(listItem);
      });

      // Add event listeners to open project buttons
      document.querySelectorAll('.open-project').forEach(button => {
        button.addEventListener('click', (event) => {
          const name = event.target.getAttribute('data-name');
          const pattern = event.target.getAttribute('data-pattern');
          const yarn = event.target.getAttribute('data-yarn');

          modalProjectName.textContent = name;
          modalProjectPattern.textContent = pattern;
          modalProjectYarn.textContent = yarn;

          projectModal.style.display = 'block';
        });
      });
    });

  projectForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const projectName = document.getElementById('project-name').value;
    const projectPattern = document.getElementById('project-pattern').value;
    const projectYarn = document.getElementById('project-yarn').value;

    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <h3>${projectName}</h3>
      <button class="open-project" data-name="${projectName}" data-pattern="${projectPattern}" data-yarn="${projectYarn}">Open Project</button>
    `;
    projectList.appendChild(listItem);

    // Save project data to Cloudflare KV
    const projectData = {
      name: projectName,
      pattern: projectPattern,
      yarn: projectYarn
    };
    fetch(`https://<your-worker-subdomain>.workers.dev/save-project`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId, projectData })
    });

    projectForm.reset();

    // Add event listener to the new open project button
    listItem.querySelector('.open-project').addEventListener('click', (event) => {
      const name = event.target.getAttribute('data-name');
      const pattern = event.target.getAttribute('data-pattern');
      const yarn = event.target.getAttribute('data-yarn');

      modalProjectName.textContent = name;
      modalProjectPattern.textContent = pattern;
      modalProjectYarn.textContent = yarn;

      projectModal.style.display = 'block';
    });
  });

  // Close the modal
  modalClose.addEventListener('click', () => {
    projectModal.style.display = 'none';
  });

  // Close the modal when clicking outside of it
  window.addEventListener('click', (event) => {
    if (event.target == projectModal) {
      projectModal.style.display = 'none';
    }
  });
});