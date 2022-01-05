const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

require('./server/')//(app, tweets);

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

let startDate = new Date(1900, 0, 1)
let endDate = new Date(2100, 0, 1)
var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

//console.log(randomDate(new Date(2012, 0, 1), new Date()));

app.get('/', (req, res) => {
    res.render('index.ejs', {date: randomDate(startDate, endDate).toLocaleDateString("en-US", options)});
  });

app.get('/next', (req, res) => {
  res.send(randomDate(startDate, endDate).toLocaleDateString("en-US", options));
});

app.post('/teste', (req, res) => {
  console.log(req.body);
  res.redirect('/')
  //res.sendStatus(200)
  //res.send(req.body)
})

app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
