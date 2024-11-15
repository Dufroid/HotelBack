const path = require("path");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Grid = require("gridfs-stream");
require("dotenv").config();
const stripe = require('stripe')(process.env.STRIPE_KEY);


const conn = mongoose.createConnection(process.env.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const User = require("../Models/User-model");

const Notification = require("../Models/Notification");
const Posts = require("../Models/Post-model");
const { Code } = require("mongodb");
const Messages = require("../Models/Message-model");
const Notifications = require("../Models/Notification");

//handleCode
const handleCode = async (req, res) => {
  const { Code, Nom } = req.body;

  try {
    const user = await User.updateOne({ $set: { Code: Code } });
    user
      ? res.json({ Msg: "Success" })
      : res.json({ err: "the code was not updated" });
  } catch (error) {}
};

//Checking admin code
const Connect = async (req, res) => {
  const { Code } = req.body;

  console.log(Code);

  try {
    const user = await User.findOne({ Code: Code });

    if (user) {
      const token = jwt.sign(
        {
          UserId: user._id,
        },
        process.env.TOKEN
      );
      res.json({ Token: token });
    } else {
      res.json({ msg: "code not found" });
    }
  } catch (error) {}
};

const getUser = async (req, res) => {
  try {
    const user = await User.findOne();
    if (user) {
      res.json({ user });
    } else {
      res.json({ Msg: "No User found" });
    }
  } catch (error) {}
};

//Creating post
const CreatePost = async (req, res) => {
  const file = req.files;
  const User = req.params.id;
  const { Desription, Title, Date, idFile } = req.body;
  const tab = [];

  file.map((e) => tab.push(e.originalname));

  const post = new Posts({
    Desc: Desription,
    Titlle: Title,
    UserId: User,
    Date: Date,
    IdFiles: idFile,
    FileName: tab,
  });
  if (file) {
    await post.save();
    res.json({ msg: "Uploaded" });
  }
};

//Getting file
//Cloud controller

var fs, Bucket;
conn.once("open", () => {
  Bucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "post",
  });
  fs = Grid(conn.db, mongoose.mongo);
  fs.collection("post");
});
//Getting album
const PostFiles = async (req, res) => {
  const filesId = req.params.id;

  try {
    const File = await fs?.files?.find({ filename: filesId }).toArray();

    if (File) {
      File.map((el) => {
        var readStream = Bucket.openDownloadStream(el?._id);
        readStream.pipe(res);
      });
    } else {
      res.json({
        err: "No image file",
      });
    }
  } catch (error) {}
};

//Getting post
const getPost = async (req, res) => {
  try {
    const post = await Posts.findOne().sort({ updatedAt: -1 });
    if (post) {
      res.json({
        posts: post,
      });
    }
  } catch (error) {}
};

//Getting all posts
const AllPost = async (req, res) => {
  try {
    const post = await Posts.find().sort({ updatedAt: -1 });
    if (post) {
      res.json({
        posts: post,
      });
    }
  } catch (error) {}
};

//Getting user admin
const getAdmin = async (req, res) => {
  try {
    const user = await User.find();
    if (user) {
      res.json({ Users: user });
    } else {
      res.json("No user");
    }
  } catch (error) {}
};

//Add an admin
const AddAdmin = async (req, res) => {
  const { Names, code, user } = req.body;

  const admn = new User({
    Names: Names,
    Code: code,
    User: user,
  });

  try {
    if (code) {
      await admn.save();
      res.json("done");
    }
  } catch (error) {}
};

//Deleting admn
const DeleteAdmn = async (req, res) => {
  const { user } = req.body;

  try {
    const admn = await User.findById(user);
    if (admn) {
      await User.findByIdAndDelete(user);
      res.json("done");
    }
  } catch (error) {}
};

//Connecting to the account
const connectPass = async (req, res) => {
  const { Code } = req.body;

  try {
    const adm = await User.findOne({ Code: Code });
    if (adm) {
      res.json({ go: "done" });
    } else {
      res.json("Incorrecte");
    }
  } catch (error) {}
};

//Specif admin
const AnAdmn = async (req, res) => {
  const user = req.params.id;

  try {
    const adm = await User.findById(user);
    if (user) {
      res.json({ User: adm });
    }
  } catch (error) {}
};

//Editing names
const EditNames = async (req, res) => {
  const { user, nom } = req.body;

  try {
    const adm = await User.findById(user);
    if (adm) {
      await adm.updateOne({ $set: { Names: nom } });
      res.json("done");
    }
  } catch (error) {}
};

//Edit pass
const EditPass = async (req, res) => {
  const { user, Pass } = req.body;

  try {
    const adm = await User.findById(user);
    if (adm) {
      await adm.updateOne({ $set: { Code: Pass } });
      res.json("done");
    }
  } catch (error) {}
};

//contact us
const writeUs = async (req, res) => {
  const { Nom, Mail, Phone, Msg, Device, position } = req.body;

  const msg = new Messages({
    Nom: Nom,
    Mail: Mail,
    Phone: Phone,
    Text: Msg,
    UserDevice: Device,
    Position: position,
  });

  const noti = new Notifications({
    IdMessage: msg._id,
    TypeNoti: "contactUs",
  });
  try {
    if (Phone || Mail) {
      await msg.save();
      await noti.save();
      res.json("done");
    }
  } catch (error) {}
};

//getting Notification
const getNoti = async (req, res) => {
  const userId = req.params.id;
  try {
    const Noti = await Notifications.find({
      isDelete: { $ne: userId },
    }).populate("IdMessage");
    if (Noti) {
      res.json({ noti: Noti });
    } else {
      res.json({ msg: "Aucune notification" });
    }
  } catch (error) {}
};

const readNoti = async (req, res) => {
  const userId = req.params.id;
  const notiID = req.body.Noti;

  try {
    const Noti = await Notifications.findById(notiID);
    if (Noti) {
      if (Noti.isRead.includes(userId)) {
        res.json({ msg: "Notification already read" });
      } else {
        await Noti.updateOne({ $push: { isRead: userId } });
        res.json({ msg: "reading" });
      }
    } else {
      res.json({ msg: "Aucune notification" });
    }
  } catch (error) {}
};

const deleteNoti = async (req, res) => {
  const userId = req.params.id;
  const notiID = req.body.Noti;

  try {
    const Noti = await Notifications.findById(notiID);
    if (Noti) {
      if (Noti.isDelete.includes(userId)) {
        res.json({ msg: "Notification already deleted" });
      } else {
        await Noti.updateOne({ $push: { isDelete: userId } });
        res.json({ msg: "deleting" });
      }
    } else {
      res.json({ msg: "Aucune notification" });
    }
  } catch (error) {}
};

const getSpecificNoti = async (req, res) => {
  const SpecifMsg = req.params.id;
  try {
    const notifound = await Messages.findById(SpecifMsg);
    if (notifound) {
      res.json({ Spec: notifound });
    } else {
      res.json({ msg: "no notification found" });
    }
  } catch (error) {}
};

const UpcomingEvent = async(req, res)=>{
  const {Interested} = req.body
 res.json({Interested})
}



const createSessionForm = async (req,res)=>{
  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: 'price_1QLEBdLtLaBG2F3XuzpQNrR7',
        quantity: 1,
      },
    ],
    mode: 'payment',
    return_url: `${process.env.DOMAIN_NAME}/return?session_id={CHECKOUT_SESSION_ID}`,
  });
  res.send({clientSecret: session.client_secret});
}
const session_status = async (req,res)=>{
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

  res.send({
    status: session.status,
    customer_email: session.customer_details.email
  });
}

module.exports = {
  handleCode,
  Connect,
  getUser,
  CreatePost,
  PostFiles,
  getPost,
  AllPost,
  getAdmin,
  AddAdmin,
  DeleteAdmn,
  connectPass,
  AnAdmn,
  EditNames,
  EditPass,
  writeUs,
  getNoti,
  readNoti,
  getSpecificNoti,
  deleteNoti,
  UpcomingEvent,
  createSessionForm,
  session_status
};
