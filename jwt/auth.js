const fs = require('fs');
const jwt = require('jsonwebtoken');

var privateKEY = fs.readFileSync('./private.key', 'utf8');
var publicKEY = fs.readFileSync('./public.key', 'utf8');

module.exports = {
    // JWT SIGNING
    sign: (payload, $Options) => {
    /*
    sOptions = {
        i = 'Mechspace'; //Org issuing token
        s = 'me@mechspace.co'; //User of Token
        a = 'https://mechspace.co/'; //Intended Recipient of Token
    }
    */
        var signOptions = {
            issuer: $Options.i,
            subject: $Options.s,
            audience: $Options.a,
            expiresIn: "12h",
            algorithm: "RS256"
        };

        return jwt.sign(payload, privateKEY, signOptions);
    //console.log('Token: ' + token);
    },
    
    verify: (token, $Options) => {
    // JWT VERIFY
    /*
    vOptions = {
        i = 'Mechspace'; //Org issuing token
        s = 'me@mechspace.co'; //User of Token
        a = 'https://mechspace.co/'; //Intended Recipient of Token
    }
    */
        var verifyOptions = {
            issuer: $Options.i,
            subject: $Options.s,
            audience: $Options.a,
            expiresIn: "12h",
            algorithms: ["RS256"]
        };

        return jwt.verify(token, publicKEY, verifyOptions);
        //console.log(`\nJWT Verification result: ` + JSON.stringify(verified));
    },
    
    decode: (token) => {
        return jwt.decode(token, {complete: true});
        // returns null if invalid
    }
};


