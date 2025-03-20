const JwtStrategy =  require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const {getUser} = require('../model/prismaQueries');
require('dotenv').config();


const opts = {};


opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRETKEY;




module.exports = new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
        const user = await getUser(jwt_payload.id);
  
        if (!user) {
            return done(null, false);
        }

        return done(null, user);
    } catch (err) {
        return done(error, false)
    }
});

