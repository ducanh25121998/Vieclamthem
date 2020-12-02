// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'        : '802058360591687', // your App ID
        'clientSecret'    : '72132375a001e3b81ab8dd839ecc0cdb', // your App Secret
        'callbackURL'     : 'http://localhost:3000/auth/facebook/callback',
        'profileURL': '     https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
        'profileFields'   : ['id', 'email', 'name'] // For requesting permissions from Facebook API

    },
    'googleAuth' : {
        'clientID'         : '163618400101-kgebgmhbdhv107q84c6foupkhpg83p63.apps.googleusercontent.com',
        'clientSecret'     : 'T79qaHYmgoPMAB0lMc8HpWQu',
        'callbackURL'      : 'http://localhost:3000/auth/google/callback'
    }

};
