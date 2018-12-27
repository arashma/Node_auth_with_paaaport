var {User}           = require('./../models/user');
var {Token}          = require('./../models/token');
var crypto           = require('crypto');
var {sendMail}       = require('./mail');

var signupPost = function(req, res, next) {

    console.log(req.body.email);
    // Make sure this account doesn't already exist
    User.findOne({ email: req.body.email }, function (err, user) {

      // Make sure user doesn't already exist
    //   if (user) {
    //     req.flash('error', 'The email address you have entered is already associated with another account.');
    //     return res.redirect('/signup');
    //    // return res.status(400).send({ msg: 'The email address you have entered is already associated with another account.' });
    //   }
  
      // Create and save the user
      user = new User({ username: req.body.username, email: req.body.email, password: req.body.password });
      user.save(function (err) {
          if (err) { return res.status(500).send({ msg: err.message }); }
  
          // Create a verification token for this user
          var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
  
          // Save the verification token
          token.save(function (err) {
              if (err) { return res.status(500).send({ msg: err.message }); }
  
              // Send the email
             sendMail('no-reply@yourwebapplication.com',
             user.email,
             'Account Verification Token',
             'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host +
              '\/confirmation\/' + token.token + '.\n',
              function (err) {
                if (err) { return res.status(500).send({ msg: err.message }); }
                // req.flash('success', 'A verification email has been sent to ' + user.email + '.');
                // return res.redirect('/confirm');
                res.status(200).send('A verification email has been sent to ' + user.email + '.');
            })
          });
      });
    });


}


module.exports = {signupPost};
