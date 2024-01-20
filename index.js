import express from 'express';
import fetch from 'node-fetch';
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/calendar', async (req, res) => {
  try {
    const webcalUrl = req.query.url.replace('webcal', 'https');
    const response = await fetch(webcalUrl);
    const calendarData = await response.text();
    res.send(calendarData);
  } catch (error) {
    console.error('Error fetching calendar:', error);
    res.status(500).send('Error fetching calendar');
  }
});
;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
