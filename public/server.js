const fs = require('fs');
const { google } = require('googleapis');
const express = require('express');
const app = express();
const port = 3000;

// Load the service account key JSON file
const serviceAccount = require('C:\Users\peanu\YarnApp\yarn-data-445722-cbd52678c5ea.json');

// Configure a JWT auth client
const jwtClient = new google.auth.JWT(
  serviceAccount.client_email,
  null,
  serviceAccount.private_key,
  ['https://www.googleapis.com/auth/spreadsheets.readonly']
);

// Authenticate request
jwtClient.authorize((err, tokens) => {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log('Successfully connected!');
  }
});

// Google Sheets API
const sheets = google.sheets({ version: 'v4', auth: jwtClient });

// Fetch data from Google Sheets
app.get('/fetch-yarn-data', async (req, res) => {
  const spreadsheetId = '16jODbEF0qWJLOgeCXJamc6Bv3HfoP9xevSBNwH-U4_I';
  const range = 'SSmith'; // Adjust this to your sheet name or range

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    res.json(response.data.values);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});