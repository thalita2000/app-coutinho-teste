const mongoose = require('mongoose');

const Laboratory = mongoose.model('Laboratory', {
    name: String,
    address: String,
    status: String,
});

module.exports = Laboratory;
