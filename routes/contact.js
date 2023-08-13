const express = require('express');
const router = express.Router();
const upload = require('../multer')

const ContactController = require("../controller/contactController");

router.get("/" , ContactController.viewContact);
router.post("/save" ,  upload.single('csvfile'), ContactController.saveContact);
// router.get("/saveExcel" , ContactController.SaveExcelContact);

module.exports = router;