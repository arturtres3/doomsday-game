const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

app.get('/', (req, res) => {

    // testar pt-PT também e todos pt
    let lang = req.headers['accept-language'].includes("pt-BR") ? 'pt' : 'en'

    res.render('index.ejs', {lang: lang})
    
  });

app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
