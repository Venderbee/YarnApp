// Fetch data from the server
async function fetchProjectData() {
  try {
    const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets/16jODbEF0qWJLOgeCXJamc6Bv3HfoP9xevSBNwH-U4_I/values/SSmithProjects?key="-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCZ7aHQPvd6bkWq\nCZ9NcF2UCrhKe5cqGLTb8+wLe8BMqk59SzLoAHfLH4eqY0EVlfRkrNkc8KQta0QP\nFpoRzzgo0qErMijT015uzsv8pft2NKndd/hUL7fs7i6mVNCKESl4UgeePD/fxY8D\nIUBSHXLzidqkBA5j9DGN5uKG5tb7ekrFZ+powcFw0wmyKSBNTUDxLuYfnyUm/ak8\npS+eN7f7vEJNU57VoYxXAE7jQ0jHDND5B1aMtmo+Yjy/lw+1xsWcsGCsR82rxyTh\nMB+zNTgoBABlyyUZqpOj1EW/4w+zUOnVAV6pDahjCKm+uaCKSGW23epNXjaHnzHR\n+iuJAsTdAgMBAAECggEAAZndmTsXpqPnynDFB2xgs5SB4JUPZi4/Xge++68Hbp0O\nTfaagBwnItOhrxQtqqKw+I4Z//jPXC3L7pcSBElXD+00JNbMwWnN4DNqmUreMq2h\nRM7kQtsfjdSJvIa0gl1jnaePdy5iypuRFQgylW5UIvE8a+qBtfEdclt01S8X+9mD\nPEVaPm+dNUMtWvH02EUQkZW6/5+hFjHtzCgbK5osX9L1+fnH49+V8kSs0CqIVcqp\n8szgk0yzPpZU4TNF7VawarYVErzwtdTYXvpoxm1WnK0CUEi2YXni1ZeK1CUFwW59\nsiFRk5G1iN1NhghIiWX+SIDDnc4JrTZI+4KlyQ5WwQKBgQDYwpCVHWT4dE7+9lf8\nkVuRL+PCgCVrosVCMOIDiLrLLFOexKihkkE5q62GcfeLiH1gK1kl1DFxFknqeG4v\n8VD6TmnbL7ynfDa3Ft7DqHvlAqk6nLMw/qlVwWuV7+QU7UowW2tERwX/mXT3Ic4V\nZdjDXDFeT/vUoCaIVsh3RDegwQKBgQC1yzfed3cw7AKWXl318SrszbvMRrQMU49f\nzP7jhBXn8PS92KlwhB+HwzxNCQ1nv/RpJYsfdN6ftUYnvznS9fPfGbkVpL0oZwLA\n3KB5J9LHOyokf4+xWYUQ/3NI+9+FCOeGt7j32H6+bGUaFh7TSlCTJEMtCwerSKsB\nwXJw8JpPHQKBgBZLpP2BgYJAzGNTSWeUN/vuFhpKfg7dNjcBui2s4bHGRG+fQM0l\nswnQi8+5Z0H17xd2PfwzIEbGiSHR81uBEdg9OowuE9SSZTpd4tnzOZMru+ZoedH/\nT8GfXIaWnzo70ha5QIZMW+SXjz1gP8dZq3skv3s49OlA89WwP3xtCt/BAoGATvCh\nn/6sSRgSv4zWrDc+9nkXtUp2YGvgdC8l91Gh2YeuHsn4OZ2Fu4QxqRnnMkgOL6JX\n2R78lMk4X4YP6+VVMmmPDzDr2qFwdqLXJAUA5/ZvBE5H7TD8MTdbrjOBCdml/7/D\nmAvwbWvQMxWr6P/6IQq8CNEjUWNKroZ71UMFHpkCgYBxUa0Umzz704tnxa27y2VH\nh6YiRMo7P194sOdHzwU2OAtULmLYmLX2Yqh3fgjNvAI1hIh4y+qKeGQCo2xOS13W\nBxz1Vcg5mlCAH0SIFaSpkMHf52BkV8du/nt9aA/6WM3sMb5P2X/uR3UywceZXOBO\n04znoBNqPrZrv3gd4GFn+Q==\n-----END PRIVATE KEY-----\n"');
    const data = await response.json();
    populateProjectList(data.values);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Populate the project list with data
function populateProjectList(rows) {
  const projectList = document.querySelector('#project-list');
  projectList.innerHTML = ''; // Clear existing list
  rows.slice(1).forEach(row => { // Skip the first row (headers)
    const listItem = document.createElement('li');
    listItem.textContent = `Project Name: ${row[0]}, Project Type: ${row[1]}, Start Date: ${row[2]}, Completion Date: ${row[3]}, Status: ${row[4]}, Deadline: ${row[5]}, Pattern Name: ${row[6]}, Pattern Source: ${row[7]}, Pattern Designer: ${row[8]}, Pattern Notes: ${row[9]}, Yarn Used: ${row[10]}, Hook Size: ${row[11]}, Other Tools: ${row[12]}, Rows/Rounds Completed: ${row[13]}, Time Spent: ${row[14]}, Photo Gallery: ${row[15]}, Step Notes: ${row[16]}, Color Palette: ${row[17]}, Gauge Swatch Info: ${row[18]}, Custom Modifications: ${row[19]}, Recipient: ${row[20]}, Budget: ${row[21]}, Difficulty Level: ${row[22]}, Tags/Categories: ${row[23]}`;
    projectList.appendChild(listItem);
  });
}

// Fetch and display data on load
fetchProjectData();

// Toggle form visibility
document.querySelector('.collapsible').addEventListener('click', function() {
  const formContainer = document.querySelector('.form-container');
  formContainer.style.display = formContainer.style.display === 'none' ? 'block' : 'none';
});

// Handle form submission
document.querySelector('#project-form').addEventListener('submit', async function(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());

  try {
    const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets/16jODbEF0qWJLOgeCXJamc6Bv3HfoP9xevSBNwH-U4_I/values/SSmithProjects:append?valueInputOption=RAW&key="-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCZ7aHQPvd6bkWq\nCZ9NcF2UCrhKe5cqGLTb8+wLe8BMqk59SzLoAHfLH4eqY0EVlfRkrNkc8KQta0QP\nFpoRzzgo0qErMijT015uzsv8pft2NKndd/hUL7fs7i6mVNCKESl4UgeePD/fxY8D\nIUBSHXLzidqkBA5j9DGN5uKG5tb7ekrFZ+powcFw0wmyKSBNTUDxLuYfnyUm/ak8\npS+eN7f7vEJNU57VoYxXAE7jQ0jHDND5B1aMtmo+Yjy/lw+1xsWcsGCsR82rxyTh\nMB+zNTgoBABlyyUZqpOj1EW/4w+zUOnVAV6pDahjCKm+uaCKSGW23epNXjaHnzHR\n+iuJAsTdAgMBAAECggEAAZndmTsXpqPnynDFB2xgs5SB4JUPZi4/Xge++68Hbp0O\nTfaagBwnItOhrxQtqqKw+I4Z//jPXC3L7pcSBElXD+00JNbMwWnN4DNqmUreMq2h\nRM7kQtsfjdSJvIa0gl1jnaePdy5iypuRFQgylW5UIvE8a+qBtfEdclt01S8X+9mD\nPEVaPm+dNUMtWvH02EUQkZW6/5+hFjHtzCgbK5osX9L1+fnH49+V8kSs0CqIVcqp\n8szgk0yzPpZU4TNF7VawarYVErzwtdTYXvpoxm1WnK0CUEi2YXni1ZeK1CUFwW59\nsiFRk5G1iN1NhghIiWX+SIDDnc4JrTZI+4KlyQ5WwQKBgQDYwpCVHWT4dE7+9lf8\nkVuRL+PCgCVrosVCMOIDiLrLLFOexKihkkE5q62GcfeLiH1gK1kl1DFxFknqeG4v\n8VD6TmnbL7ynfDa3Ft7DqHvlAqk6nLMw/qlVwWuV7+QU7UowW2tERwX/mXT3Ic4V\nZdjDXDFeT/vUoCaIVsh3RDegwQKBgQC1yzfed3cw7AKWXl318SrszbvMRrQMU49f\nzP7jhBXn8PS92KlwhB+HwzxNCQ1nv/RpJYsfdN6ftUYnvznS9fPfGbkVpL0oZwLA\n3KB5J9LHOyokf4+xWYUQ/3NI+9+FCOeGt7j32H6+bGUaFh7TSlCTJEMtCwerSKsB\nwXJw8JpPHQKBgBZLpP2BgYJAzGNTSWeUN/vuFhpKfg7dNjcBui2s4bHGRG+fQM0l\nswnQi8+5Z0H17xd2PfwzIEbGiSHR81uBEdg9OowuE9SSZTpd4tnzOZMru+ZoedH/\nT8GfXIaWnzo70ha5QIZMW+SXjz1gP8dZq3skv3s49OlA89WwP3xtCt/BAoGATvCh\nn/6sSRgSv4zWrDc+9nkXtUp2YGvgdC8l91Gh2YeuHsn4OZ2Fu4QxqRnnMkgOL6JX\n2R78lMk4X4YP6+VVMmmPDzDr2qFwdqLXJAUA5/ZvBE5H7TD8MTdbrjOBCdml/7/D\nmAvwbWvQMxWr6P/6IQq8CNEjUWNKroZ71UMFHpkCgYBxUa0Umzz704tnxa27y2VH\nh6YiRMo7P194sOdHzwU2OAtULmLYmLX2Yqh3fgjNvAI1hIh4y+qKeGQCo2xOS13W\nBxz1Vcg5mlCAH0SIFaSpkMHf52BkV8du/nt9aA/6WM3sMb5P2X/uR3UywceZXOBO\n04znoBNqPrZrv3gd4GFn+Q==\n-----END PRIVATE KEY-----\n"', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: [
          [
            data['project-name'],
            data['project-type'],
            data['start-date'],
            data['completion-date'],
            data['status'],
            data['deadline'],
            data['pattern-name'],
            data['pattern-source'],
            data['pattern-designer'],
            data['pattern-notes'],
            data['yarn-used'],
            data['hook-size'],
            data['other-tools'],
            data['rows-completed'],
            data['time-spent'],
            data['photo-gallery'],
            data['step-notes'],
            data['color-palette'],
            data['gauge-swatch-info'],
            data['custom-modifications'],
            data['recipient'],
            data['budget'],
            data['difficulty-level'],
            data['tags'],
          ],
        ],
      }),
    });

    if (response.ok) {
      alert('Project added successfully');
      fetchProjectData(); // Refresh the project list
      event.target.reset(); // Reset the form
    } else {
      alert('Error adding project');
    }
  } catch (error) {
    console.error('Error adding project:', error);
    alert('Error adding project');
  }
});