const express = require('express');
const ejs = require('ejs');
const app = express();
const PORT = process.env.PORT || 8080;
const List = require('./app/mock/List');

app.set('views', __dirname + '/app/view');
app.use(express.static('public'));
app.engine('ejs', ejs.renderFile);

app.get('/', (req, res) => {
    const list = new List();

    res.render('index.ejs', { list: list.get() });
});

app.get('/api/search', (req, res) => {
    res.json({
        count: Math.round(Math.random() * 1000),
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
