const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./routes');

app.use(cors({
    origin: 'http://localhost:3000'
  }));
app.use(express.json());

app.use('/', router);

const port = 3001;

app.listen(port, () => {
  console.log(`Servidor ouvindo na porta ${port}`);
});
