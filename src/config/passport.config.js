import passport from 'passport'
import passportJwt from 'passport-jwt'
import config from './config.js'

const JWTStrategy = passportJwt.Strategy
const JWTextractor = passportJwt.ExtractJwt

//const opts = {}

// opts.jwtFromExtractors = JWTextractor.fromExtractors([cookieExtractor])
// opts.secretOrKey = config.secretKey

const startPassport = () => {    
    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: JWTextractor.fromExtractors([cookieExtractor]),
        secretOrKey: config.privateKey
        },
        async (jwt_payload, done) => {
            try {
                return done(null, jwt_payload.user)
            } catch (error) {
                return done(error)
            }
    }))
}

const cookieExtractor = req => {
    let token = null
    if (req && req.cookies) {
        token = req.cookies[config.cookieToken]
    }
    return token
}

export default startPassport