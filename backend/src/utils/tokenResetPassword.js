const crypto = require('crypto');

module.exports = function tokenResetPassword(){
    return crypto.randomBytes(20).toString('HEX');
}