const multer = require('multer')
const fs = require('fs')
const uploadsFolderPath = './uploads';

if (!fs.existsSync("../uploads")) {
  fs.mkdirSync(uploadsFolderPath);
}
// Multer Setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  
  const upload = multer({ storage });

  module.exports = upload
