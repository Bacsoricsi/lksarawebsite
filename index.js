const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const counterFile = 'counter.json';

app.use(cors());
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Read the counter value from the file
const readCounter = () => {
    if (fs.existsSync(counterFile)) {
        const data = fs.readFileSync(counterFile);
        return JSON.parse(data).counter;
    }
    return 0;
};

// Write the counter value to the file
const writeCounter = (counter) => {
    fs.writeFileSync(counterFile, JSON.stringify({ counter }));
};

// Endpoint to get the current counter value
app.get('/counter', (req, res) => {
    const counter = readCounter();
    res.json({ counter });
});

// Endpoint to increment the counter value
app.post('/increment', (req, res) => {
    let counter = readCounter();
    counter++;
    writeCounter(counter);
    res.json({ counter });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
