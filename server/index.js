const express = require('express');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;

const app = express();
app.use(express.json({ limit: '10mb' }));

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'http://localhost:5173';
app.use(cors({ origin: ALLOWED_ORIGIN }));

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;

if (CLOUD_NAME && API_KEY && API_SECRET) {
  cloudinary.config({ cloud_name: CLOUD_NAME, api_key: API_KEY, api_secret: API_SECRET });
} else {
  console.warn('Cloudinary credentials not set - upload endpoint will return 500.');
}

// Simple auth: require a secret header to prevent open uploads from browsers
const UPLOAD_SECRET = process.env.UPLOAD_SECRET;

app.post('/upload-image', async (req, res) => {
  try {
    if (UPLOAD_SECRET) {
      const header = req.get('x-upload-secret');
      if (!header || header !== UPLOAD_SECRET) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
    }

    if (!cloudinary.config().api_key) {
      return res.status(500).json({ error: 'Cloudinary not configured on server' });
    }

    const { imageData, folder } = req.body;
    if (!imageData) return res.status(400).json({ error: 'Missing imageData' });

    // Accept data-URI or remote URL. Cloudinary can fetch remote URLs or accept data URIs.
    const options = {};
    if (folder) options.folder = folder;

    const result = await cloudinary.uploader.upload(imageData, options);
    return res.json({ url: result.secure_url || result.url });
  } catch (err) {
    console.error('Upload error', err);
    return res.status(500).json({ error: 'Upload failed' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Upload server running on port ${PORT}`);
});
