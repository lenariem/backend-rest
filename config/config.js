const { env } = process;

const config = {
  env: env.NODE_ENV || 'development',
};

const devConfig = {
  //replace with own mongo with Atlas
  db: 'mongodb+srv://new_user1:pamTARs84L@cluster0.uiclr.mongodb.net/restaurantDB_dev?retryWrites=true&w=majority',
  jwt_key: 'changeMeToYourSecretKey',
  ver_key: 'changeMeToYourSecretKeyPlease',
  email: 'wasabisfbw28@gmail.com',
  email_pass: 'rYn92q*Z%VA4q3Rw',
};

const prodConfig = {
  db: 'mongodb+srv://new_user1:pamTARs84L@cluster0.uiclr.mongodb.net/restaurantDB?retryWrites=true&w=majority',
  jwt_key: 'changeMeToYourSecretKey',
  ver_key: 'changeMeToYourSecretKeyPlease',
  email: 'wasabisfbw28@gmail.com',
  email_pass: 'rYn92q*Z%VA4q3Rw',
};

/* db: mongodb+srv://new_user1:pamTARs84L@cluster0.uiclr.mongodb.net/restaurantDB?retryWrites=true&w=majority */

const currentConfig =
  config.env === 'production' ? prodConfig : devConfig;
module.exports = Object.assign({}, config, currentConfig);
