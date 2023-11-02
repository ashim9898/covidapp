const jwt = require('jsonwebtoken');
const { accessSecret } = require('../key');
const { refreshSecret } = require('../key');

// Function to generate access token
function generateAccessToken(user) {
    const payload = {
        _id: user._id,
    };

    return jwt.sign(payload, accessSecret, { expiresIn: '4s' }); 
}

// Function to generate refresh token
function generateRefreshToken(user) {
    const payload = {
        _id: user._id,
    };

    return jwt.sign(payload, refreshSecret, { expiresIn: '20s' }); 
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
};
