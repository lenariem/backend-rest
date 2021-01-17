# DS Whatever Store

This a small API containing only a simple user model build with Express, MongoDB and Mongoose.  
You can use this as a starting point for your projects or as a reference.

##### Info

You can create,update,authorise,delete,login or update a user. When you log in or sign up you get back a cookie with a token. Once the cookie is stored on your client, it will be included to all future requests automatically. If not, validation will fail and you will get no data back from our API. Sooooorry. Make sure your client and server run under the same domain if you want your cookie to work. We do

- Password hashing.
- User authorisation with our own middleware.
- Simple CORS.
- Enviroment setup.
- Deployment with vercel (or whatever is zeit called these days) by just running `now`.
- User roles.

##### Installation

Clone the repo locally, get inside the project's directory and run `npm i`.
Make sure in `app.js` you have whitelisted your clien's domain through our CORS set up.

##### Scripts

- `npm run start`  
  Starts the server with nodemon in port 3000. Make sure your Mongo is running as well.

- `npm run seed`  
  Feeds your database with 20 fake users with random emails and `0123456789` as a password.

- `npm run remote`  
  Connects to the production database. You can set up the production database url in `config/config.js`

##### Endpoints

You can find all available endpoints and examples <a href="https://documenter.getpostman.com/view/80802/T1LLF8Nx
" target="_blank">here</a>

##### FIXES

My code is the best, i do the best code, no one does code like i do.  
For any issues, please make a ticket in github.  
Tenk u.

![lol](https://media.giphy.com/media/YFkpsHWCsNUUo/giphy.gif)
