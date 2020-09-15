const encryptedPwd = require('../utils/encryptedPassword');
const connection = require('../database/connection');
const bcrypt = require('bcryptjs');
const tokenResetPassword = require('../utils/tokenResetPassword');
const logger = require('../logger/logger');
const smtp = require('../modules/smtp.js');

module.exports = {

    async getAllUsers(req, res){
        const users = await connection('users').select('*');

        return res.json(users);
    },

    async create(req, res){
        const { name, email, password,  phone } = req.body;
        
      
            const passwordHash = await encryptedPwd(password);
        
            await connection('users').insert({
                name,
                email,
                passwordHash,
                phone,
            })
            logger.info("User create success");
            return res.json({ email });

    },

    async requestResetPassword(req, res){
        const { email } = req.body;

        const tokenResetPassword = tokenResetPassword();

        const user = await connection('users').select('email', 'passwordHash').where('email', '=', email);
            
        if(!user || user.length == 0) {
            return res.status(400).send({ error: 'User not found' })
        }

        logger.info("Password user changed success");
        return res.json({ success: 'Password user changed success' });

    },

    async authenticate(req, res){
        const { email, password } = req.body;

        const user = await connection('users').select('email', 'passwordHash').where('email', '=', email);

        if(!user) {
          return res.status(400).send({ error: 'User not found' });
        }

        if(user.length > 1) {
          return res.status(400).send({ error: 'Two users with the same email, inconsistency in the database' });
        }

        for(const u in user) {
          if(!await bcrypt.compare(password, user[u].passwordHash)) {
            return res.status(400).send({ error: 'Password invalid' });
          }
        }

        logger.info("User authenticate success")
        return res.json({ user });
        
    },

    async requestForgotPassword(req, res){
      const { email } = req.body;

      const tokenResetPwd = tokenResetPassword();
      let userUpdated;
      try{
        userUpdated = await connection('users').update({'token': tokenResetPwd}).where('email', '=', email);
        
        var email2User = {
          from: smtp.user,
          to: email,
          subject: "Recuperação de Senha",
          text: "Email: " + email + " - Token: " + tokenResetPwd
          // template: 'mailTemplate'
          };

        smtp.sendMail(email2User, function(error){
            if(error) {
              logger.error("Error sending email " + error);
            }else{
              logger.info("Email successfully sent");
            }
          });
      }catch(e){
        logger.error("Error when generating token for user" + e);
        return res.status(400).send({ error: 'Error creating token' })
      }
      
      if(userUpdated == 0){
        return res.status(400).send({ error: 'User not found' });
      }

      logger.info("Password user changed success");
      return res.status(200).send({ success: 'Token successfully generated' });
  },

  async resetPassword(req, res){
    const { email, password, token } = req.body;
    
    const user = await connection('users').select('email', 'passwordHash', 'token').where('email', '=', email);

    if(!user) {
      return res.status(400).send({ error: 'User not found' })
    }

    for(let u in user) {
      if(!user[u].token) {
        return res.status(400).send({ error: 'Token not found' })
      }

      if(token === user[u].token){
        const newPasswordWithHash = await encryptedPwd(password);

        const pwdUser = await connection('users').where('email', '=', email).update({ passwordHash: newPasswordWithHash });

        logger.info("Password user changed success");
        return res.json({ success: 'Password user changed success' });

      } else {
        logger.error("Token incorrect");
        return res.status(400).send({ error: 'Token incorrect' })
      }

    }

  },
};