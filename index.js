const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

app.get('/', (req, res) => {

    if(req.headers['accept-language'].includes("pt-BR")){
      res.render('indexPT.ejs')
    }else{
      res.render('indexEN.ejs')
    }
    
  });

app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
