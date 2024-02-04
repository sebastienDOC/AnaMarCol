const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
const uploadController = require ('../controllers/upload.controller');
const multer = require('multer');
const upload = multer();

// Auth
router.post("/register", authController.signUp);
router.post('/login', authController.signIn);
router.get('/logout', authController.logout);

// User DB
router.get('/', userController.getAllUsers)
router.get('/:id', userController.userInfo)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)

// Upload
router.post('/upload', upload.single('file'), (req, res) => {
    console.log(req.file);  // Vérifiez si le fichier est correctement attaché à la requête
    console.log(req.body);  // Vérifiez si d'autres données du formulaire sont correctement transmises
    uploadController.uploadProfil(req, res);
  });

module.exports = router;