
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const db = require('../src/models');
const dotenv = require('dotenv');
dotenv.config();

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || 'your_jwt_secret'
};

module.exports = (passport) => {
  passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await db.Registration.findByPk(jwt_payload.id,{
        include: [
            {
              model: db.Role,  
              as: 'role',  
              attributes: ['name'] 
            }
          ]
      });
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (err) {
      console.log(err);
      return done(err, false);
    }
  }));
};
