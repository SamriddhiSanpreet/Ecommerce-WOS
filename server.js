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
require('./config/passport')(passport);
app.use("/",require('./src/routes/roleRoute'));
app.use("/",require('./src/routes/registrationRoute'));
app.use("/",require('./src/routes/categoryRoute'));
app.use("/",require('./src/routes/subcategoryRoute'));
app.use("/",require('./src/routes/productRoute'));
app.use("/",require('./src/routes/loginRoute'));

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