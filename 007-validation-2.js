var mongoose = require('mongoose'); //引用mongoose模块
var assert = require('assert');
var db = mongoose.createConnection("localhost", "abc");

var schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});
var Cat = db.model('Cat', schema);

var cat = new Cat({name: 'fat cat'});
// This cat has no name :(
//var cat = new Cat();
cat.save(function(error) {
    //console.log(error.errors['name'].message);
    //assert.equal(error.errors['name'].message,
        // 'Path `name` is required.');

    error = cat.validateSync();
    //assert.equal(error.errors['name'].message,
     //   'Path `name` is required.');
});
