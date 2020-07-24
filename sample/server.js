const asset = require(__dirname + '/backend/library/asset');
const express = require('express');
const ejs = require('ejs');
const app = express();
const PORT = process.env.PORT || 8080;
const List = require('./backend/mock/List');
const Search = require('./backend/mock/Search');

app.set('views', __dirname + '/backend/view');
app.use(express.static(__dirname + '/public'));
app.engine('ejs', ejs.renderFile);

app.get('/', (req, res) => {
    const list = new List();

    res.render('index.ejs', { list: list.get(), asset });
});

app.get('/api/search', (req, res) => {
    const search = new Search();

    res.json({
        count: search.count(),
    });
});

app.listen(PORT, () => {
    /* eslint no-console: 0 */
    console.log(`Server listening on port ${PORT}...`);
});
