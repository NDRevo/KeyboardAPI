const fs = require('fs');
const jwt = require('jsonwebtoken');

var privateKEY = fs.readFileSync('./private.key', 'utf8');
var publicKEY = fs.readFileSync('./public.key', 'utf8');

// JWT SIGNING

// Payload
var payload = {
    data1: "Data 1",
};

var i = 'Mechspace'; //Org issuing token
var s = 'me@mechspace.co'; //User of Token
var a = 'https://mechspace.co/'; //Intended Recipient of Token

var signOptions = {
    issuer: i,
    subject: s,
    audience: a,
    expiresIn: "12h",
    algorithm: "RS256"
};

var token = jwt.sign(payload, privateKEY, signOptions);
console.log('Token: ' + token);

// JWT VERIFY
var verifyOptions = {
    issuer: i,
    subject: s,
    audience: a,
    expiresIn: "12h",
    algorithms: ["RS256"]
};

var verified = jwt.verify(token, publicKEY, verifyOptions);
console.log(`\nJWT Verification result: ` + JSON.stringify(verified));
console.log(jwt.decode(token, {complete:true}));


