function handleCredentialResponse(response) {
  console.log('Encoded JWT ID token: ' + response.credential);
  // Decode the JWT to get user information
  const user = parseJwt(response.credential);
  console.log('User information:', user);

  // Store user information in local storage or session storage
  localStorage.setItem('user', JSON.stringify(user));

  // Redirect to the project manager page
  window.location.href = 'index.html';
}

function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

// Handle registration form submission
document.getElementById('register-form').addEventListener('submit', async function (event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());

  // Here you would typically send the registration data to your server
  console.log('Registration data:', data);

  // Create a new yarn sheet for the user
  try {
    const response = await gapi.client.sheets.spreadsheets.batchUpdate({
      spreadsheetId: 'YOUR_SPREADSHEET_ID',
      resource: {
        requests: [
          {
            addSheet: {
              properties: {
                title: `${data.username}Yarn`,
              },
            },
          },
        ],
      },
    });

      if (response.status === 200) {
        console.log('Sheet created successfully.');
        alert('Account created successfully! Please log in.');
        window.location.href = 'login.html';
      } else {
        console.error('Error creating sheet:', response);
        alert('Error creating account. Please try again.');
      }
    } catch (error) {
      console.error('Error creating sheet:', error);
      alert('Error creating account. Please try again.');
    }
  });

  //create new project sheet for the user
  try {
    const response = await gapi.client.sheets.spreadsheets.batchUpdate({
      spreadsheetId: 'YOUR_SPREADSHEET_ID',
      resource: {
        requests: [
          {
            addSheet: {
              properties: {
                title: `${data.username}Projects`,
              },
            },
          },
        ],
      },
    });

    if (response.status === 200) {
      console.log('Sheet created successfully.');
      alert('Account created successfully! Please log in.');
      window.location.href = 'login.html';
    } else {
      console.error('Error creating sheet:', response);
      alert('Error creating account. Please try again.');
    }
  } catch (error) {
    console.error('Error creating sheet:', error);
    alert('Error creating account. Please try again.');
  };