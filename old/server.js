const fs = require('fs');
const { google } = require('googleapis');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Load the service account key JSON file
const serviceAccount = require('./yarn-data-445722-cbd52678c5ea.json');

// Configure a JWT auth client
const jwtClient = new google.auth.JWT(
  serviceAccount.client_email,
  null,
  serviceAccount.private_key,
  ['https://www.googleapis.com/auth/spreadsheets']
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

// Serve static files from the public directory
app.use(express.static(path.join(__dirname)));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the HTML file for the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'yarn-database.html'));
});

// Fetch data from Google Sheets
app.get('/fetch-yarn-data', async (req, res) => {
  const spreadsheetId = '16jODbEF0qWJLOgeCXJamc6Bv3HfoP9xevSBNwH-U4_I';
  const range = 'SSmithYarn'; // Adjust this to your sheet name or range

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

// Add new yarn data to Google Sheets
app.post('/add-yarn', async (req, res) => {
  const spreadsheetId = '16jODbEF0qWJLOgeCXJamc6Bv3HfoP9xevSBNwH-U4_I';
  const range = 'SSmithYarn'; // Adjust this to your sheet name or range

  try {
    // Fetch existing data to determine the next ID
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    const rows = response.data.values;
    const nextId = rows.length; // Assuming the first row is headers

    // Prepare new row data
    const newRow = [
      nextId.toString(),
      req.body['yarn-brand'],
      req.body['yarn-sub-brand'],
      req.body['yarn-material'],
      req.body['yarn-weight'],
      req.body['yarn-color'],
      req.body['yarn-dye-lot'],
      req.body['yarn-partial-balls'],
      req.body['yarn-full-skeins'],
      req.body['yarn-length'],
      req.body['yarn-hook-size'],
      req.body['yarn-needle-size'],
      req.body['yarn-projects'],
      req.body['yarn-mom-like'],
      req.body['yarn-store'],
    ];

    console.log('Appending new row:', newRow);

    // Append new row to the sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      resource: {
        values: [newRow],
      },
    });

    res.status(200).send('Yarn added successfully');
  } catch (error) {
    console.error('Error adding yarn:', error);
    res.status(500).send('Error adding yarn');
  }
});

// Fetch project data from Google Sheets
app.get('/fetch-project-data', async (req, res) => {
  const spreadsheetId = '16jODbEF0qWJLOgeCXJamc6Bv3HfoP9xevSBNwH-U4_I';
  const range = 'SSmithProjects'; // Adjust this to your sheet name or range

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

// Add new project data to Google Sheets
app.post('/add-project', async (req, res) => {
  const spreadsheetId = '16jODbEF0qWJLOgeCXJamc6Bv3HfoP9xevSBNwH-U4_I';
  const range = 'SSmithProjects'; // Adjust this to your sheet name or range

  try {
    // Fetch existing data to determine the next ID
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    const rows = response.data.values;
    const nextId = rows.length; // Assuming the first row is headers

    // Prepare new row data
    const newRow = [
      req.body['project-name'],
      req.body['project-type'],
      req.body['start-date'],
      req.body['completion-date'],
      req.body['status'],
      req.body['deadline'],
      req.body['pattern-name'],
      req.body['pattern-source'],
      req.body['pattern-designer'],
      req.body['pattern-notes'],
      req.body['yarn-used'],
      req.body['hook-size'],
      req.body['other-tools'],
      req.body['rows-completed'],
      req.body['time-spent'],
      req.body['photo-gallery'],
      req.body['step-notes'],
      req.body['color-palette'],
      req.body['gauge-swatch-info'],
      req.body['custom-modifications'],
      req.body['recipient'],
      req.body['budget'],
      req.body['difficulty-level'],
      req.body['tags'],
    ];

    console.log('Appending new project row:', newRow);

    // Append new row to the sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      resource: {
        values: [newRow],
      },
    });

    res.status(200).send('Project added successfully');
  } catch (error) {
    console.error('Error adding project:', error);
    res.status(500).send('Error adding project');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});