const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

//Setting up views
app.set('views', './views');

//Setting default engine to be ejs
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    const data = {
        person: {
            firstName: 'Vance',
            lastName: 'Pope'
        }
    }
    res.render('index', data);
});
// Catch and handle everything else
app.get('*', function (req, res) {
  res.send('Whoops, page not found 404').status(404);
})

app.listen(process.env.PORT || 8080, () => {
    console.log('listening at http://localhost:8080');
});