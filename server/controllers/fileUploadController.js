const multer = require("multer");
const uniqid = require("uniqid");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const roomImgUpload = multer({
  limits: 500000,
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(file, "uploads");
    },
    filename: (req, file, callback) => {
      const ext = MIME_TYPE_MAP[file.mimetype];
      callback(null, `${uniqid()}.${ext}`);
    },
  }),
  fileFilter: (req, file, callback) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    if (!isValid) {
      callback("error");
    } else {
      callback("unError");
    }
  },
});

module.exports = { roomImgUpload };
