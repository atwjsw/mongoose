var mongoose = require('mongoose'); //引用mongoose模块
var assert = require('assert');
var db = mongoose.createConnection("localhost", "abc");

var userSchema = new mongoose.Schema({
    phone: {
        type: String,
        validate: {
            validator: function(v) {
                return /\d{3}-\d{3}-\d{4}/.test(v);
            },
            message: '{VALUE} is not a valid phone number!'
        },
        required: [true, 'User phone number required']
    }
});

var User = db.model('user', userSchema);
var user = new User();
var error;

user.phone = '555.0123';
error = user.validateSync();
assert.equal(error.errors['phone'].message,
    '555.0123 is not a valid phone number!');
console.log(error.errors['phone'].message);
user.save();

user.phone = '';
error = user.validateSync();
assert.equal(error.errors['phone'].message,
    'User phone number required');
console.log(error.errors['phone'].message);
user.save();

user.phone = '201-555-0123';
// Validation succeeds! Phone number is defined
// and fits `DDD-DDD-DDDD`
error = user.validateSync();
assert.equal(error, null);
user.save();
