document.addEventListener('DOMContentLoaded', () => {
  const projectForm = document.getElementById('project-form');
  const projectList = document.getElementById('project-list');
  const userId = 'unique-user-id'; // Replace with a unique identifier for the user

  // Load project data from Cloudflare KV
  fetch(`https://<your-worker-subdomain>.workers.dev/load-projects?userId=${userId}`)
    .then(response => response.json())
    .then(savedProjectData => {
      savedProjectData.forEach(project => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
          <h3>${project.name}</h3>
          <p><strong>Pattern:</strong> ${project.pattern}</p>
          <p><strong>Yarn:</strong> ${project.yarn}</p>
        `;
        projectList.appendChild(listItem);
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
      <p><strong>Pattern:</strong> ${projectPattern}</p>
      <p><strong>Yarn:</strong> ${projectYarn}</p>
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
  });
});