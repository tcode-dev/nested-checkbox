const asset = require(__dirname + '/backend/library/asset');
const express = require('express');
const ejs = require('ejs');
const app = express();
const PORT = process.env.PORT || 8080;
const List = require('./backend/mock/List');

app.set('views', __dirname + '/backend/view');
app.use(express.static(__dirname + '/public'));
app.engine('ejs', ejs.renderFile);

app.get('/', (req, res) => {
    const list = new List();

    res.render('index.ejs', { list: list.get(), asset });
});

app.get('/api/search', (req, res) => {
    res.json({
        count: Math.round(Math.random() * 1000),
    });
});

app.listen(PORT, () => {
    /* eslint no-console: 0 */
    console.log(`Server listening on port ${PORT}...`);
});
