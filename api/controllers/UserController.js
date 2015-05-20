/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    /**
     * Check the provided email address and password, and if they
     * match a real user in the database, sign in to Activity Overlord.
     */
    login: function (req, res) {

        // Try to look up user using the provided email address
        User.findOne({
            email: req.param('email')
        }, function foundUser(err, user) {
            if (err) return res.negotiate(err);
            if (!user) return res.notFound();

            // Compare password attempt from the form params to the encrypted password
            // from the database (`user.password`)
            require('machinepack-passwords').checkPassword({
                passwordAttempt: req.param('password'),
                encryptedPassword: user.encryptedPassword
            }).exec({

                error: function (err){
                    return res.negotiate(err);
                },

                // If the password from the form params doesn't checkout w/ the encrypted
                // password from the database...
                incorrect: function (){
                    return res.notFound();
                },

                success: function (){

                    // Store user id in the user session
                    req.session.me = user.id;
                    req.session.authenticated = true;
                    // All done- let the client know that everything worked.
                    return res.ok();
                }
            });
        });

    },

    /**
     * Sign up for a user account.
     */
    signup: function(req, res) {

        var Passwords = require('machinepack-passwords');

        // Encrypt a string using the BCrypt algorithm.
        Passwords.encryptPassword({
            password: req.param('password'),
            difficulty: 10
        }).exec({
            // An unexpected error occurred.
            error: function(err) {
                return res.negotiate(err);
            },
            // OK.
            success: function(encryptedPassword) {
                User.create({
                    email: req.param('email'),
                    encryptedPassword: encryptedPassword,
                    company: req.param('company')
                }, function userCreated(err, newUser) {
                    if (err) {

                        console.log("err: ", err);
                        console.log("err.invalidAttributes: ", err.invalidAttributes)

                        // If this is a uniqueness error about the email attribute,
                        // send back an easily parseable status code.
                        if (err.invalidAttributes && err.invalidAttributes.email && err.invalidAttributes.email[0]
                            && err.invalidAttributes.email[0].rule === 'unique') {
                            return res.emailAddressInUse();
                        }
                        // Otherwise, send back something reasonable as our error response.
                        return res.negotiate(err);
                    }
                    // Log user in
                    req.session.me = newUser.id;
                    // Send back the id of the new user
                    return res.json({
                        id: newUser.id
                    });
                })
            }
        });
    },

    logout: function (req, res) {

        User.findOne(req.session.me, function foundUser(err, user) {
            if (err) return res.negotiate(err);

            // If session refers to a user who no longer exists, still allow logout.
            if (!user) {
                sails.log.verbose('Session refers to a user who no longer exists.');
                return res.backToHomePage();
            }

            // Wipe out the session (log out)
            req.session.me = null;
            req.session.authenticated = false;

            // Either send a 200 OK or redirect to the home page
            return res.backToHomePage();

        });
    }
	
};

