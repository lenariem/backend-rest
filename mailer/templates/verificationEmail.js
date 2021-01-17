exports.verificationEmailTemplate = (user) => {
  return `<h4>Welcome to the Whatever App</h4>
  <p>Please click <a target="_blank" href='http://localhost:3000/users/verifyMe/${user.verificationToken}'>here </a>to verify your account!</p>`;
};
