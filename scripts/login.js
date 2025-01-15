document.addEventListener('DOMContentLoaded', function() {
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
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  // Handle login form submission
  document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    // Fetch data from the AccountRegistry sheet
    try {
      const response = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: '16jODbEF0qWJLOgeCXJamc6Bv3HfoP9xevSBNwH-U4_I',
        range: 'AccountRegistry',
      });

      const rows = response.result.values;
      const user = rows.find(row => row[0] === data.username && row[1] === data.password);

      if (user) {
        console.log('Login successful!');
        alert('Login successful!');
        window.location.href = 'index.html';
      } else {
        console.error('Invalid username or password');
        alert('Invalid username or password');
      }
    } catch (error) {
      console.error('Error fetching data from AccountRegistry:', error);
      alert('Error logging in. Please try again.');
    }
  });

  // Handle registration form submission
  document.getElementById('register-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    // Here you would typically send the registration data to your server
    console.log('Registration data:', data);

    // Initialize the Google API client
    gapi.load('client:auth2', async () => {
      await gapi.client.init({
        apiKey: 'AIzaSyCGCJPVfn_TFRd26jxF8K8yKo1C-jVOpH8',
      clientId: '1058604367745-v8mu9pbdpicgn5m20rqho8si5n1qof9n.apps.googleusercontent.com',
      discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
      scope: 'https://www.googleapis.com/auth/spreadsheets',
      });

      // Create new sheets for the user
      try {
        const batchUpdateResponse = await gapi.client.sheets.spreadsheets.batchUpdate({
          spreadsheetId: '16jODbEF0qWJLOgeCXJamc6Bv3HfoP9xevSBNwH-U4_I',
          resource: {
            requests: [
              {
                addSheet: {
                  properties: {
                    title: `${data.username}_YarnStash`,
                  },
                },
              },
              {
                addSheet: {
                  properties: {
                    title: `${data.username}_Projects`,
                  },
                },
              },
            ],
          },
        });

        if (batchUpdateResponse.status === 200) {
          console.log('Sheets created successfully.');

          // Add the new user's information to the AccountRegistry sheet
          const appendResponse = await gapi.client.sheets.spreadsheets.values.append({
            spreadsheetId: '16jODbEF0qWJLOgeCXJamc6Bv3HfoP9xevSBNwH-U4_I',
            range: 'AccountRegistry',
            valueInputOption: 'RAW',
            resource: {
              values: [
                [data.username, data.password, new Date().toISOString()],
              ],
            },
          });

          if (appendResponse.status === 200) {
            console.log('User information added to AccountRegistry.');
            alert('Account created successfully! Please log in.');
            window.location.href = 'login.html';
          } else {
            console.error('Error adding user information to AccountRegistry:', appendResponse);
            alert('Error creating account. Please try again.');
          }
        } else {
          console.error('Error creating sheets:', batchUpdateResponse);
          alert('Error creating account. Please try again.');
        }
      } catch (error) {
        console.error('Error creating sheets:', error);
        alert('Error creating account. Please try again.');
      }
    });
  });
});