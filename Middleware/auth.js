const jwt = require("jsonwebtoken");
const multer = require("multer");
require("dotenv").config();
const path = require("path");
const { GridFsStorage } = require("multer-gridfs-storage");
const crypto = require("crypto");
const { default: mongoose } = require("mongoose");
const User = require("../Models/User-model");
const Profilepicture = require("../Models/ProfilePicture-model");
const Post = require("../Models/Post-model");

const url = process.env.URI;

// creating the storage engine for the profile picture user
const storage = new GridFsStorage({
  url,
  file: async (req, file, next) => {
    const filename = file.originalname;
    const { idFile } = req.body;

    try {
      if (filename) {
        return {
          filename: filename,
          bucketName: "post",
          metadata: idFile,
        };
      }
    } catch (error) {}
  },
});

const setPost = multer({ storage: storage });

// // middleware for authentificating the user through the token
const auth = (req, res, next) => {
  const token = req.header("x-access-token");
  try {
    if (!token) {
      return res.status(406).json({ err: "authorization denied" });
    } else {
      const verified = jwt.verify(token, process.env.TOKEN);
      if (!verified) {
        return res.json({ err: "token verification failed" });
      } else {
        next();
      }
    }
  } catch (error) {
    res.json({ error: "there was an error" });
  }
};

module.exports = {
  auth,
  setPost,
};
