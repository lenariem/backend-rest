const express = require('express');
const router = express.Router();
const {
  userValidationRules,
  userValidationErrorHandling,
} = require('../validators/validator');
const auth = require('../middleware/authenticator');
const verif = require('../middleware/verifier');
const isAdmin = require('../middleware/rolesAuthenticator');
const upload = require('../middleware/upload');

const {
  getUsers,
  addUser,
  getUser,
  deleteUser,
  updateUser,
  authenticateUser,
  loginUser,
  logoutUser,
  verifyUser,
  googleLoginUser,
} = require('../controllers/usersController');

router
  .route('/')
  .get(auth, isAdmin, getUsers)
  .post(
    userValidationRules(),
    userValidationErrorHandling,
    addUser
  );

router.route('/me').get(auth, authenticateUser);
router.route('/login').post(loginUser);
router.route('/googleLogin').post(googleLoginUser);
router.route('/logout').post(auth, logoutUser);
router.route('/verifyEmail').post(verif, verifyUser);

router
  .route('/:id')
  .get(auth, getUser)
  .delete(auth, deleteUser)
  .patch(auth, upload.single('avatar'), updateUser); // updates my user profile
// .patch(auth, upload.single('avatar'), upload.array("product_images"), updateUser) // updates my user profile

module.exports = router;
