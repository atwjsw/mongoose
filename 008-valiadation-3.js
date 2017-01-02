var mongoose = require('mongoose'); //引用mongoose模块
var assert = require('assert');
var db = mongoose.createConnection("localhost", "abc");

var breakfastSchema = new mongoose.Schema({
    eggs: {
        type: Number,
        min: [6, 'Too few eggs'],
        max: 12
    },
    bacon: {
        type: Number,
        required: [true, 'Why no bacon?']
    },
    drink: {
        type: String,
        enum: ['Coffee', 'Tea']
    }
});
var Breakfast = db.model('Breakfast', breakfastSchema);

var badBreakfast = new Breakfast({
    eggs: 2,
    bacon: 0,
    drink: 'Milk'
});

var goodBreakfast = new Breakfast({
    eggs: 7,
    bacon: 1,
    drink: 'Tea'
});

/*var error = badBreakfast.validateSync();
assert.equal(error.errors['eggs'].message,
    'Too few eggs');
assert.ok(!error.errors['bacon']);
assert.equal(error.errors['drink'].message,
    '`Milk` is not a valid enum value for path `drink`.');

badBreakfast.bacon = null;
error = badBreakfast.validateSync();
assert.equal(error.errors['bacon'].message, 'Why no bacon?');
*/
badBreakfast.save();
goodBreakfast.save();
