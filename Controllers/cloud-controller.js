const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
require("dotenv").config();
const User = require("../Models/User-model")

const conn = mongoose.createConnection(process.env.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


// // Profile picture engine and get for user profile
var gfs, gridfsBucket;
conn.once("open", () => {
  gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "ProfilePicture",
  });
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("ProfilePicture");
});

const SpecificUserProfile = async (req, res) => {
  const id = req.params.id;
  try {
    const file = await gfs.files?.findOne({ metadata: id });

    if (file) {
      const readStream = gridfsBucket.openDownloadStream(file?._id);
      readStream.pipe(res);
    } else {
      res.json({
        err: "No image file",
      });
    }
  } catch (e) {}
};

// //Stream engine and get
// var gf, gridfBucket;
// conn.once("open", () => {
//   gridfBucket = new mongoose.mongo.GridFSBucket(conn.db, {
//     bucketName: "videoStream",
//   });
//   gf = Grid(conn.db, mongoose.mongo);
//   gf.collection("videoStream");
// });

// const StreamingVideo = async (req, res) => {
//   let pId = req.params.id;
//   try {
//     const File = await gf?.files?.find({ metadata: pId }).toArray();

//     if (File) {
//       File.map((el) => {
//         var readStream = gridfBucket.openDownloadStream(el?._id);
//         readStream.pipe(res);
//       });
//     } else {
//       res.json({
//         err: "No image file",
//       });
//     }
//   } catch (error) {}
// };


module.exports = {
  SpecificUserProfile,
//   StreamingVideo,
 
};