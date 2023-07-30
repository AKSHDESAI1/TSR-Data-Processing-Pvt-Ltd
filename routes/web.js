const express = require("express");
const { Home, Login, Signup, Profile, UploadDocuments, adminDashboard, Logout } = require("../controllers/TSR_Data_Processing.js");
const multer = require('multer');

const router = express.Router();

router.get("/", Home);

// Public Routes 
router.get("/login", Login);
router.post("/login", Login);

router.get("/Signup", Signup);
router.post("/Signup", Signup);

router.get("/logout", Logout);

// Private Routes 
router.get("/Profile", Profile);
router.post("/Profile", Profile);

router.get("/Upload-Documents", UploadDocuments);

router.get("/admin/dashboard", adminDashboard);

// Set up the destination and filename for uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/'); // The uploaded files will be stored in the 'uploads' directory
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use the original filename for the stored file
    }
});

// Create the multer instance with the specified storage configuration
const upload = multer({ storage: storage });

router.post("/Upload-Documents", upload.array('document', 2), UploadDocuments);
module.exports = router;