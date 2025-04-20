const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5001;
const ADMIN_PASSPHRASE = "delete123";

const UPLOAD_DIR = path.join(__dirname, '../public/uploads');

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(UPLOAD_DIR));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded');
  return res.status(200).send('Upload successful');
});

app.get('/images', (req, res) => {
  fs.readdir(UPLOAD_DIR, (err, files) => {
    if (err) return res.status(500).json({ error: 'Failed to read directory' });
    return res.json(files);
  });
});

app.delete('/delete/:filename', (req, res) => {
  const { passphrase } = req.body;
  if (passphrase !== ADMIN_PASSPHRASE) {
    return res.status(403).json({ error: 'Invalid admin passphrase' });
  }

  const filename = req.params.filename;
  const filePath = path.join(UPLOAD_DIR, filename);

  fs.unlink(filePath, (err) => {
    if (err) {
      console.error('Failed to delete file:', filename, err);
      return res.status(500).json({ error: 'Failed to delete file' });
    }
    return res.json({ success: true });
  });
});

app.listen(PORT, () => {
  console.log(`✅ Gallery backend running at http://localhost:${PORT}`);
});
