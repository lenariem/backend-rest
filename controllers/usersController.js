const User = require('../models/User');
const createError = require('http-errors');
const {
  sendVerificationEmail,
} = require('../mailer/setup');

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find()
      .sort('lastName')
      .select('-password -__v ');
    res.status(200).send(users);
  } catch (e) {
    next(e);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select(
      '-password -__v'
    );
    if (!user) throw new createError.NotFound();
    res.status(200).send(user);
  } catch (e) {
    next(e);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    // What happens when an Admin want to delete a User's account??
    const user = await User.findByIdAndDelete(
      req.params.id
    );
    if (!user) throw new createError.NotFound();
    res.status(200).send(user).select('-password');
  } catch (e) {
    next(e);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      let error = new createError.NotFound();
      next(error); // raising errors in an async route
    }
    Object.assign(user, req.body);

    // URL format we want to create: http://localhost:5000/avatars/${req.file.filename}
    // Multer will store an uploaded and parsed file in object: req.file
    if (req.file) {
      const urlAvatar = `${req.protocol}://${req.get(
        'host'
      )}/avatars/${req.file.filename}`;
      user.avatar = urlAvatar;
    }

    user = await user.save(); // now we also hash updated passwords
    const data = user.getPublicFields();
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

exports.addUser = async (req, res, next) => {
  try {
    const body = req.body;
    const user = new User(body);
    const verifToken = user.generateVerificationToken();
    user.verificationToken = verifToken;
    await user.save();
   /*  sendVerificationEmail(user); */
    const authToken = user.generateAuthToken();
    const data = user.getPublicFields();

    res
      .status(200)
      .cookie('token', authToken, {
        expires: new Date(Date.now() + 604800000),
        secure: false, // if we are not using https
        httpOnly: true,
      })
      .send(data);
  } catch (e) {
    next(e);
  }
};

exports.loginUser = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  // if there is no password. check if the google user exists with that email
  // if the google user exists, send a message. If not send an error

  try {
    const user = await User.findOne({ email });
    if (!user)
      throw new createError(
        404,
        `There is no user account for '${req.body.email}.'`
      );

    const token = user.generateAuthToken();

    if (!user.password && user.googleId)
      throw new createError(
        401,
        `Please sign in with Google cause YoU SignEd Up WitH GooGle. `
      );

    const canLogin = await user.checkPassword(password);
    if (!canLogin)
      throw new createError(
        404,
        `Please check your password.`
      );

    const data = user.getPublicFields();
    res
      .status(200)
      .cookie('token', token, {
        expires: new Date(Date.now() + 604800000),
        secure: false, // if we are not using https
        httpOnly: true,
      })
      .send(data);
  } catch (e) {
    next(e);
  }
};

exports.googleLoginUser = async (req, res, next) => {
  const { email, googleId, googleTokenId } = req.body;

  try {
    let user = await User.findOne({
      email,
      googleId,
    });

    if (!user) {
      user = await User.findOneAndUpdate(
        { email },
        { googleId, googleTokenId },
        { new: true }
      );
      if (!user)
        throw new createError(
          404,
          `There is no user account for '${req.body.email}.'`
        );
    }

    const token = user.generateAuthToken();
    const data = user.getPublicFields();

    res
      .status(200)
      .cookie('token', token, {
        expires: new Date(Date.now() + 604800000),
        secure: false, // if we are not using https
        httpOnly: true,
      })
      .send(data);
  } catch (e) {
    next(e);
  }
};

exports.authenticateUser = async (req, res, next) => {
  res.status(200).send(req.user);
};

exports.logoutUser = async (req, res, next) => {
  res.clearCookie('token').status(200).send('Bye bye');
};

exports.verifyUser = async (req, res, next) => {
  res.status(200).send({ email: req.user.email });
};
