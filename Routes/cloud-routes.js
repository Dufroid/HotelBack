const Express = require("express");
const router = Express.Router();
require("dotenv").config();

const {
  SpecificUserProfile,
//   StreamingVideo,
} = require("../Controllers/cloud-controller");

router.get("/SpecificUserProfil/:id", SpecificUserProfile);
// router.get("/StreamingVideo/:id", StreamingVideo);

module.exports = router;