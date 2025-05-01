const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT;
const morgan = require('morgan');
const passport = require('passport');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../config/swagger');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
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
app.use("/",require('./routes/filterRoute'));
app.use("/",require('./routes/CartRoute'));
app.use("/",require('./routes/orderRoute'));

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
