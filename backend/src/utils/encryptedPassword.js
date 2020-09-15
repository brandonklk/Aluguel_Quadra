const bcrypt = require('bcryptjs');

module.exports = async function encryptedPwd(pwd){
    return await bcrypt.hash(pwd, 10);
}