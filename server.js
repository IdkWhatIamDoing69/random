const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Nurodome, kad statiniai failai yra RandomClips aplanke
app.use(express.static(path.join(__dirname, 'RandomClips')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'RandomClips', 'RandomClips.html'));
});

app.listen(PORT, () => {
    console.log(`Serveris paleistas ant ${PORT} porto!`);
});
