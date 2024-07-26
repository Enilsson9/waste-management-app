const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['internal', 'wholesale', 'public'],
        required: true
    }
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
