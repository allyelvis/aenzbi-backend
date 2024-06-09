const express = require('express');
const fs = require('fs');

const app = express();

// Export to CSV Route
app.get('/export/csv', (req, res) => {
    // Generate CSV content (dummy data)
    const csvData = 'Name,Email\nJohn Doe,john@example.com\nJane Doe,jane@example.com';

    // Set response headers
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="export.csv"');

    // Send CSV data to client
    res.send(csvData);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
