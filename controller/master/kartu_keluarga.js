const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const connection = require('../../config/db');

router.get('/', (req, res) => {
  connection.query('SELECT * FROM kartu_keluarga LEFT JOIN detail_kk ON kartu_keluarga.no_kk = detail_kk.no_kk LEFT JOIN KTP ON detail_kk.nik = KTP.nik', (error, rows) => {
    if (error) {
      return res.status(500).json({
        status: false,
        message: 'Server Error',
        error: error,
      });
    } else {
      return res.status(200).json({
        status: true,
        message: 'Data Kartu Keluarga with related KTP data',
        data: rows,
      });
    }
  });
});

// GET Kartu Keluarga data by no_kk
router.get('/kartu_keluarga/:no_kk', (req, res) => {
  const no_kk = req.params.no_kk;
  connection.query('SELECT * FROM Kartu_keluarga WHERE no_kk = ?', no_kk, (error, rows) => {
    if (error) {
      return res.status(500).json({
        status: false,
        message: 'Server Error',
        error: error,
      });
    }
    if (rows.length <= 0) {
      return res.status(404).json({
        status: false,
        message: 'Data Kartu Keluarga tidak ditemukan',
      });
    } else {
      return res.status(200).json({
        status: true,
        message: 'Data Kartu Keluarga',
        data: rows[0],
      });
    }
  });
});

// POST a new Kartu Keluarga data
router.post('/', [
  // Validation
  body('no_kk').notEmpty(),
  body('alamat').notEmpty(),
  body('rt').notEmpty(),
  body('rw').notEmpty(),
  body('kode_pos').notEmpty(),
  body('desa_kelurahan').notEmpty(),
  body('kecamatan').notEmpty(),
  body('kabupaten_kota').notEmpty(),
  body('provinsi').notEmpty(),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const data = req.body;
  connection.query('INSERT INTO kartu_keluarga SET ?', data, (error, result) => {
    if (error) {
      return res.status(500).json({
        status: false,
        message: 'Server Error',
        error: error,
      });
    } else {
      return res.status(201).json({
        status: true,
        message: 'Data Kartu Keluarga berhasil ditambahkan',
        data: result,
      });
    }
  });
});

// PUT (Update) an existing Kartu Keluarga data by no_kk
router.put('/update/:no_kk', [
  // Validation
  body('alamat').notEmpty(),
  body('rt').notEmpty(),
  body('rw').notEmpty(),
  body('kode_pos').notEmpty(),
  body('desa_kelurahan').notEmpty(),
  body('kecamatan').notEmpty(),
  body('kabupaten_kota').notEmpty(),
  body('provinsi').notEmpty(),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const no_kk = req.params.no_kk;
  const data = req.body;
  connection.query('UPDATE kartu_keluarga SET ? WHERE no_kk = ?', [data, no_kk], (error, result) => {
    if (error) {
      return res.status(500).json({
        status: false,
        message: 'Server Error',
        error: error,
      });
    } else {
      return res.status(200).json({
        status: true,
        message: 'Data Kartu Keluarga berhasil diperbarui',
      });
    }
  });
});

// DELETE a Kartu Keluarga data by no_kk
router.delete('/delete/:no_kk', (req, res) => {
  const no_kk = req.params.no_kk;
  connection.query('DELETE FROM kartu_keluarga WHERE no_kk = ?', no_kk, (error, result) => {
    if (error) {
      return res.status(500).json({
        status: false,
        message: 'Server Error',
        error: error,
      });
    } else {
      return res.status(200).json({
        status: true,
        message: 'Data Kartu Keluarga berhasil dihapus',
      });
    }
  });
});

module.exports = router;

