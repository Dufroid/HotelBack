const path = require("path");
const mongoose = require("mongoose");
const Medicament = require("../Models/Medicament-model");
const User = require("../Models/User-model");

// Creating post
const postVideo = async (req, res) => {
  const userId = req.params.id;
  if (userId) {
    res.json("ok");
  }
};


//Recommendation
// const recommend = async (userId, streamId) => {
//   try {
//     const user = await User.findById(userId);
//     const stream = await Medicament.findById(streamId);

//     if (!user.artistSearched.includes(stream.User) && stream.User != userId) {
//       await user.updateOne({ $push: { artistSearched: stream.User } });
//     }
//   } catch (error) {}
// };

//Search stream or artist
const searchStreams = async (req, res) => {
  const userId = req.params.id;
  const word = req.query.page;
  const tab = [];

  try {
    const streamTitle = await Medicament.find({ Title: { $regex: word } }).populate(
      "User",
      ["Fname", "Lname", "artistSearched", "ProfilePicture"]
    );
    const streamDescript = await Medicament.find({
      Description: { $regex: word },
      _id: { $nin: streamTitle },
    }).populate("User", ["Fname", "Lname", "artistSearched", "ProfilePicture"]);

    const user = await User.find({ Fname: { $regex: word } });

    const UserStream = await Promise.all(
      user.map(async (id) => {
        return await Medicament.find({
          User: id,
          _id: { $nin: streamTitle },
        }).populate("User", [
          "Fname",
          "Lname",
          "artistSearched",
          "ProfilePicture",
        ]);
      })
    );
    const data = tab.concat(...UserStream, ...streamTitle);
    res.json({ streams: data });

    // if (streamTitle.length > 0) {
    //   res.json({ streams: streamTitle });
    // } else {
    //   res.json({ streams: streamDescript });
    // }
  } catch (error) {}
};



module.exports = {
  postVideo,
  searchStreams,
};
