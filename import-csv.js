const express = require('express');
const fs = require('fs');
const csvParser = require('csv-parser');

const app = express();

// Import CSV Route
app.post('/import/csv', (req, res) => {
    // Check if file was uploaded
    if (!req.files || !req.files.csvFile) {
        return res.status(400).send('No file uploaded');
    }

    // Parse CSV file
    const csvFile = req.files.csvFile;
    csvFile.pipe(csvParser())
        .on('data', (row) => {
            // Process each row of data
            console.log('Row:', row);
        })
        .on('end', () => {
            // CSV parsing complete
            res.send('CSV import complete');
        })
        .on('error', (error) => {
            // Handle parsing errors
            console.error('CSV parsing error:', error);
            res.status(500).send('Internal server error');
        });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
