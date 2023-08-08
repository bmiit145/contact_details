const express = require('express');
const router = express.Router();

const ContactController = require("../controller/contactController");

router.get("/" , ContactController.viewContact);
router.post("/save" , ContactController.saveContact);
// router.get("/saveExcel" , ContactController.SaveExcelContact);

module.exports = router;