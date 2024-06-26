const multer = require("multer");

//generate a custom filename for uploaded files but don't want to set the destination folder to "storage"
module.exports = multer.diskStorage({
  filename: (req, file, callback) => {
    const filename = Date.now() + Math.floor(Math.random() * 100) + file.originalname;
    callback(null, filename);
  },
});
