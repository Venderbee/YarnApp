// Fetch data from the servers
async function fetchYarnData() {
  try {
    const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets/16jODbEF0qWJLOgeCXJamc6Bv3HfoP9xevSBNwH-U4_I/values/SSmithYarn?key=MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDBj3lhnAOMYI86\n8TcoSj2J65XVTtc2T1a+pSN6gJr6b9AWdJXX72kaFWPaXRd5zBKFNigFVAcm3sPZ\nYXAkEDB63H/XDPHofejL+nZEa3/or1Mxcj/DoNEfhdj24hIGqN2X8FvBept0v0AL\nh6vayythO4jtzJ5sCVj24HUaLYgJh8mgh3MNNJw4+porUxd1TgOVGEuRU1H3zvC6\nW1qdm8hUCwgI2TzdXx9iC2aCDgjnXktDpQ+4nmFvg8BkjjZ7Y8BbdA3HE0qlW2L/\nx7hZjPeXgB2JCRhU+66ViV0hITiuyZ1L7eaZ8yxJ+jJj4uiPnONx+14ZUfj0oIui\nZ1sJbhGjAgMBAAECggEAB/VEqdE2yiI8MVGykVsADbgcaHE94vM/H0Z9328DMDHB\nrfKsKH0k5pgji1pReUX9KvHvkkyCoMP+7GSXrjvmKl7/eJGFLqhilmRdUXHUB/aR\nZpKKcZoejvu7UGc6E4EE31bYBuvqEVI9qVuyIqRAy9YdSp2jk9CMklXnKqTdl3ql\n0pXh6ktrxPUX/S1kEooy16toyFhK+NJhAvgXLaJlGcVZ9U1BAGnRe3UNdwyGJ2T6\nVY4CBx0aFBZDAiAg4lGyiotp+HGeAS0/ZQ+lbdPGY1TaSzVCxtU412DbHg05mccE\n7zbOT6PMtuvVIBquIDZhlwcr8zP3NqMshhNrM7fckQKBgQD4jzSHfbNBOKV8koyU\n/DbCuv1i3V9k71PZiXkD6Jgsc/pSaF5stTv6KE6Ux6l2ZCXBnU4WVDQhWY9xXGn9\nI3zwT4jjjOdNneqSeM1nK3l7nddcZt3OwCYKMxIvEzEmS8Saz/OGAljruXqwZu04\no9EBJiCQG+sZ3W16gyzA07mnUQKBgQDHWssbDEROeMTBabXP3SgIknHkyI/+mUmn\nkhFmvfxFWrnBTGCP3iSUmL4b96yd69wq+Il2mgjxix1kChOAaiKuY/7gtEv2rt5y\niN/DYe5pGyBz+x2PZ1NefxeBw/0e+aTXVA077JO14Pc2v12CbBrCeiV7uXqX95KI\n84fRWV/UswKBgDoWnZwckEvpxSL7zMb0uod/07/LJIQeOmZYbmOvdADPiezAX3Dg\nWgf4a4TxtHTqqrg43wrw2s4AdDl1838pUAWJUOB9CYFmKm/Ys4gs7NMq7C24DJZI\n6ZrwnItL3OyqQGQ9vRfQbJ+KVVXsd/wIrMur8Wg8XhFJYlCDX24hDP5BAoGAMojU\ndZ3Nbur0TWcjnHaeYFXnIyyoO8zVu/GuEZJVcatG7TYUQEP6l+SERIirLDkOzaHF\nDtiLLdeq8qIPQX0mH3jfskxh+T1ozDXgKyIXEnO67UuZubFik9C5v75T2tdDrwXy\neN9GrlNBt5IY/Se0PNpDyDJDXmR2s9qv8iSqwzsCgYEAo+H3xBEoqo2DHjUMUQ/C\nxCVyOfx46x1TwYLaiubn+YXcFloeNJ/8CbeiIqN6DXNcuURf6Bz1vYkDJ2P8Rhsm\n+bTNSuh8W1Mw1ekuND10clvW4/96e4PmNZ1P6AWE6cDnontmphPAh8oK3pOmBpEo\nuDNsAaAxiX07+eY9W6aUMkU=');
    const data = await response.json();
    populateYarnTable(data.values);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Populate the yarn table with data
function populateYarnTable(rows) {
  const yarnTableBody = document.querySelector('#yarnTable tbody');
  yarnTableBody.innerHTML = ''; // Clear existing table
  rows.slice(1).forEach(row => { // Skip the first row (headers)
    const tableRow = document.createElement('tr');
    row.slice(1).forEach(cell => { // Skip the first cell (ID)
      const tableCell = document.createElement('td');
      tableCell.textContent = cell || 'N/A'; // Handle empty cells
      tableRow.appendChild(tableCell);
    });
    yarnTableBody.appendChild(tableRow);
  });
}

// Fetch and display data on load
fetchYarnData();

// Toggle form visibility
document.querySelector('.collapsible').addEventListener('click', function() {
  const formContainer = document.querySelector('.form-container');
  formContainer.style.display = formContainer.style.display === 'none' ? 'block' : 'none';
});

// Handle form submission
document.querySelector('#yarn-form').addEventListener('submit', async function(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());

  try {
    const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets/16jODbEF0qWJLOgeCXJamc6Bv3HfoP9xevSBNwH-U4_I/values/SSmithYarn:append?valueInputOption=RAW&key=MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDBj3lhnAOMYI86\n8TcoSj2J65XVTtc2T1a+pSN6gJr6b9AWdJXX72kaFWPaXRd5zBKFNigFVAcm3sPZ\nYXAkEDB63H/XDPHofejL+nZEa3/or1Mxcj/DoNEfhdj24hIGqN2X8FvBept0v0AL\nh6vayythO4jtzJ5sCVj24HUaLYgJh8mgh3MNNJw4+porUxd1TgOVGEuRU1H3zvC6\nW1qdm8hUCwgI2TzdXx9iC2aCDgjnXktDpQ+4nmFvg8BkjjZ7Y8BbdA3HE0qlW2L/\nx7hZjPeXgB2JCRhU+66ViV0hITiuyZ1L7eaZ8yxJ+jJj4uiPnONx+14ZUfj0oIui\nZ1sJbhGjAgMBAAECggEAB/VEqdE2yiI8MVGykVsADbgcaHE94vM/H0Z9328DMDHB\nrfKsKH0k5pgji1pReUX9KvHvkkyCoMP+7GSXrjvmKl7/eJGFLqhilmRdUXHUB/aR\nZpKKcZoejvu7UGc6E4EE31bYBuvqEVI9qVuyIqRAy9YdSp2jk9CMklXnKqTdl3ql\n0pXh6ktrxPUX/S1kEooy16toyFhK+NJhAvgXLaJlGcVZ9U1BAGnRe3UNdwyGJ2T6\nVY4CBx0aFBZDAiAg4lGyiotp+HGeAS0/ZQ+lbdPGY1TaSzVCxtU412DbHg05mccE\n7zbOT6PMtuvVIBquIDZhlwcr8zP3NqMshhNrM7fckQKBgQD4jzSHfbNBOKV8koyU\n/DbCuv1i3V9k71PZiXkD6Jgsc/pSaF5stTv6KE6Ux6l2ZCXBnU4WVDQhWY9xXGn9\nI3zwT4jjjOdNneqSeM1nK3l7nddcZt3OwCYKMxIvEzEmS8Saz/OGAljruXqwZu04\no9EBJiCQG+sZ3W16gyzA07mnUQKBgQDHWssbDEROeMTBabXP3SgIknHkyI/+mUmn\nkhFmvfxFWrnBTGCP3iSUmL4b96yd69wq+Il2mgjxix1kChOAaiKuY/7gtEv2rt5y\niN/DYe5pGyBz+x2PZ1NefxeBw/0e+aTXVA077JO14Pc2v12CbBrCeiV7uXqX95KI\n84fRWV/UswKBgDoWnZwckEvpxSL7zMb0uod/07/LJIQeOmZYbmOvdADPiezAX3Dg\nWgf4a4TxtHTqqrg43wrw2s4AdDl1838pUAWJUOB9CYFmKm/Ys4gs7NMq7C24DJZI\n6ZrwnItL3OyqQGQ9vRfQbJ+KVVXsd/wIrMur8Wg8XhFJYlCDX24hDP5BAoGAMojU\ndZ3Nbur0TWcjnHaeYFXnIyyoO8zVu/GuEZJVcatG7TYUQEP6l+SERIirLDkOzaHF\nDtiLLdeq8qIPQX0mH3jfskxh+T1ozDXgKyIXEnO67UuZubFik9C5v75T2tdDrwXy\neN9GrlNBt5IY/Se0PNpDyDJDXmR2s9qv8iSqwzsCgYEAo+H3xBEoqo2DHjUMUQ/C\nxCVyOfx46x1TwYLaiubn+YXcFloeNJ/8CbeiIqN6DXNcuURf6Bz1vYkDJ2P8Rhsm\n+bTNSuh8W1Mw1ekuND10clvW4/96e4PmNZ1P6AWE6cDnontmphPAh8oK3pOmBpEo\nuDNsAaAxiX07+eY9W6aUMkU=', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: [
          [
            data['yarn-brand'],
            data['yarn-sub-brand'],
            data['yarn-material'],
            data['yarn-weight'],
            data['yarn-color'],
            data['yarn-dye-lot'],
            data['yarn-partial-balls'],
            data['yarn-full-skeins'],
            data['yarn-length'],
            data['yarn-hook-size'],
            data['yarn-needle-size'],
            data['yarn-projects'],
            data['yarn-mom-like'],
            data['yarn-store'],
          ],
        ],
      }),
    });

    if (response.ok) {
      alert('Yarn added successfully');
      fetchYarnData(); // Refresh the table data
      event.target.reset(); // Reset the form
    } else {
      alert('Error adding yarn');
    }
  } catch (error) {
    console.error('Error adding yarn:', error);
    alert('Error adding yarn');
  }
});