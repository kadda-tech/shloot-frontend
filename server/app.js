require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const User = require("./model/user");
const auth = require("./middleware/auth");
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const Spot = require("./model/spot");

const app = express();

app.use(express.json());

app.post("/testData", async (req, res) => {
  // starting point -0.457846 46.3193722
  // img src https://scontent.fbod1-1.fna.fbcdn.net/v/t39.30808-6/283147504_5412971338726901_539772652631939110_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=730e14&_nc_ohc=fOwCOmDUHyYAX_uzqOl&_nc_ht=scontent.fbod1-1.fna&oh=00_AT-mmykiK2f2yg36GhczgPncqY5ELILYlaapJBqitKwVGQ&oe=6297892A

  // 46.317461, -0.452865
  // 46.317905, -0.451703
  // 46.317105, -0.451503
  // 46.320757, -0.458514

  let lat = 46.317461;
  let lon = -0.452865;

  for (let i=0; i<10; i++) {
    // if (Math.random() < 0.5 ) {
      lat-=0.0002
      lon+=0.002
    // } else {
      // lat+=0.0002
      // lon-=0.002
    // }

    // let spot = await Spot.create({
    //   latitude: lat,
    //   longitude: lon,
    //   imgsrc: 'https://scontent.fbod1-1.fna.fbcdn.net/v/t39.30808-6/283147504_5412971338726901_539772652631939110_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=730e14&_nc_ohc=fOwCOmDUHyYAX_uzqOl&_nc_ht=scontent.fbod1-1.fna&oh=00_AT-mmykiK2f2yg36GhczgPncqY5ELILYlaapJBqitKwVGQ&oe=6297892A',
    // });

  }

  var r = 1000/111300 // = 100 meters
  , y0 = 46.317461
  , x0 = -0.452865
  , u = Math.random()
  , v = Math.random()
  , w = r * Math.sqrt(u)
  , t = 2 * Math.PI * v
  , x = w * Math.cos(t)
  , y1 = w * Math.sin(t)
  , x1 = x / Math.cos(y0)

  newY = y0 + y1
  newX = x0 + x1

  let spot = await Spot.create({
      latitude: newY,
      longitude: newX,
      imgsrc: 'https://scontent.fbod1-1.fna.fbcdn.net/v/t39.30808-6/283147504_5412971338726901_539772652631939110_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=730e14&_nc_ohc=fOwCOmDUHyYAX_uzqOl&_nc_ht=scontent.fbod1-1.fna&oh=00_AT-mmykiK2f2yg36GhczgPncqY5ELILYlaapJBqitKwVGQ&oe=6297892A',
    });

  console.log(newY + ", " + newX)

  res.status(200).send(JSON.stringify("added successfully"));

})

app.get("/discover", auth, async (req, res) => {
    const spot = await Spot.find({});
    res.status(200).send(JSON.stringify(spot));
  });

app.post("/register", async (req, res) => {

    try {
      const { name, email, password } = req.body;

      if (!(email && password && name)) {
        res.status(400).send("All inputs are required");
      }

      const oldUser = await User.findOne({ email });
  
      if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
      }
  
      encryptedPassword = await bcrypt.hash(password, 10);
  
      const user = await User.create({
        name,
        email: email.toLowerCase(), // sanitize: convert email to lowercase
        password: encryptedPassword,
      });
  
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY//,
        // {
        //   expiresIn: "2h",
        // }
      );
      // save user token
      user.token = token;
  
      // return new user
      console.log(user)
      res.status(201).json(user);
    } catch (err) {
      console.log(err);
    }
  });

  app.post("/login", async (req, res) => {

    try {
      const { email, password } = req.body;
  
      if (!(email && password)) {
        res.status(400).send("All input is required");
      }
      // Validate if user exist in our database
      const user = await User.findOne({ email });
  
      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY//,
          // {
          //   expiresIn: "2h",
          // }
        );

        console.log(token)
  
        // save user token
        user.token = token;
  
        // user
        res.status(200).json(user);
      }
      res.status(400).send("Invalid Credentials");
    } catch (err) {
      console.log(err);
    }

});

module.exports = app;