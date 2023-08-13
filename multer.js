const multer = require('multer')
const fs = require('fs')
const uploadsFolderPath = __dirname + '/uploads';

// if (!fs.existsSync(uploadsFolderPath)) {
//   fs.mkdirSync(uploadsFolderPath);
// }


// Multer Setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null,uploadsFolderPath );
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  
  const upload = multer({ storage });

  module.exports = upload
