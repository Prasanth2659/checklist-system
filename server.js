const express = require('express');
const axios = require('axios');
const evaluateRules = require('./rules');

const app = express();
const port = 3000;

const API_URL = 'http://qa-gb.api.dynamatix.com:3100/api/applications/getApplicationById/67339ae56d5231c1a2c63639';

app.use(express.static('public'));

app.get('/checklist', async (req, res) => {
    try {
        const response = await axios.get(API_URL);
        const data = response.data;
        const results = evaluateRules(data);
        res.json(results);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
