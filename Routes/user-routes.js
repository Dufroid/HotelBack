const Express = require("express");
const router = Express.Router();
require("dotenv").config();

const {
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
  checkout,
  session_status
} = require("../Controllers/user-controller");
const { auth, setPost } = require("../Middleware/auth");

router.post("/handleCode", handleCode);
router.post("/Connect", Connect);
router.get("/getUser", getUser);
router.post("/CreatePost/:id", setPost.array("UploadImg", 10), CreatePost);
router.get("/PostFiles/:id", PostFiles);
router.get("/getPost", getPost);
router.get("/AllPost", AllPost);
router.get("/getAdmin", auth, getAdmin);
router.post("/AddAdmin", AddAdmin);
router.put("/DeleteAdmn", DeleteAdmn);
router.put("/connectPass", connectPass);
router.get("/AnAdmn/:id", auth, AnAdmn);
router.put("/EditNames", EditNames);
router.put("/EditPass", EditPass);
router.post("/writeUs", writeUs);
router.get("/getNoti/:id", getNoti);
router.put("/readNoti/:id", readNoti);
router.get("/getSpecificNoti/:id", getSpecificNoti);
router.put("/deleteNoti/:id", deleteNoti);
router.post("/UpcomingEvent",UpcomingEvent);
router.post('/checkout',checkout)
router.get('/session-status',session_status );

module.exports = router;
