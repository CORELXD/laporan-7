// views/index.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

const db = require('./config/db');

// Import rute CRUD dari entitas detail_kk, ktp, dan kartu_keluarga
const detailKKRouter = require('./controller/master/detail_kk');
const ktpRouter = require('./controller/master/ktp');
const kartuKeluargaRouter = require('./controller/master/kartu_keluarga');

// Gunakan rute-rute dari entitas-detail_kk, ktp, dan kartu_keluarga
app.use('/api/detail_kk', detailKKRouter); // Gunakan tanda kutip untuk path jika diperlukan
app.use('/api/ktp',ktpRouter);
app.use('/api/kartu_keluarga',kartuKeluargaRouter);

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
