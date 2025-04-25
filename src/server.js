const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT;
const morgan = require('morgan');
const passport = require('passport');

app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded());
app.use(passport.initialize());
require('../config/passport')(passport);
app.use("/",require('./routes/roleRoute'));
app.use("/",require('./routes/registrationRoute'));
app.use("/",require('./routes/categoryRoute'));
app.use("/",require('./routes/subcategoryRoute'));
app.use("/",require('./routes/productRoute'));
app.use("/",require('./routes/loginRoute'));

if (process.env.RUN_MODE !== 'local') {
    // Production mode hai
    console.log("Production mode, extra logging disabled");
  } else {
    // Local mode hai
    console.log("Local mode, safe to use local configs");
  }


app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log("Your server is running on the port = ",port);;
    
})