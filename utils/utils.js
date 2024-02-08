import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../config/config.js'

const hashPass = (password) => {
    const salt = bcrypt.genSalt(10)
    const hashPass = bcrypt.hashSync(password, salt)
    return hashPass
}
const verify = (password, hash) => {
    const salt = bcrypt.compareSync(password, hash)
    return salt
}

//jwt.sign(payload, secretOrPrivateKey, [options, callback])
const generateToken = (user) => {
    const token = jwt.sign({ user }, config.secret, { expiresIn: 60 * 60 })
    return token
}

export {
    hashPass,
    verify,
    generateToken
}