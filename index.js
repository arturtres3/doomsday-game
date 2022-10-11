const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

app.get('/', (req, res) => {

    let accepted_languages = req.headers['accept-language']
    let lang =  accepted_languages.includes("pt") || 
                accepted_languages.includes("pt-BR") ||
                accepted_languages.includes("pt-PT")  ? 'pt' : 'en'

    res.render('index.ejs', {lang: lang})
    
  });

app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
